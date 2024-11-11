import { crearModal } from './src/componentes/paginacion/Modal/crearModal'
import { router, navigateTo } from './src/componentes/paginacion/router'

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname === '/') {
    navigateTo('/home')
  } else {
    router()
  }
})

crearModal()
