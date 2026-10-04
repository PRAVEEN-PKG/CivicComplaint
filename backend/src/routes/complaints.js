const express = require('express')
const { randomUUID } = require('node:crypto')

const allowedPriorities = ['Low', 'Medium', 'High', 'Critical']

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function createActivityEntry(status, description) {
  return {
    id: randomUUID(),
    title: `Status updated to ${status}`,
    description,
    status,
    timestamp: new Date(),
  }
}

function createComplaintsRouter(database) {
  const router = express.Router()
  const complaints = database.collection('complaints')
  const counters = database.collection('counters')

  router.get('/', async (req, res) => {
    try {
      const data = await complaints.find({}).sort({ createdAt: -1, _id: -1 }).toArray()
      res.status(200).json({ success: true, message: 'Complaints retrieved successfully', data })
    } catch (error) {
      console.error('Failed to retrieve complaints:', error.message)
      res.status(500).json({ success: false, message: 'Unable to retrieve complaints', data: null })
    }
  })

  router.get('/:id', async (req, res) => {
    try {
      const data = await complaints.findOne({ id: req.params.id })
      if (!data) {
        return res.status(404).json({ success: false, message: 'Complaint not found', data: null })
      }
      return res.status(200).json({ success: true, message: 'Complaint retrieved successfully', data })
    } catch (error) {
      console.error('Failed to retrieve complaint:', error.message)
      return res.status(500).json({ success: false, message: 'Unable to retrieve complaint', data: null })
    }
  })

  router.post('/', async (req, res) => {
    if (!isRecord(req.body)) {
      return res.status(400).json({ success: false, message: 'Request body must be a JSON object', data: null })
    }

    const requiredFields = ['title', 'category', 'description', 'location', 'citizenName', 'citizenEmail']
    const missingFields = requiredFields.filter(
      (field) => typeof req.body[field] !== 'string' || !req.body[field].trim(),
    )
    if (missingFields.length) {
      return res.status(400).json({
        success: false,
        message: `Required fields are missing or invalid: ${missingFields.join(', ')}`,
        data: null,
      })
    }

    const citizenEmail = req.body.citizenEmail.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(citizenEmail)) {
      return res.status(400).json({ success: false, message: 'citizenEmail must be a valid email address', data: null })
    }

    if (req.body.priority !== undefined && !allowedPriorities.includes(req.body.priority)) {
      return res.status(400).json({ success: false, message: 'priority is not valid', data: null })
    }

    try {
      const year = new Date().getFullYear()
      const counterId = `complaints-${year}`
      const existingLatest = await complaints.findOne(
        { id: new RegExp(`^CC-${year}-\\d+$`) },
        { sort: { id: -1 }, projection: { id: 1 } },
      )
      const existingSequence = existingLatest
        ? Number(existingLatest.id.slice(`CC-${year}-`.length))
        : 0
      await counters.updateOne(
        { _id: counterId },
        { $max: { value: existingSequence }, $setOnInsert: { createdAt: new Date() } },
        { upsert: true },
      )
      const counter = await counters.findOneAndUpdate(
        { _id: counterId },
        { $inc: { value: 1 } },
        { returnDocument: 'after' },
      )
      const now = new Date()
      const data = {
        id: `CC-${year}-${String(counter.value).padStart(5, '0')}`,
        title: req.body.title.trim(),
        category: req.body.category.trim(),
        description: req.body.description.trim(),
        location: req.body.location.trim(),
        latitude: typeof req.body.latitude === 'number' ? req.body.latitude : null,
        longitude: typeof req.body.longitude === 'number' ? req.body.longitude : null,
        priority: req.body.priority || 'Medium',
        status: 'Submitted',
        department: typeof req.body.department === 'string' ? req.body.department.trim() : '',
        assignedWorker: typeof req.body.assignedWorker === 'string' ? req.body.assignedWorker.trim() : '',
        citizenName: req.body.citizenName.trim(),
        citizenEmail,
        photo: req.body.photo ?? null,
        createdAt: now,
        updatedAt: now,
        activity: Array.isArray(req.body.activity) ? req.body.activity : [],
      }

      await complaints.insertOne(data)
      return res.status(201).json({ success: true, message: 'Complaint created successfully', data })
    } catch (error) {
      console.error('Failed to create complaint:', error.message)
      return res.status(500).json({ success: false, message: 'Unable to create complaint', data: null })
    }
  })

  router.patch('/:id', async (req, res) => {
    if (!isRecord(req.body)) {
      return res.status(400).json({ success: false, message: 'Request body must be a JSON object', data: null })
    }

    const allowedFields = [
      'status',
      'priority',
      'department',
      'assignedWorker',
      'description',
      'location',
      'activity',
    ]
    const changes = Object.fromEntries(
      allowedFields
        .filter((field) => Object.hasOwn(req.body, field))
        .map((field) => [field, req.body[field]]),
    )
    if (!Object.keys(changes).length) {
      return res.status(400).json({ success: false, message: 'No supported complaint fields were provided', data: null })
    }
    if (changes.priority !== undefined && !allowedPriorities.includes(changes.priority)) {
      return res.status(400).json({ success: false, message: 'priority is not valid', data: null })
    }
    if (changes.activity !== undefined && !Array.isArray(changes.activity)) {
      return res.status(400).json({ success: false, message: 'activity must be an array', data: null })
    }
    for (const field of ['status', 'department', 'assignedWorker', 'description', 'location']) {
      if (changes[field] !== undefined && (typeof changes[field] !== 'string' || !changes[field].trim())) {
        return res.status(400).json({ success: false, message: `${field} must be a non-empty string`, data: null })
      }
      if (typeof changes[field] === 'string') changes[field] = changes[field].trim()
    }

    try {
      const current = await complaints.findOne({ id: req.params.id })
      if (!current) {
        return res.status(404).json({ success: false, message: 'Complaint not found', data: null })
      }

      const statusChanged = changes.status !== undefined && changes.status !== current.status
      const update = { $set: { ...changes, updatedAt: new Date() } }
      if (statusChanged) {
        update.$push = {
          activity: createActivityEntry(changes.status, `Complaint status changed from ${current.status} to ${changes.status}.`),
        }
      }
      const result = await complaints.findOneAndUpdate(
        { id: req.params.id },
        update,
        { returnDocument: 'after' },
      )
      return res.status(200).json({ success: true, message: 'Complaint updated successfully', data: result })
    } catch (error) {
      console.error('Failed to update complaint:', error.message)
      return res.status(500).json({ success: false, message: 'Unable to update complaint', data: null })
    }
  })

  router.delete('/:id', async (req, res) => {
    try {
      const result = await complaints.findOneAndDelete({ id: req.params.id })
      if (!result) {
        return res.status(404).json({ success: false, message: 'Complaint not found', data: null })
      }
      return res.status(200).json({ success: true, message: 'Complaint deleted successfully', data: result })
    } catch (error) {
      console.error('Failed to delete complaint:', error.message)
      return res.status(500).json({ success: false, message: 'Unable to delete complaint', data: null })
    }
  })

  return router
}

module.exports = createComplaintsRouter
