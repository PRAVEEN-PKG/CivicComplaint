import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'civic-complaints-v1'

export class ComplaintStorageError extends Error {
  constructor(cause) {
    super('Complaint data could not be saved in browser storage.', { cause })
    this.name = 'ComplaintStorageError'
  }
}

const seedComplaints = [
  {
    id: 'CC-2026-00124',
    title: 'Large pothole near Main Road',
    category: 'Road Damage',
    description: 'A deep pothole has formed near the Main Road crossing and is creating a hazard for people driving and cycling through the area. It becomes difficult to see after sunset.',
    location: 'Main Road, Sector 5',
    submittedAt: '2026-10-04T09:42:00.000Z',
    status: 'Submitted',
    priority: 'High',
    department: 'Roads & Infrastructure',
    assignedWorker: 'Unassigned',
    image: { name: 'road-condition-demo.jpg', demo: true },
    updates: [
      {
        id: 'CC-2026-00124-update-1',
        title: 'Complaint submitted successfully',
        description: 'Your report was received and added to the city service queue.',
        timestamp: '2026-10-04T09:42:00.000Z',
        department: 'Citizen Service Desk',
        status: 'Submitted',
      },
    ],
  },
  {
    id: 'CC-2026-00123',
    title: 'Streetlight not working',
    category: 'Streetlight',
    description: 'The streetlight outside the community park has been out for several nights, leaving the walkway difficult to see after dark.',
    location: 'Park Avenue, Sector 4',
    submittedAt: '2026-10-03T18:10:00.000Z',
    status: 'In Progress',
    priority: 'Medium',
    department: 'Electrical',
    assignedWorker: 'Arun Mehta',
    image: null,
    updates: [
      {
        id: 'CC-2026-00123-update-1',
        title: 'Work in progress',
        description: 'The electrical team is inspecting the streetlight and preparing a repair.',
        timestamp: '2026-10-04T08:15:00.000Z',
        department: 'Electrical',
        status: 'In Progress',
      },
      {
        id: 'CC-2026-00123-update-2',
        title: 'Complaint submitted successfully',
        description: 'Your report was received and added to the city service queue.',
        timestamp: '2026-10-03T18:10:00.000Z',
        department: 'Citizen Service Desk',
        status: 'Submitted',
      },
    ],
  },
  {
    id: 'CC-2026-00122',
    title: 'Garbage accumulation',
    category: 'Garbage & Waste',
    description: 'Waste has accumulated at the market collection point and needs a scheduled pickup and cleanup.',
    location: 'Green Park Market Area',
    submittedAt: '2026-10-02T10:30:00.000Z',
    status: 'Resolved',
    priority: 'High',
    department: 'Sanitation',
    assignedWorker: 'Nisha Rao',
    image: null,
    updates: [
      {
        id: 'CC-2026-00122-update-1',
        title: 'Issue resolved',
        description: 'The collection point was cleared and the pickup schedule confirmed.',
        timestamp: '2026-10-03T16:20:00.000Z',
        department: 'Sanitation',
        status: 'Resolved',
      },
      {
        id: 'CC-2026-00122-update-2',
        title: 'Complaint submitted successfully',
        description: 'Your report was received and added to the city service queue.',
        timestamp: '2026-10-02T10:30:00.000Z',
        department: 'Citizen Service Desk',
        status: 'Submitted',
      },
    ],
  },
  {
    id: 'CC-2026-00121',
    title: 'Water leakage on road',
    category: 'Water Leakage',
    description: 'Water is continuously leaking from a roadside pipe, creating a slippery surface and wasting clean water near the station entrance.',
    location: 'Station Road',
    submittedAt: '2026-10-01T13:18:00.000Z',
    status: 'In Progress',
    priority: 'Critical',
    department: 'Water Supply',
    assignedWorker: 'Imran Khan',
    image: null,
    updates: [
      {
        id: 'CC-2026-00121-update-1',
        title: 'Urgent repair in progress',
        description: 'An emergency crew is working to isolate and repair the leak.',
        timestamp: '2026-10-01T14:05:00.000Z',
        department: 'Water Supply',
        status: 'In Progress',
      },
      {
        id: 'CC-2026-00121-update-2',
        title: 'Complaint submitted successfully',
        description: 'Your report was received and added to the city service queue.',
        timestamp: '2026-10-01T13:18:00.000Z',
        department: 'Citizen Service Desk',
        status: 'Submitted',
      },
    ],
  },
  {
    id: 'CC-2026-00120',
    title: 'Blocked drainage',
    category: 'Drainage',
    description: 'A blocked drain is causing water to collect along the footpath near the ward office.',
    location: 'Ward 12',
    submittedAt: '2026-09-30T11:36:00.000Z',
    status: 'Submitted',
    priority: 'Medium',
    department: 'Roads & Infrastructure',
    assignedWorker: 'Unassigned',
    image: null,
    updates: [
      {
        id: 'CC-2026-00120-update-1',
        title: 'Complaint submitted successfully',
        description: 'Your report was received and added to the city service queue.',
        timestamp: '2026-09-30T11:36:00.000Z',
        department: 'Citizen Service Desk',
        status: 'Submitted',
      },
    ],
  },
  {
    id: 'CC-2026-00119',
    title: 'Damaged pedestrian crossing sign',
    category: 'Public Safety',
    description: 'The crossing sign near the school entrance is damaged and is difficult for drivers to read.',
    location: 'Oak Street',
    submittedAt: '2026-09-29T08:24:00.000Z',
    status: 'Reopened',
    priority: 'Low',
    department: 'Public Safety',
    assignedWorker: 'Sara Patel',
    image: null,
    updates: [
      {
        id: 'CC-2026-00119-update-1',
        title: 'Complaint reopened for follow-up',
        description: 'The repair requires a follow-up inspection.',
        timestamp: '2026-10-04T09:10:00.000Z',
        department: 'Public Safety',
        status: 'Reopened',
      },
      {
        id: 'CC-2026-00119-update-2',
        title: 'Complaint submitted successfully',
        description: 'Your report was received and added to the city service queue.',
        timestamp: '2026-09-29T08:24:00.000Z',
        department: 'Citizen Service Desk',
        status: 'Submitted',
      },
    ],
  },
  {
    id: 'CC-2026-00118',
    title: 'Damaged sidewalk curb',
    category: 'Road Damage',
    description: 'A section of the curb has broken away near the community garden, making the sidewalk uneven.',
    location: 'Willow Lane',
    submittedAt: '2026-09-20T14:11:00.000Z',
    status: 'Resolved',
    priority: 'Low',
    department: 'Roads & Infrastructure',
    assignedWorker: 'Dev Shah',
    image: null,
    updates: [
      {
        id: 'CC-2026-00118-update-1',
        title: 'Issue resolved',
        description: 'The curb repair was completed and the pedestrian path is clear.',
        timestamp: '2026-09-23T11:45:00.000Z',
        department: 'Roads & Infrastructure',
        status: 'Resolved',
      },
      {
        id: 'CC-2026-00118-update-2',
        title: 'Complaint submitted successfully',
        description: 'Your report was received and added to the city service queue.',
        timestamp: '2026-09-20T14:11:00.000Z',
        department: 'Citizen Service Desk',
        status: 'Submitted',
      },
    ],
  },
  {
    id: 'CC-2026-00125',
    title: 'Blocked storm drain after rainfall',
    category: 'Drainage',
    description: 'Rainwater is pooling beside the crosswalk because the storm drain appears to be blocked with leaves and debris.',
    location: 'Cedar Street, Ward 8',
    submittedAt: '2026-10-03T07:25:00.000Z',
    status: 'Under Review',
    priority: 'Medium',
    department: 'Roads & Infrastructure',
    assignedWorker: 'Unassigned',
    image: { name: 'storm-drain-demo.jpg', demo: true },
    updates: [
      {
        id: 'CC-2026-00125-update-1',
        title: 'Complaint reviewed by municipal team',
        description: 'The service desk is checking the reported location and drainage details.',
        timestamp: '2026-10-03T09:10:00.000Z',
        department: 'Citizen Service Desk',
        status: 'Under Review',
      },
      {
        id: 'CC-2026-00125-update-2',
        title: 'Complaint submitted successfully',
        description: 'Your report was received and added to the city service queue.',
        timestamp: '2026-10-03T07:25:00.000Z',
        department: 'Citizen Service Desk',
        status: 'Submitted',
      },
    ],
  },
]

