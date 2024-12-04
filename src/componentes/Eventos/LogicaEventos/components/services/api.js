const API_URL = 'http://localhost:3000/api'

const isTokenExpired = (token) => {
  const payload = JSON.parse(atob(token.split('.')[1]))
  const now = Date.now() / 1000
  return payload.exp < now
}

const api = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {}

  if (token) {
    if (isTokenExpired(token)) {
      localStorage.removeItem('token')
      throw new Error(
        'Token inválido o ha expirado. Por favor, inicia sesión de nuevo.'
      )
    }
    headers['Authorization'] = `Bearer ${token}`
  }

  let options = { method, headers }

  if (body) {
    if (body instanceof FormData) {
      options.body = body
    } else {
      headers['Content-Type'] = 'application/json'
      options.body = JSON.stringify(body)
    }
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || response.statusText)
    }

    if (response.status === 204) {
      return null
    }

    return response.json()
  } catch (error) {
    console.error('Error en la función fetch:', error)
    throw error
  }
}

export default api
