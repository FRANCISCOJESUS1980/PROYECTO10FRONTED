import showAlert from '../AlertComponent/AlerComponet.js'
import api from '../services/api.js'
import { loadEvents } from '../../../../paginacion/Eventoslogic/loadEvents.js'
import { Loading } from '../Loading/loading.js'

const validateEventFields = ({ title, location, description }) => {
  if (title.length < 3 || title.length > 16) {
    return 'El título debe tener entre 3 y 16 caracteres.'
  }

  if (location.length > 14) {
    return 'La ubicación no debe superar los 14 caracteres.'
  }

  if (description.length > 20) {
    return 'La descripción no debe superar los 20 caracteres.'
  }

  return null
}

async function handleCreateEvent(e) {
  e.preventDefault()

  const title = document.getElementById('title').value
  const date = document.getElementById('date').value
  const location = document.getElementById('location').value
  const description = document.getElementById('description').value
  const image = document.getElementById('image').files[0]

  const validationError = validateEventFields({ title, location, description })
  if (validationError) {
    await showAlert({
      icon: 'warning',
      title: 'Campos inválidos',
      text: validationError,
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
    const message = error.message.includes(
      'La fecha no puede ser anterior ni igual a hoy'
    )
      ? 'La fecha no puede ser anterior ni igual a hoy. Inténtalo de nuevo.'
      : error.message

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
