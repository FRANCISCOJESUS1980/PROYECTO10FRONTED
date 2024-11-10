export function renderEventos() {
  const app = document.getElementById('app')
  app.innerHTML = `
    <h1>Eventos</h1>
    <p>Esta es la página de eventos.</p>
  `
}
/*
import api from './services/api.js'
import { Header } from './components/header/Header.js'
import { Loading } from './components/Loading/loading.js'
import Swal from 'sweetalert2'
import { EventCard } from './components/tarjetaEventos/EventCard.js'
import { addCreateEventButton } from './components/crearEventos/openCreateEventButton.js'
import { createBall } from './components/crearBolas/createball.js'
import { createUserMenu } from './components/Usuarios/UserMenu.js'
import { crearModal } from './components/utils/Modalprincipal.js'
import { router } from './components/paginacion/router.js'

let token = localStorage.getItem('token') || null
const app = document.getElementById('app')

const showLoading = () => {
  const loading = Loading()
  app.innerHTML = ''
  app.appendChild(loading)
}

const hideLoading = () => {
  const loadingElement = document.querySelector('.loading')
  if (loadingElement) {
    loadingElement.remove()
  }
}

const showError = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message
  })
}

const isAuthenticated = () => {
  return !!token
}

const loadEvents = async () => {
  showLoading()
  try {
    const events = await api('/events', 'GET', null, token)
    hideLoading()

    app.innerHTML = ''

    const header = Header(handleRegister, handleLogin)
    app.appendChild(header)

    if (isAuthenticated()) {
      addCreateEventButton()
      createUserMenu()

      const buttonContainer = document.querySelector('div .button-container')
      if (buttonContainer) {
        buttonContainer.remove()
      }
    }

    events.forEach((event) => {
      const eventCard = EventCard(
        event,
        confirmAttendance,
        leaveEvent,
        deleteEvent,
        token,
        isAuthenticated
      )
      app.appendChild(eventCard)
    })
  } catch (error) {
    hideLoading()
    console.error('Error al cargar eventos:', error)

    if (
      error.message.includes('Token inválido') ||
      error.message.includes('ha expirado')
    ) {
      localStorage.removeItem('token')
      token = null
      Swal.fire({
        icon: 'warning',
        title: 'Sesión expirada',
        text: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.'
      }).then(() => {
        window.location.reload()
      })
    } else {
      showError('Error al cargar eventos. Intenta más tarde.')
    }
  }
}

const updateHeader = () => {
  const header = document.querySelector('header')
  if (header) {
    header.remove()
  }
  const newHeader = Header(handleRegister, handleLogin, isAuthenticated)
  document.body.prepend(newHeader)

  if (isAuthenticated()) {
    const loginButton = document.querySelector('.login-button')
    const registerButton = document.querySelector('.register-button')
    if (loginButton) loginButton.remove()
    if (registerButton) registerButton.remove()
    createUserMenu()
  }
}

const confirmAttendance = async (eventId) => {
  showLoading()
  if (!isAuthenticated()) {
    Swal.fire({
      icon: 'info',
      title: 'Iniciar sesión',
      text: 'Debes iniciar sesión para confirmar asistencia.'
    })
    hideLoading()
    return
  }
  try {
    await api(`/events/${eventId}/attend`, 'POST', null, token)
    Swal.fire({
      icon: 'success',
      title: 'Confirmar Asistencia',
      text: 'Has confirmado asistencia con éxito'
    })
    loadEvents()
  } catch (error) {
    hideLoading()
    console.error('Error al confirmar asistencia:', error)
    if (
      error.message.includes('Token inválido') ||
      error.message.includes('ha expirado')
    ) {
      localStorage.removeItem('token')
      token = null
      Swal.fire({
        icon: 'warning',
        title: 'Sesión expirada',
        text: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.'
      }).then(() => {
        window.location.reload()
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al confirmar asistencia. Intenta de nuevo.'
      })
    }
  }
}

const leaveEvent = async (eventId) => {
  showLoading()
  if (!isAuthenticated()) {
    Swal.fire({
      icon: 'info',
      title: 'Iniciar sesión',
      text: 'Debes iniciar sesión para salir del evento.'
    })
    hideLoading()
    return
  }
  try {
    await api(`/events/${eventId}/leave`, 'POST', null, token)
    Swal.fire({
      icon: 'success',
      title: 'Salir de evento',
      text: 'Has salido con éxito del evento'
    })
    loadEvents()
  } catch (error) {
    hideLoading()
    console.error('Error al salir del evento:', error)
    if (
      error.message.includes('Token inválido') ||
      error.message.includes('ha expirado')
    ) {
      localStorage.removeItem('token')
      token = null
      Swal.fire({
        icon: 'warning',
        title: 'Sesión expirada',
        text: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.'
      }).then(() => {
        window.location.reload()
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al salir del evento. Intenta de nuevo.'
      })
    }
  }
}

const deleteEvent = async (eventId) => {
  showLoading()
  if (!isAuthenticated()) {
    Swal.fire({
      icon: 'info',
      title: 'Iniciar sesión',
      text: 'Debes iniciar sesión para eliminar el evento.'
    })
    hideLoading()
    return
  }
  try {
    await api(`/events/${eventId}`, 'DELETE', null, token)
    Swal.fire({
      icon: 'success',
      title: 'Eliminar Evento',
      text: 'El evento ha sido eliminado con éxito'
    })
    loadEvents()
  } catch (error) {
    hideLoading()
    console.error('Error al eliminar evento:', error)
    if (
      error.message.includes('Token inválido') ||
      error.message.includes('ha expirado')
    ) {
      localStorage.removeItem('token')
      token = null
      Swal.fire({
        icon: 'warning',
        title: 'Sesión expirada',
        text: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.'
      }).then(() => {
        window.location.reload()
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al eliminar evento. Intenta de nuevo.'
      })
    }
  }
}

const handleRegister = (newToken) => {
  token = newToken
  localStorage.setItem('token', token)
  loadEvents()
}

const handleLogin = (newToken) => {
  token = newToken
  localStorage.setItem('token', token)
  loadEvents()
}

export function renderEventos() {
  crearModal()
  router()

  const newBall = createBall()
  document.body.appendChild(newBall)

  app.innerHTML = ''
  updateHeader()
  loadEvents()
}

// Llamar a la función cuando se cargue la página
document.addEventListener('DOMContentLoaded', renderEventos)*/
