import { crearModal } from './src/componentes/paginacion/Modal/crearModal'
import { router, navigateTo } from './src/componentes/paginacion/router'
import { Loading } from './src/componentes/Eventos/LogicaEventos/components/Loading/loading'
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname === '/') {
    Loading()
    navigateTo('/home')
  } else {
    Loading()
    router()
  }
})

crearModal()
