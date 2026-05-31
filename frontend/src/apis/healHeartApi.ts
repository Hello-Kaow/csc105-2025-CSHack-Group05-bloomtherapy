const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
// const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000')+ '/api'

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const { headers, ...rest } = options || {}
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...headers },
    ...rest,
  })
  if (!res.ok) throw new Error('API error')
  if (res.status === 204) return undefined as T
  return res.json()
}

export const healHeartApi = {
  getMessages: (token: string) =>
    request(`${API_URL}/api/heal-messages`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  createMessage: (token: string, text: string, username: string) =>
    request(`${API_URL}/api/heal-messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ text, username }),
    }),

  updateMessage: (token: string, id: string, text: string) =>
    request(`${API_URL}/api/heal-messages/${id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ text }),
    }),

  deleteMessage: (token: string, id: string) =>
    request(`${API_URL}/api/heal-messages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),
}