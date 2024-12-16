const API_URL = 'https://vercel.com/francisco-jesus-projects/proyecto-10/api'

const isTokenExpired = (token) => {
  const payload = JSON.parse(atob(token.split('.')[1]))
  const now = Date.now() / 1000
  return payload.exp < now
}

const handleApiError = (error) => {
  console.error('Error en la API:', error)
  if (error.message.includes('Token inválido')) {
    localStorage.removeItem('token')
  }
  throw error
}

const api = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {}

  if (token) {
    if (isTokenExpired(token)) {
      handleApiError(
        new Error(
          'Token inválido o ha expirado. Por favor, inicia sesión de nuevo.'
        )
      )
    }
    headers['Authorization'] = `Bearer ${token}`
  }

  const options = { method, headers }

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
      handleApiError(new Error(errorData.message || response.statusText))
    }

    if (response.status === 204) return null

    return response.json()
  } catch (error) {
    handleApiError(error)
  }
}

export default api
