/*export const Modal = (content, modalId = '') => {
  const modal = document.createElement('div')
  modal.id = modalId
  modal.style.position = 'fixed'
  modal.style.top = '20%'
  modal.style.left = '35%'
  /* modal.style.width = '32%'
  modal.style.height = '44%'*/ /*
  modal.style.backgroundColor = 'black'
  modal.style.display = 'flex'
  modal.style.alignItems = 'center'
  modal.style.justifyContent = 'center'
  modal.style.zIndex = '1001'

  const modalContent = document.createElement('div')
  modalContent.className = 'modal-modificar'
  modalContent.style.backgroundColor = 'white'
  modalContent.style.padding = '5px'
  modalContent.style.borderRadius = '5px'

  modalContent.appendChild(content)

  const closeModalButton = document.createElement('button')

  closeModalButton.className = 'button'
  closeModalButton.textContent = 'Cerrar'
  closeModalButton.onclick = () => {
    modal.remove()
  }

  modalContent.appendChild(closeModalButton)

  modal.appendChild(modalContent)

  return modal
}

export const openModal = (content, modalId) => {
  const modal = Modal(content, modalId)
  document.body.appendChild(modal)
}

export const closeModal = (modalId) => {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.remove()
  }
}*/

export const Modal = (content, modalId = '') => {
  const modal = document.createElement('div')
  modal.id = modalId
  modal.style.position = 'fixed'
  modal.style.top = '0'
  modal.style.left = '0'
  modal.style.width = '100vw'
  modal.style.height = '100vh'
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
  modal.style.display = 'flex'
  modal.style.alignItems = 'center'
  modal.style.justifyContent = 'center'
  modal.style.zIndex = '1001'

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modalId)
    }
  })

  const modalContent = document.createElement('div')
  modalContent.className = 'modal-modificar'
  modalContent.style.backgroundColor = 'white'
  modalContent.style.padding = '5px'
  modalContent.style.borderRadius = '5px'

  modalContent.appendChild(content)
  modal.appendChild(modalContent)

  return modal
}

export const openModal = (content, modalId) => {
  const modal = Modal(content, modalId)
  document.body.appendChild(modal)
}

export const closeModal = (modalId) => {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.remove()
  }
}
