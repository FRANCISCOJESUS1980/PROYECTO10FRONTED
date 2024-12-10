import { crearModal } from './src/componentes/paginacion/Modal/crearModal'
import { router, navigateTo } from './src/componentes/paginacion/router'
import { Loading } from './src/componentes/Eventos/LogicaEventos/components/Loading/loading'
import {
  loadEvents,
  isAuthenticated
} from './src/componentes/paginacion/PaginaEventos/eventos.js'
import { createUserMenu } from './src/componentes/Eventos/LogicaEventos/components/Usuarios/UserMenu/UserMenu.js'
import { addCreateEventButton } from './src/componentes/Eventos/LogicaEventos/components/CrearEventos/crearbotonEventos/crearbotonEvents.js'

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token')

  if (isAuthenticated()) {
    initializeAuthenticatedState(token)
  } else {
    localStorage.removeItem('token')
  }

  if (window.location.pathname === '/') {
    Loading()
    navigateTo('/home')
  } else {
    Loading()
    router()
  }

  crearModal()
})

function initializeAuthenticatedState(token) {
  document.body.classList.add('logged-in')
  window.token = token
  window.isAuthenticated = true

  createUserMenu()
  addCreateEventButton()
  loadEvents()

  const loginButton = document.querySelector(
    '#modal-container button[textContent="Login"]'
  )
  if (loginButton) loginButton.style.display = 'none'
}
