import api from '../../services/api.js'
import { loadEvents } from '../../../../../paginacion/Eventoslogic/loadEvents.js'
import { closeModal } from '../../Usuarios/Modal.js'
import showAlert from '../../AlertComponent/AlerComponet.js'

async function handleUpdateEvent(eventId) {
  const title = document.getElementById('title').value
  const date = document.getElementById('date').value
  const location = document.getElementById('location').value
  const description = document.getElementById('description').value
  const image = document.getElementById('image').files[0]

  if (title.length < 3 || title.length > 20) {
    showAlert({
      icon: 'warning',
      title: 'Título inválido',
      text: 'El título debe tener entre 3 y 20 caracteres.',
      confirmButtonText: 'Corregir'
    })
    return
  }

  if (location.length > 14) {
    showAlert({
      icon: 'warning',
      title: 'Ubicación inválida',
      text: 'La ubicación no debe superar los 14 caracteres.',
      confirmButtonText: 'Corregir'
    })
    return
  }

  if (description.length > 20) {
    showAlert({
      icon: 'warning',
      title: 'Descripción inválida',
      text: 'La descripción no debe superar los 20 caracteres.',
      confirmButtonText: 'Corregir'
    })
    return
  }

  const formData = new FormData()
  formData.append('title', title)
  formData.append('date', date)
  formData.append('location', location)
  formData.append('description', description)
  if (image) formData.append('image', image)

  try {
    const token = localStorage.getItem('token')
    const response = await api(`/events/${eventId}`, 'PUT', formData, token)

    showAlert({
      icon: 'success',
      title: 'Evento actualizado',
      text: 'El evento se ha actualizado exitosamente.',
      confirmButtonText: 'Aceptar'
    })

    loadEvents()
    closeModal('handleUpdateEvent')
  } catch (error) {
    console.error('Error al actualizar el evento:', error)
    showAlert({
      icon: 'error',
      title: 'Error al actualizar el evento',
      text: error.message,
      confirmButtonText: 'Intentar de nuevo'
    })
  }
}

export default handleUpdateEvent
