import Header from '../../Eventos/LogicaEventos/components/Header/header.js'
import showAlert from '../../Eventos/LogicaEventos/components/AlertComponent/AlerComponet.js'
import { crearModal } from '../../paginacion/Modal/crearModal.js'
import { loadEvents } from '../Eventoslogic/loadEvents.js'

const app = document.getElementById('app')

export const showError = (message) => {
  showAlert({
    icon: 'error',
    title: 'Error',
    text: message
  })
}

export const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const now = Date.now() / 1000
    return payload.exp >= now
  } catch (error) {
    console.error('Error decoding token:', error)
    return false
  }
}

export const handleRegister = (newToken) => {
  window.token = newToken
  window.isAuthenticated = true
  localStorage.setItem('token', newToken)
  loadEvents()
}

export const handleLogin = (newToken) => {
  window.token = newToken
  window.isAuthenticated = true
  localStorage.setItem('token', newToken)
  loadEvents()
}

export const renderEventos = () => {
  app.innerHTML = ''
  loadEvents()

  const header = Header(handleRegister, handleLogin, isAuthenticated)
  document.body.prepend(header)

  crearModal()
}
