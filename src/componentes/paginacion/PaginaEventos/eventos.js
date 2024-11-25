import api from '../../Eventos/LogicaEventos/components/services/api.js'
import Header from '../../Eventos/LogicaEventos/components/Header/header.js'
import { Loading } from '../../Eventos/LogicaEventos/components/Loading/loading.js'
import Swal from 'sweetalert2'
import { EventCard } from '../../Eventos/LogicaEventos/components/TarjetaEventos/EventCard/EventCard.js'
import { addCreateEventButton } from '../../Eventos/LogicaEventos/components/CrearEventos/crearbotonEventos/crearbotonEvents.js'
import { createUserMenu } from '../../Eventos/LogicaEventos/components/Usuarios/UserMenu.js'
import { crearModal } from '../../paginacion/Modal/crearModal.js'

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

export const isAuthenticated = () => {
  return window.isAuthenticated
}

export const loadEvents = async () => {
  showLoading()
  try {
    const events = await api('/events', 'GET', null, window.token)
    hideLoading()

    app.innerHTML = ''

    const header = Header(handleRegister, handleLogin)
    app.appendChild(header)

    if (isAuthenticated()) {
      addCreateEventButton()
      createUserMenu()
    }

    events.forEach((event) => {
      const eventCard = EventCard(
        event,
        confirmAttendance,
        leaveEvent,
        deleteEvent,
        window.token,
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
      window.token = null
      window.isAuthenticated = false
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
    await api(`/events/${eventId}/attend`, 'POST', null, window.token)
    Swal.fire({
      icon: 'success',
      title: 'Asistencia Confirmada',
      text: 'Has confirmado asistencia con éxito'
    })
    loadEvents()
  } catch (error) {
    hideLoading()
    console.error('Error al confirmar asistencia:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error al confirmar asistencia',
      text: 'Error al confirmar asistencia. Intenta de nuevo.'
    })
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
    await api(`/events/${eventId}/leave`, 'POST', null, window.token)
    Swal.fire({
      icon: 'success',
      title: 'Salir del evento',
      text: 'Has salido del evento con éxito'
    })
    loadEvents()
  } catch (error) {
    hideLoading()
    console.error('Error al salir del evento:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error al salir del evento',
      text: 'Error al salir del evento. Intenta de nuevo.'
    })
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
    await api(`/events/${eventId}`, 'DELETE', null, window.token)
    Swal.fire({
      icon: 'success',
      title: 'Evento Eliminado',
      text: 'El evento ha sido eliminado con éxito'
    })
    loadEvents()
  } catch (error) {
    hideLoading()
    console.error('Error al eliminar evento:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error al eliminar evento',
      text: 'Error al eliminar el evento. Intenta de nuevo.'
    })
  }
}

const handleRegister = (newToken) => {
  window.token = newToken
  window.isAuthenticated = true
  localStorage.setItem('token', newToken)
  loadEvents()
}

const handleLogin = (newToken) => {
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
