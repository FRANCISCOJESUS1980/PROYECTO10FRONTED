import { navigateTo } from '../router'

export function crearModal() {
  const toggleButton = document.createElement('button')
  toggleButton.id = 'toggle-button'
  toggleButton.innerHTML = '&lt;'
  toggleButton.setAttribute('aria-label', 'Abrir menú')
  document.body.appendChild(toggleButton)

  const modalWrapper = document.createElement('div')
  modalWrapper.id = 'modal-wrapper'

  const modalContainer = document.createElement('div')
  modalContainer.id = 'modal-container'

  const menuItems = [
    { name: 'Home', path: '/home' },
    { name: 'Contacto', path: '/contacto' },
    { name: 'Próximos Eventos', path: '/eventos' }
  ]

  const menuButtons = menuItems.map((item) => {
    const button = document.createElement('button')
    button.textContent = item.name
    button.addEventListener('click', () => {
      closeModal()
      navigateTo(item.path)
    })
    return button
  })

  menuButtons.forEach((button) => modalContainer.appendChild(button))
  modalWrapper.appendChild(modalContainer)
  document.body.appendChild(modalWrapper)

  function openModal() {
    modalWrapper.classList.add('open')
    toggleButton.classList.add('hidden')
  }

  function closeModal() {
    modalWrapper.classList.remove('open')
    toggleButton.classList.remove('hidden')
  }

  toggleButton.addEventListener('click', openModal)
  modalWrapper.addEventListener('click', (event) => {
    if (event.target === modalWrapper) {
      closeModal()
    }
  })

  document.addEventListener('click', (event) => {
    if (
      !modalContainer.contains(event.target) &&
      event.target !== toggleButton
    ) {
      closeModal()
    }
  })
}
