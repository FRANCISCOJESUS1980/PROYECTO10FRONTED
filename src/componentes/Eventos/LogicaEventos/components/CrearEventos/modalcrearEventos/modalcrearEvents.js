import {
  openBaseModal,
  closeBaseModal
} from '../../Usuarios/BaseModal/BaseModal'
import handleCreateEvent from '../createEvents'

const CreateEventForm = () => {
  const form = document.createElement('form')
  form.innerHTML = `
    <h2>Crear Evento</h2>
    <label for="title">Título:</label>
    <input type="text" id="title" required>
    <label for="date">Fecha:</label>
    <input type="date" id="date" required>
    <label for="location">Ubicación:</label>
    <input type="text" id="location" required>
    <label for="description">Descripción:</label>
    <textarea id="description" required></textarea>
    <label for="image">Imagen:</label>
    <input type="file" id="image" accept="image/*" required>
    <button type="submit">Crear Evento</button>
    <button type="button" id="closeButton" style="margin-top: 10px;">Cerrar</button>
  `

  form.addEventListener('submit', async (e) => {
    const success = await handleCreateEvent(e)
    if (success) {
      closeBaseModal('createEventModal')
    }
  })

  form
    .querySelector('#closeButton')
    .addEventListener('click', () => closeBaseModal('createEventModal'))

  return form
}

export const openCreateEventModal = () => {
  const createEventForm = CreateEventForm()
  openBaseModal(createEventForm, 'createEventModal')
}
