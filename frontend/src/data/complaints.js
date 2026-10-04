import { useEffect, useSyncExternalStore } from 'react'
import * as complaintsApi from '../services/api.js'

let snapshot = { complaints: [], loading: true, error: '' }
let requestInProgress = null
let hasLoaded = false
let lastLoadedAt = 0
const subscribers = new Set()

function notify(nextSnapshot) {
  snapshot = nextSnapshot
  subscribers.forEach((subscriber) => subscriber())
}

export function normalizeComplaint(complaint) {
  const createdAt = complaint.createdAt || complaint.submittedAt
  const photo = typeof complaint.photo === 'string'
    ? { name: complaint.photo }
    : complaint.photo || complaint.image || null
  return {
    ...complaint,
    status: complaint.status || 'Submitted',
    priority: complaint.priority || 'Medium',
    department: complaint.department || 'Unassigned',
    assignedWorker: complaint.assignedWorker || 'Unassigned',
    submittedAt: createdAt,
    image: photo,
    updates: Array.isArray(complaint.activity)
      ? complaint.activity
      : Array.isArray(complaint.updates)
        ? complaint.updates
        : [],
  }
}

export function formatComplaintDate(value) {
  if (!value) return 'Date unavailable'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Date unavailable'
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export async function refreshComplaints() {
  if (requestInProgress) return requestInProgress
  notify({ ...snapshot, loading: true, error: '' })
  requestInProgress = complaintsApi.getComplaints()
    .then((items) => {
      const complaints = items.map(normalizeComplaint)
      complaints.sort((first, second) => second.submittedAt.localeCompare(first.submittedAt))
      hasLoaded = true
      lastLoadedAt = Date.now()
      notify({ complaints, loading: false, error: '' })
      return complaints
    })
    .catch((error) => {
      hasLoaded = true
      lastLoadedAt = Date.now()
      notify({ ...snapshot, loading: false, error: error.message })
      return []
    })
    .finally(() => {
      requestInProgress = null
    })
  return requestInProgress
}

export function useComplaints() {
  const state = useSyncExternalStore(
    (subscriber) => {
      subscribers.add(subscriber)
      return () => subscribers.delete(subscriber)
    },
    () => snapshot,
    () => ({ complaints: [], loading: true, error: '' }),
  )

  useEffect(() => {
    if (!hasLoaded || Date.now() - lastLoadedAt > 10000) refreshComplaints()
    const refreshOnFocus = () => refreshComplaints()
    const intervalId = window.setInterval(refreshComplaints, 15000)
    window.addEventListener('focus', refreshOnFocus)
    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('focus', refreshOnFocus)
    }
  }, [])

  return { ...state, refresh: refreshComplaints }
}

export async function createComplaint(data) {
  const created = normalizeComplaint(await complaintsApi.createComplaint(data))
  const complaints = [created, ...snapshot.complaints.filter((item) => item.id !== created.id)]
    .sort((first, second) => second.submittedAt.localeCompare(first.submittedAt))
  hasLoaded = true
  lastLoadedAt = Date.now()
  notify({ complaints, loading: false, error: '' })
  return created
}

export async function updateComplaint(id, changes) {
  const updated = normalizeComplaint(await complaintsApi.updateComplaint(id, changes))
  const complaints = snapshot.complaints.map((complaint) => (
    complaint.id === id ? updated : complaint
  ))
  notify({ ...snapshot, complaints })
  return updated
}

export async function deleteComplaint(id) {
  const deleted = await complaintsApi.deleteComplaint(id)
  notify({
    ...snapshot,
    complaints: snapshot.complaints.filter((complaint) => complaint.id !== id),
  })
  return deleted
}
