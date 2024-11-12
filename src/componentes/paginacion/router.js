import { renderHome } from './Home/home'
import { renderContacto } from './Contacto/contacto'
import { renderEventos } from './PaginaEventos/eventos'

export function router() {
  const path = window.location.pathname

  const app = document.getElementById('app')
  if (app) {
    app.innerHTML = ''
  }
  const header = document.querySelector('header')
  if (header) header.remove()

  const eventosContainer = document.getElementById('event-container')
  if (eventosContainer) eventosContainer.remove()

  switch (path) {
    case '/home':
      renderHome()
      break
    case '/contacto':
      renderContacto()
      break
    case '/eventos':
      renderEventos()
      break
    case '/':
    default:
      navigateTo('/home')
      break
  }
}

export function navigateTo(route) {
  history.pushState({}, '', route)
  router()
}

window.addEventListener('popstate', router)
