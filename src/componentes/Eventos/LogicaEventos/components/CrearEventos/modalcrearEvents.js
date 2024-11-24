import handleCreateEvent from './createEvents'

export function openCreateEventModal() {
  const modalOverlay = document.createElement('div')
  modalOverlay.className = 'modal-overlay'

  const modalContent = document.createElement('div')
  modalContent.className = 'modal-content'
  modalContent.innerHTML = `
   
    <h2>Crear Evento</h2>
    <form id="create-event-form">
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
    </form>
  `

  modalOverlay.appendChild(modalContent)
  document.body.appendChild(modalOverlay)

  function closeModal() {
    document.body.removeChild(modalOverlay)
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal()
    }
  })

  modalContent
    .querySelector('#create-event-form')
    .addEventListener('submit', async (e) => {
      const success = await handleCreateEvent(e)
      if (success) {
        closeModal()
      }
    })
}
