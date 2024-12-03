const BaseModal = (content, modalId, onClose) => {
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

  const modalContent = document.createElement('div')
  modalContent.className = 'modal-content'
  modalContent.style.backgroundColor = 'white'
  modalContent.style.padding = '20px'
  modalContent.style.borderRadius = '8px'
  modalContent.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)'

  modalContent.appendChild(content)
  modal.appendChild(modalContent)

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      onClose?.()
      modal.remove()
    }
  })

  return modal
}

export const openBaseModal = (content, modalId = '', onClose) => {
  const modal = BaseModal(content, modalId, onClose)
  document.body.appendChild(modal)
}

export const closeBaseModal = (modalId) => {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.remove()
  }
}
