/*export function renderEventos() {
  const app = document.getElementById('app')

  app.innerHTML = `
   
    <h1>Eventos</h1>
    <p>Esta es la página de eventos.</p>
  `
}*/

import RegisterForm from '../../Eventos/LogicaEventos/components/Usuarios/RegisterForm.js'
import LoginForm from '../../Eventos/LogicaEventos/components/Loginform/loginform.js'
import { Modal } from '../../Eventos/LogicaEventos/components/Usuarios/Modal.js'

const clearModals = () => {
  const existingModal = document.querySelector('.modal')
  if (existingModal) {
    existingModal.remove()
  }
}

const Header = (handleRegister, handleLogin) => {
  const headerElement = document.createElement('header')
  headerElement.className = 'header-container'

  headerElement.innerHTML = `
    <div class="header-left">
      <h1 class="header-title">EVENTOS</h1>
    </div>
    <img src="/assets/imagenes/foto15.jpg" alt="Logo" class="header-image" />
    <div class="button-container">
      <button id="registerBtn" class="header-button">Registrarse</button>
      <button id="loginBtn" class="header-button">Iniciar Sesión</button>
    </div>
  `

  headerElement.querySelector('#registerBtn').onclick = () => {
    clearModals()
    const modal = Modal(RegisterForm(handleRegister), 'registerModal')
    document.body.appendChild(modal)
  }

  headerElement.querySelector('#loginBtn').onclick = () => {
    clearModals()
    const modal = Modal(LoginForm(handleLogin), 'loginModal')
    document.body.appendChild(modal)
  }

  return headerElement
}

export function renderEventos() {
  const app = document.getElementById('app')

  app.innerHTML = ''

  const handleRegister = () => {
    console.log('Funcionalidad de registro activada')
  }

  const handleLogin = () => {
    console.log('Funcionalidad de inicio de sesión activada')
  }

  const header = Header(handleRegister, handleLogin)
  app.appendChild(header)

  const eventosContent = document.createElement('div')
  eventosContent.innerHTML = `
    <h1>Eventos</h1>
    <p>Esta es la página de eventos.</p>
  `
  app.appendChild(eventosContent)
}

export default renderEventos
