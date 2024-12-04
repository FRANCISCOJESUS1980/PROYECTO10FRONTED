import { openModal } from '../../Usuarios/Modal.js'
import handleUpdateEvent from '../updateEventos/updateEvent.js'
import showAlert from '../../AlertComponent/AlerComponet.js'

let currentExpandedCard = null

const EventCard = (
  event,
  onConfirm,
  onLeave,
  onDelete,
  token,
  isAuthenticated
) => {
  const card = document.createElement('div')
  card.classList.add('event-card')

  const eventId = event.id || event._id

  let userId = null
  let isCreator = false
  let userIsAttending = false

  try {
    if (token && typeof token === 'string' && token.trim() !== '') {
      const decodedToken = JSON.parse(atob(token.split('.')[1]))
      userId = decodedToken.id
    }
  } catch (e) {
    console.error('Error al decodificar el token:', e)
    showAlert({
      icon: 'error',
      title: 'Error de autenticación',
      text: 'No se puede verificar su autenticación. Por favor inicie sesión de nuevo.'
    })
    return card
  }

  if (event.creator) {
    isCreator = event.creator.toString() === userId
  }

  if (Array.isArray(event.attendees)) {
    userIsAttending = event.attendees.includes(userId)
  }

  let expanded = false

  card.innerHTML = `
    <img src="${event.imageUrl}" alt="${event.title}" class="event-image" />
    <h3 class="event-name">${event.title}</h3>
    <p class="event-description">${event.description}</p>
    <p class="event-date">Fecha: ${new Date(event.date).toLocaleString()}</p>
    <p class="event-location">Ubicación: ${event.location}</p>
    <p class="event-attendees">Asistentes: ${
      event.attendees ? event.attendees.length : 0
    }</p>
    <div class="event-buttons"></div>
  `

  const buttonContainer = card.querySelector('.event-buttons')

  const toggleExpansion = () => {
    if (expanded) {
      card.classList.remove('expanded')
      buttonContainer.innerHTML = ''
      expanded = false
      currentExpandedCard = null
    } else {
      if (currentExpandedCard && currentExpandedCard !== card) {
        currentExpandedCard.classList.remove('expanded')
        const prevButtonContainer =
          currentExpandedCard.querySelector('.event-buttons')
        if (prevButtonContainer) prevButtonContainer.innerHTML = ''
      }

      card.classList.add('expanded')
      buttonContainer.innerHTML = ''

      if (typeof isAuthenticated === 'function' && !isAuthenticated()) {
        showAlert({
          icon: 'warning',
          title: 'Inicia sesión',
          text: 'Debes iniciar sesión para interactuar con los eventos.'
        })
        return
      }

      if (isCreator) {
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Eliminar Evento'
        deleteButton.addEventListener('click', (e) => {
          e.stopPropagation()
          showAlert({
            title: '¿Estás seguro?',
            text: 'No podrás deshacer esta acción.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
              onDelete(eventId)
              showAlert({
                title: '¡Eliminado!',
                text: 'El evento ha sido eliminado.',
                icon: 'success'
              })
            }
          })
        })
        buttonContainer.appendChild(deleteButton)

        const updateButton = document.createElement('button')
        updateButton.textContent = 'Modificar Evento'
        updateButton.addEventListener('click', (e) => {
          e.stopPropagation()

          const form = document.createElement('form')
          form.innerHTML = `
            <label for="title">Título:</label>
            <input type="text" id="title" value="${event.title}" required />

            <label for="date">Fecha:</label>
            <input type="datetime-local" id="date" value="${new Date(event.date)
              .toISOString()
              .slice(0, 16)}" required />

            <label for="location">Ubicación:</label>
            <input type="text" id="location" value="${
              event.location
            }" required />

            <label for="description">Descripción:</label>
            <textarea id="description" required>${event.description}</textarea>

            <label for="image">Imagen:</label>
            <input type="file" id="image" />

            <button type="button" id="update-button">Modificar</button>
          `

          form
            .querySelector('#update-button')
            .addEventListener('click', (ev) => {
              ev.preventDefault()
              handleUpdateEvent(eventId)
            })

          openModal(form, 'handleUpdateEvent')
        })
        buttonContainer.appendChild(updateButton)
      } else if (userIsAttending) {
        const leaveButton = document.createElement('button')
        leaveButton.textContent = 'Salir del Evento'
        leaveButton.addEventListener('click', (e) => {
          e.stopPropagation()
          showAlert({
            title: '¿Quieres salir del evento?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              onLeave(eventId)
              showAlert({
                title: 'Has salido del evento.',
                icon: 'success'
              })
            }
          })
        })
        buttonContainer.appendChild(leaveButton)
      } else {
        const confirmButton = document.createElement('button')
        confirmButton.textContent = 'Confirmar Asistencia'
        confirmButton.addEventListener('click', (e) => {
          e.stopPropagation()
          showAlert({
            title: '¿Quieres confirmar tu asistencia?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, confirmar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              onConfirm(eventId)
              showAlert({
                title: '¡Asistencia confirmada!',
                icon: 'success'
              })
            }
          })
        })
        buttonContainer.appendChild(confirmButton)
      }

      expanded = true
      currentExpandedCard = card
    }
  }

  card.addEventListener('click', (e) => {
    toggleExpansion()
  })

  return card
}

export { EventCard }
