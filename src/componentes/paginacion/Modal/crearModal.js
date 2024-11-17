import { navigateTo } from '../router'
import LoginForm from '../../Eventos/LogicaEventos/components/Loginform/loginform'
import RegisterForm from '../../Eventos/LogicaEventos/components/Usuarios/RegisterForm'
import { EventCard } from '../../Eventos/LogicaEventos/components/TarjetaEventos/EventCard'
import { loadEvents, isAuthenticated } from '../PaginaEventos/eventos.js'
import { addCreateEventButton } from '../../Eventos/LogicaEventos/components/CrearEventos/crearbotonEvents.js'
import { createUserMenu } from '../../Eventos/LogicaEventos/components/Usuarios/UserMenu.js'
import Swal from 'sweetalert2'

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

  function updateUIAfterLogin(newToken) {
    document.body.classList.add('logged-in')
    const protectedSection = document.querySelector('.auth-required')
    if (protectedSection) {
      protectedSection.style.display = 'block'
    }

    window.token = newToken
    localStorage.setItem('token', newToken)

    loginButton.style.display = 'none'

    addCreateEventButton()

    createUserMenu()

    loadEvents()

    window.isAuthenticated = true
  }

  function openLoginModal() {
    if (document.getElementById('loginModal')) return

    closeModal()

    const loginModal = document.createElement('div')
    loginModal.id = 'loginModal'
    loginModal.classList.add('modal')

    const onLogin = (newToken) => {
      loginModal.remove()
      updateUIAfterLogin(newToken)
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: 'Bienvenido de nuevo',
        timer: 2000,
        showConfirmButton: false
      })
    }

    const form = LoginForm(onLogin)

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
      }
    })
  }

  function openRegisterModal() {
    if (document.getElementById('registerModal')) return

    const registerModal = document.createElement('div')
    registerModal.id = 'registerModal'
    registerModal.classList.add('modal')

    const onRegister = (newToken) => {
      registerModal.remove()
      updateUIAfterLogin(newToken)
      Swal.fire({
        title: 'Registro exitoso',
        text: 'Bienvenido a nuestra plataforma',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    }

    const form = RegisterForm(onRegister)

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
      }
    })
  }

  function handleLogout() {
    localStorage.removeItem('token')
    window.token = null
    window.isAuthenticated = false
    document.body.classList.remove('logged-in')

    const userMenu = document.getElementById('user-menu')
    if (userMenu) userMenu.remove()
    const createEventButton = document.querySelector('.create-event-button')
    if (createEventButton) createEventButton.remove()

    loginButton.style.display = 'block'

    loadEvents()

    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión exitosamente',
      timer: 2000,
      showConfirmButton: false
    })
  }
}
