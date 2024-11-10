import { renderHome } from './Home/home'
import { renderContacto } from './Contacto/contacto'
import { renderEventos } from './eventos'

export function router() {
  const path = window.location.pathname

  if (path === '/' || path === '/home') {
    renderHome()
  } else if (path === '/contacto') {
    renderContacto()
  } else if (path === '/eventos') {
    renderEventos()
  }
}

export function navigateTo(route) {
  history.pushState({}, '', route)
  router()
}

window.addEventListener('popstate', router)
