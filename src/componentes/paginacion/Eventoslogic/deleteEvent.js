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

export const deleteEvent = async (eventId) => {
  showLoading()
  if (!isAuthenticated()) {
    showAlert({
      icon: 'info',
      title: 'Iniciar sesión',
      text: 'Debes iniciar sesión para eliminar el evento.'
    })
    hideLoading()
    return
  }
  try {
    await api(`/events/${eventId}`, 'DELETE', null, window.token)
    showAlert({
      icon: 'success',
      title: 'Evento Eliminado',
      text: 'El evento ha sido eliminado con éxito'
    })
    loadEvents()
  } catch (error) {
    hideLoading()
    console.error('Error al eliminar evento:', error)
    showAlert({
      icon: 'error',
      title: 'Error al eliminar evento',
      text: 'Error al eliminar el evento. Intenta de nuevo.'
    })
  }
}