let cachedComplaints
let sortedSnapshot
const subscribers = new Set()

function parseComplaints(serialized) {
  const value = JSON.parse(serialized)
  if (!Array.isArray(value) || value.some((complaint) => !complaint?.id || !Array.isArray(complaint.updates))) {
    throw new Error('Saved CivicComplaint data is not in the expected format.')
  }
  return value
}

function initializeComplaints() {
  if (cachedComplaints) return cachedComplaints

  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved !== null) {
    cachedComplaints = parseComplaints(saved)
    return cachedComplaints
  }

  cachedComplaints = seedComplaints
  persistComplaints(cachedComplaints)
  return cachedComplaints
}

function notifySubscribers() {
  subscribers.forEach((subscriber) => subscriber())
}

function persistComplaints(complaints) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints))
  } catch (error) {
    throw new ComplaintStorageError(error)
  }
}

function handleStorageChange(event) {
  if (event.key !== STORAGE_KEY && event.key !== null) return
  cachedComplaints = event.newValue === null ? seedComplaints : parseComplaints(event.newValue)
  sortedSnapshot = undefined
  subscribers.forEach((subscriber) => subscriber())
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', handleStorageChange)
}

export function getComplaints() {
  initializeComplaints()
  if (!sortedSnapshot) {
    sortedSnapshot = [...cachedComplaints].sort(
      (first, second) => second.submittedAt.localeCompare(first.submittedAt),
    )
  }
  return sortedSnapshot
}

