import { Loading } from '../../Eventos/LogicaEventos/components/Loading/loading'

export const showLoading = () => {
  const app = document.getElementById('app')
  const loading = Loading()
  app.innerHTML = ''
  app.appendChild(loading)
}

export const hideLoading = () => {
  const loadingElement = document.querySelector('.loading')
  if (loadingElement) {
    loadingElement.remove()
  }
}
