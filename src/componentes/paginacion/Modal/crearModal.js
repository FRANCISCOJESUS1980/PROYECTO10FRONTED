import { navigateTo } from '../router'
import LoginForm from '../../Eventos/LogicaEventos/components/Usuarios/Loginform/loginform.js'
import RegisterForm from '../../Eventos/LogicaEventos/components/Usuarios/RegisterForm'
import { loadEvents, isAuthenticated } from '../PaginaEventos/eventos.js'
import { addCreateEventButton } from '../../Eventos/LogicaEventos/components/CrearEventos/crearbotonEventos/crearbotonEvents.js'
import { createUserMenu } from '../../Eventos/LogicaEventos/components/Usuarios/UserMenu/UserMenu.js'
import showAlert from '../../Eventos/LogicaEventos/components/AlertComponent/AlerComponet.js'

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

  menuItems.forEach((item) => {
    const button = document.createElement('button')
    button.textContent = item.name
    button.addEventListener('click', () => {
      closeModal()
      navigateTo(item.path)
    })
    modalContainer.appendChild(button)
  })

  const loginButton = document.createElement('button')
  loginButton.textContent = 'Iniciar Sesión'
  loginButton.id = 'login-button'
  loginButton.addEventListener('click', () => {
    closeModal()
    openLoginModal()
  })
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

  document.addEventListener('click', (event) => {
    const isOutsideClick =
      !modalContainer.contains(event.target) && event.target !== toggleButton
    if (isOutsideClick) closeModal()
  })

  function updateUIAfterLogin(newToken) {
    document.body.classList.add('logged-in')
    window.token = newToken
    localStorage.setItem('token', newToken)

    const loginButton = document.getElementById('login-button')
    if (loginButton) loginButton.style.display = 'none'

    createUserMenu()
    addCreateEventButton()
    loadEvents()
    window.isAuthenticated = true
  }

  function createModal(id, form, extraLinks = []) {
    if (document.getElementById(id)) return

    const modal = document.createElement('div')
    modal.id = id
    modal.classList.add('modal')

    const closeButton = document.createElement('button')
    closeButton.textContent = 'Cerrar'
    closeButton.addEventListener('click', () => modal.remove())

    modal.appendChild(form)
    extraLinks.forEach((link) => modal.appendChild(link))
    modal.appendChild(closeButton)
    document.body.appendChild(modal)

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.remove()
      }
    })

    return modal
  }

  function openLoginModal() {
    if (isAuthenticated()) {
      showAlert({
        title: 'Ya has iniciado sesión',
        text: 'Cierra sesión en el botón pequeño de arriba a la derecha en la página de próximos eventos para poder volver a iniciar',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      })
      closeModal()
      return
    }

    const onLogin = (newToken) => {
      document.getElementById('loginModal').remove()
      updateUIAfterLogin(newToken)
      showAlert({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: 'Bienvenido de nuevo',
        timer: 2000,
        showConfirmButton: false
      })
    }

    const form = LoginForm(onLogin)

    const registerLink = document.createElement('a')
    registerLink.href = '#'
    registerLink.textContent = '¿No tienes cuenta? Regístrate'
    registerLink.addEventListener('click', (e) => {
      e.preventDefault()
      document.getElementById('loginModal').remove()
      openRegisterModal()
    })

    createModal('loginModal', form, [registerLink])
  }

  function openRegisterModal() {
    if (document.getElementById('registerModal')) return

    const onRegister = (newToken) => {
      document.getElementById('registerModal').remove()
      updateUIAfterLogin(newToken)
      showAlert({
        title: 'Registro exitoso',
        text: 'Bienvenido a nuestra plataforma',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    }

    const form = RegisterForm(onRegister)

    const loginLink = document.createElement('a')
    loginLink.href = '#'
    loginLink.textContent = '¿Ya tienes cuenta? Inicia sesión'
    loginLink.addEventListener('click', (e) => {
      e.preventDefault()
      document.getElementById('registerModal').remove()
      openLoginModal()
    })

    createModal('registerModal', form, [loginLink])
  }
}
