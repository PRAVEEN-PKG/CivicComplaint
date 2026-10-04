const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/+$/, '')

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    })
  } catch {
    throw new Error(`Unable to reach the CivicComplaint API at ${API_BASE_URL}. Make sure the backend is running.`)
  }

  let result
  try {
    result = await response.json()
  } catch {
    throw new Error('The CivicComplaint API returned an invalid response.')
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message || `The API request failed with status ${response.status}.`)
  }

  return result.data
}

export function getComplaints() {
  return request('/complaints')
}

export function getComplaintById(id) {
  return request(`/complaints/${encodeURIComponent(id)}`)
}

export function createComplaint(data) {
  return request('/complaints', { method: 'POST', body: JSON.stringify(data) })
}

export function updateComplaint(id, data) {
  return request(`/complaints/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export function deleteComplaint(id) {
  return request(`/complaints/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
