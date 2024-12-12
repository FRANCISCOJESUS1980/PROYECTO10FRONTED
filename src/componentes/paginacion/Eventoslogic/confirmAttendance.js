import api from '../../Eventos/LogicaEventos/components/services/api.js'
import showAlert from '../../Eventos/LogicaEventos/components/AlertComponent/AlerComponet.js'
import { loadEvents } from './loadEvents.js'
import { Loading } from '../../Eventos/LogicaEventos/components/Loading/loading.js'
import { isAuthenticated } from '../PaginaEventos/eventos.js'

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

export const confirmAttendance = async (eventId) => {
  showLoading()
  if (!isAuthenticated()) {
    showAlert({
      icon: 'info',
      title: 'Iniciar sesión',
      text: 'Debes iniciar sesión para confirmar asistencia.'
    })
    hideLoading()
    return
  }
  try {
    await api(`/events/${eventId}/attend`, 'POST', null, window.token)
    showAlert({
      icon: 'success',
      title: 'Asistencia Confirmada',
      text: 'Has confirmado asistencia con éxito'
    })
    loadEvents()
  } catch (error) {
    hideLoading()
    console.error('Error al confirmar asistencia:', error)
    showAlert({
      icon: 'error',
      title: 'Error al confirmar asistencia',
      text: 'Error al confirmar asistencia. Intenta de nuevo.'
    })
  }
}
