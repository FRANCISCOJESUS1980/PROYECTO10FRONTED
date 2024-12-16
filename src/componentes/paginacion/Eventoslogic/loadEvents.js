import api from '../../Eventos/LogicaEventos/components/services/api.js'
import Header from '../../Eventos/LogicaEventos/components/Header/header.js'
import showAlert from '../../Eventos/LogicaEventos/components/AlertComponent/AlerComponet.js'
import { EventCard } from '../../Eventos/LogicaEventos/components/TarjetaEventos/EventCard/EventCard.js'
import { addCreateEventButton } from '../../Eventos/LogicaEventos/components/CrearEventos/crearbotonEventos/crearbotonEvents.js'
import { createUserMenu } from '../../Eventos/LogicaEventos/components/Usuarios/UserMenu/UserMenu.js'
import {
  handleRegister,
  handleLogin,
  showError,
  isAuthenticated
} from '../PaginaEventos/eventos.js'
import { confirmAttendance } from './confirmAttendance.js'
import { leaveEvent } from './leaveEvent.js'
import { deleteEvent } from './deleteEvent.js'
import { showLoading, hideLoading } from './showLoadingHideLoading.js'

const app = document.getElementById('app')

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
      showAlert({
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