export function getComplaintById(id) {
  return initializeComplaints().find((complaint) => complaint.id === id) || null
}

export function subscribeToComplaints(subscriber) {
  subscribers.add(subscriber)
  return () => {
    subscribers.delete(subscriber)
  }
}

export function useComplaints() {
  return useSyncExternalStore(subscribeToComplaints, getComplaints, () => seedComplaints)
}

export function updateComplaint(id, changes) {
  const currentComplaints = initializeComplaints()
  const current = currentComplaints.find((complaint) => complaint.id === id)
  if (!current) return null

  const changedFields = ['status', 'priority', 'department', 'assignedWorker']
    .filter((field) => changes[field] !== undefined && changes[field] !== current[field])
  if (!changedFields.length) return current

  const nextComplaint = { ...current, ...changes }
  const now = new Date()
  const timestamp = now.toISOString()
  const summary = changedFields
    .map((field) => `${field === 'assignedWorker' ? 'worker' : field} changed to ${nextComplaint[field]}`)
    .join('; ')
  const update = {
    id: `${id}-update-${Date.now()}`,
    title: changedFields.includes('status')
      ? `Status updated to ${nextComplaint.status}`
      : 'Complaint assignment updated',
    description: summary,
    timestamp,
    department: nextComplaint.department || '',
    status: nextComplaint.status,
  }
  nextComplaint.updates = [update, ...current.updates]

  const nextComplaints = currentComplaints.map((complaint) => (
    complaint.id === id ? nextComplaint : complaint
  ))
  persistComplaints(nextComplaints)
  cachedComplaints = nextComplaints
  sortedSnapshot = undefined
  notifySubscribers()
  return nextComplaint
}

export function createComplaint({ title, category, description, location, image }) {
  const currentComplaints = initializeComplaints()
  const year = new Date().getFullYear()
  const prefix = `CC-${year}-`
  const nextNumber = currentComplaints.reduce((highest, complaint) => {
    if (!complaint.id.startsWith(prefix)) return highest
    const number = Number(complaint.id.slice(prefix.length))
    return Number.isFinite(number) ? Math.max(highest, number) : highest
  }, 0) + 1
  const id = `${prefix}${String(nextNumber).padStart(5, '0')}`
  const submittedAt = new Date().toISOString()
  const complaint = {
    id,
    title: title.trim(),
    category,
    description: description.trim(),
    location: location.trim(),
    submittedAt,
    status: 'Submitted',
    priority: 'Medium',
    department: departmentForCategory(category),
    assignedWorker: 'Unassigned',
    image: image ? { name: image.name, demo: true } : null,
    updates: [{
      id: `${id}-update-1`,
      title: 'Complaint submitted successfully',
      description: 'Your report was received and added to the city service queue.',
      timestamp: submittedAt,
      department: 'Citizen Service Desk',
      status: 'Submitted',
    }],
  }
  const nextComplaints = [complaint, ...currentComplaints]
  persistComplaints(nextComplaints)
  cachedComplaints = nextComplaints
  sortedSnapshot = undefined
  notifySubscribers()
  return complaint
}

function departmentForCategory(category) {
  if (category === 'Road Damage' || category === 'Drainage' || category === 'Traffic Signal') {
    return 'Roads & Infrastructure'
  }
  if (category === 'Garbage & Waste') return 'Sanitation'
  if (category === 'Streetlight') return 'Electrical'
  if (category === 'Water Leakage') return 'Water Supply'
  if (category === 'Public Safety') return 'Public Safety'
  return 'Citizen Service Desk'
}

export function formatComplaintDate(value) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}
