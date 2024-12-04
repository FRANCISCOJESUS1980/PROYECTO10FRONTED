import showAlert from '../AlertComponent/AlerComponet.js'
import api from '../services/api.js'
import { loadEvents } from '../../../../paginacion/PaginaEventos/eventos.js'
import { Loading } from '../Loading/loading.js'

async function handleCreateEvent(e) {
  e.preventDefault()

  const title = document.getElementById('title').value
  const date = document.getElementById('date').value
  const location = document.getElementById('location').value
  const description = document.getElementById('description').value
  const image = document.getElementById('image').files[0]

  if (title.length < 3 || title.length > 16) {
    await showAlert({
      icon: 'warning',
      title: 'Título inválido',
      text: 'El título debe tener entre 3 y 16 caracteres.',
      confirmButtonText: 'Corregir'
    })
    return false
  }

  if (location.length > 14) {
    await showAlert({
      icon: 'warning',
      title: 'Ubicación inválida',
      text: 'La ubicación no debe superar los 14 caracteres.',
      confirmButtonText: 'Corregir'
    })
    return false
  }

  if (description.length > 20) {
    await showAlert({
      icon: 'warning',
      title: 'Descripción inválida',
      text: 'La descripción no debe superar los 20 caracteres.',
      confirmButtonText: 'Corregir'
    })
    return false
  }

  const formData = new FormData()
  formData.append('title', title)
  formData.append('date', date)
  formData.append('location', location)
  formData.append('description', description)
  formData.append('image', image)

  const submitButton = document.querySelector('button[type="submit"]')
  submitButton.disabled = true
  submitButton.textContent = 'Creando...'
  Loading()

  try {
    await api('/events', 'POST', formData, localStorage.getItem('token'))

    await showAlert({
      icon: 'success',
      title: 'Evento creado',
      text: 'El evento se ha creado exitosamente.',
      confirmButtonText: 'Aceptar'
    })

    loadEvents()
    return true
  } catch (error) {
    console.error('Error al crear el evento:', error)

    const message =
      error.response && error.response.status === 400
        ? error.response.data.message || 'Error al crear el evento.'
        : 'La fecha no puede ser anterior ni igual a hoy. Inténtalo de nuevo.'

    await showAlert({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonText: 'Intentar de nuevo'
    })

    return false
  } finally {
    submitButton.disabled = false
    submitButton.textContent = 'Crear Evento'
  }
}

export default handleCreateEvent
