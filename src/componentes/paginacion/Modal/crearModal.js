import { navigateTo } from '../router'
import LoginForm from '../../Eventos/LogicaEventos/components/Loginform/loginform'
import RegisterForm from '../../Eventos/LogicaEventos/components/Usuarios/RegisterForm'

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

  const loginButton = document.createElement('button')
  loginButton.textContent = 'Login'
  loginButton.addEventListener('click', openLoginModal)
  modalContainer.appendChild(loginButton)

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

  function openLoginModal() {
    if (document.getElementById('loginModal')) return

    closeModal()

    const loginModal = document.createElement('div')
    loginModal.id = 'loginModal'
    loginModal.classList.add('modal')

    const form = LoginForm(() => {
      loginModal.remove()
      toggleButton.classList.remove('hidden')
    })

    const closeButton = document.createElement('button')
    closeButton.textContent = 'Cerrar'
    closeButton.addEventListener('click', () => loginModal.remove())

    const registerLink = document.createElement('a')
    registerLink.href = '#'
    registerLink.textContent = '¿No tienes cuenta? Regístrate'
    registerLink.addEventListener('click', (e) => {
      e.preventDefault()
      loginModal.remove()
      openRegisterModal()
    })

    loginModal.appendChild(form)
    loginModal.appendChild(registerLink)
    loginModal.appendChild(closeButton)
    document.body.appendChild(loginModal)

    loginModal.addEventListener('click', (event) => {
      if (event.target === loginModal) {
        loginModal.remove()
        toggleButton.classList.remove('hidden')
      }
    })
  }

  function openRegisterModal() {
    if (document.getElementById('registerModal')) return

    const registerModal = document.createElement('div')
    registerModal.id = 'registerModal'
    registerModal.classList.add('modal')

    const form = RegisterForm(() => {
      registerModal.remove()
      toggleButton.classList.remove('hidden')
    })

    const closeButton = document.createElement('button')
    closeButton.textContent = 'Cerrar'
    closeButton.addEventListener('click', () => registerModal.remove())

    const loginLink = document.createElement('a')
    loginLink.href = '#'
    loginLink.textContent = '¿Ya tienes cuenta? Inicia sesión'
    loginLink.addEventListener('click', (e) => {
      e.preventDefault()
      registerModal.remove()
      openLoginModal()
    })

    registerModal.appendChild(form)
    registerModal.appendChild(loginLink)
    registerModal.appendChild(closeButton)
    document.body.appendChild(registerModal)

    registerModal.addEventListener('click', (event) => {
      if (event.target === registerModal) {
        registerModal.remove()
        toggleButton.classList.remove('hidden')
      }
    })
  }
}
