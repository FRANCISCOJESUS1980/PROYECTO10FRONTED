/*import { createUserMenu } from '../../Eventos/LogicaEventos/components/Usuarios/userMenu'

const Header = () => {
  const headerElement = document.createElement('header')
  headerElement.className = 'header-container'

  headerElement.innerHTML = `
    <div class="header-left">
      <h1 class="header-title">EVENTOS</h1>
    </div>
    <img src="/assets/imagenes/foto15.jpg" alt="Logo" class="header-image" />
    
  `
  return headerElement
}

export function renderEventos() {
  const app = document.getElementById('app')

  app.innerHTML = ''

  const header = Header()
  //addCreateEventButton()
  createUserMenu()
  //openCreateEventModal()
  app.appendChild(header)

  const eventosContent = document.createElement('div')
  eventosContent.innerHTML = `
    <h1>Eventos</h1>
    <p>Esta es la página de eventos.</p>
  `
  app.appendChild(eventosContent)
}

export default renderEventos*/

import api from '../../Eventos/LogicaEventos/components/services/api.js'
import Header from '../../Eventos/LogicaEventos/components/Header/header.js'
import { Loading } from '../../Eventos/LogicaEventos/components/Loading/loading.js'
import Swal from 'sweetalert2'
import { EventCard } from '../../Eventos/LogicaEventos/components/TarjetaEventos/EventCard.js'
import { addCreateEventButton } from '../../Eventos/LogicaEventos/components/CrearEventos/crearbotonEvents.js'

import { createUserMenu } from '../../Eventos/LogicaEventos/components/Usuarios/UserMenu.js'
import { crearModal } from '../Modal/crearModal.js'

let token = localStorage.getItem('token') || null
const app = document.getElementById('app')

// Función para mostrar el loader
const showLoading = () => {
  const loading = Loading()
  app.innerHTML = ''
  app.appendChild(loading)
}

// Función para ocultar el loader
const hideLoading = () => {
  const loadingElement = document.querySelector('.loading')
  if (loadingElement) {
    loadingElement.remove()
  }
}

// Función para mostrar los errores
const showError = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message
  })
}

// Función de autenticación
export const isAuthenticated = () => {
  return !!token // Verifica si el token existe
}

// Cargar eventos
export const loadEvents = async () => {
  showLoading()
  try {
    const events = await api('/events', 'GET', null, token) // Llamada a la API para cargar eventos
    hideLoading()

    app.innerHTML = '' // Limpiar el contenedor antes de renderizar nuevos eventos

    // Renderizar el header
    const header = Header(handleRegister, handleLogin)
    app.appendChild(header)

    // Si el usuario está autenticado, mostrar el botón de crear evento y el menú de usuario
    if (isAuthenticated()) {
      addCreateEventButton() // Botón de creación de evento
      createUserMenu() // Menú del usuario
    }

    // Crear tarjetas de eventos y agregarlas al contenedor
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

    // Si el token ha expirado o es inválido, limpiar el token y redirigir
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
        window.location.reload() // Recargar la página para redirigir
      })
    } else {
      showError('Error al cargar eventos. Intenta más tarde.')
    }
  }
}

// Confirmar asistencia a un evento
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
    await api(`/events/${eventId}/attend`, 'POST', null, token) // Confirmar asistencia
    Swal.fire({
      icon: 'success',
      title: 'Asistencia Confirmada',
      text: 'Has confirmado asistencia con éxito'
    })
    loadEvents() // Recargar los eventos
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

// Salir de un evento
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
    await api(`/events/${eventId}/leave`, 'POST', null, token) // Dejar el evento
    Swal.fire({
      icon: 'success',
      title: 'Salir del evento',
      text: 'Has salido del evento con éxito'
    })
    loadEvents() // Recargar los eventos
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

// Eliminar un evento
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
    await api(`/events/${eventId}`, 'DELETE', null, token) // Eliminar el evento
    Swal.fire({
      icon: 'success',
      title: 'Evento Eliminado',
      text: 'El evento ha sido eliminado con éxito'
    })
    loadEvents() // Recargar los eventos
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

// Manejo de registro de usuario
const handleRegister = (newToken) => {
  token = newToken
  localStorage.setItem('token', token)
  loadEvents()
}

// Manejo de inicio de sesión de usuario
const handleLogin = (newToken) => {
  token = newToken
  localStorage.setItem('token', token)
  loadEvents()
}

// Función principal para renderizar la página de eventos
export const renderEventos = () => {
  app.innerHTML = '' // Limpiar el contenedor de la página actual
  loadEvents() // Cargar los eventos al visitar la página

  // Renderizar el header
  const header = Header(handleRegister, handleLogin, isAuthenticated)
  document.body.prepend(header) // Prepend para mantener el header fijo en la parte superior

  loadEvents() // Cargar nuevamente los eventos, por si se necesita alguna actualización extra
}
