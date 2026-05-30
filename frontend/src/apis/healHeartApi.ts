const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error('API error')
  if (res.status === 204) return undefined as T
  return res.json()
}

export const healHeartApi = {
  getMessages: (token: string) =>
    request(`${API_URL}/heal-messages`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    }),

  createMessage: (token: string, text: string, username: string) =>
    request(`${API_URL}/heal-messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ text, username }),
    }),

  updateMessage: (token: string, id: string, text: string) =>
    request(`${API_URL}/heal-messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ text }),
    }),

  deleteMessage: (token: string, id: string) =>
    request(`${API_URL}/heal-messages/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    }),
}