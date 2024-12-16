import api from '../../Eventos/LogicaEventos/components/services/api.js'
import showAlert from '../../Eventos/LogicaEventos/components/AlertComponent/AlerComponet.js'
import { loadEvents } from './loadEvents.js'
import { isAuthenticated } from '../PaginaEventos/eventos.js'
import { showLoading, hideLoading } from './showLoadingHideLoading.js'

export const leaveEvent = async (eventId) => {
  showLoading()
  if (!isAuthenticated()) {
    showAlert({
      icon: 'info',
      title: 'Iniciar sesión',
      text: 'Debes iniciar sesión para salir del evento.'
    })
    hideLoading()
    return
  }
  try {
    await api(`/events/${eventId}/leave`, 'POST', null, window.token)
    showAlert({
      icon: 'success',
      title: 'Salir del evento',
      text: 'Has salido del evento con éxito'
    })
    loadEvents()
  } catch (error) {
    hideLoading()
    console.error('Error al salir del evento:', error)
    showAlert({
      icon: 'error',
      title: 'Error al salir del evento',
      text: 'Error al salir del evento. Intenta de nuevo.'
    })
  }
}
