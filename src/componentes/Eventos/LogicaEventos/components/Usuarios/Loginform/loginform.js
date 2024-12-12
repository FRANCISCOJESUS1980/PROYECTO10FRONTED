import { openBaseModal, closeBaseModal } from '../BaseModal/BaseModal'
import api from '../../services/api'
import showAlert from '../../AlertComponent/AlerComponet'

const LoginForm = (onLogin) => {
  const form = document.createElement('form')
  form.innerHTML = `
    <h2>Iniciar Sesión</h2>
    <input type="email" id="email" placeholder="Correo electrónico" required />
    <input type="password" id="password" placeholder="Contraseña" required />
    <button type="submit">Iniciar Sesión</button>
  `

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = form.querySelector('#email').value
    const password = form.querySelector('#password').value

    try {
      const user = await api('/auth/login', 'POST', { email, password })
      localStorage.setItem('token', user.token)
      onLogin(user.token)
      form.reset()

      closeBaseModal('loginModal')

      await showAlert({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: 'Bienvenido de nuevo',
        timer: 2000,
        showConfirmButton: false
      })
    } catch (error) {
      console.error('Error en el inicio de sesión:', error)

      let errorMessage

      switch (true) {
        case error.status === 401:
          errorMessage =
            'Correo o contraseña incorrectos. Por favor, intenta de nuevo.'
          break
        case Boolean(error.message):
          errorMessage = error.message
          break
        default:
          errorMessage = 'Error inesperado al iniciar sesión.'
      }

      await showAlert({
        icon: 'error',
        title: 'Error',
        text: errorMessage
      })
    }
  })

  return form
}

export const openLoginModal = (onLogin) => {
  const loginForm = LoginForm(onLogin)
  openBaseModal(loginForm, 'loginModal')
}

export default LoginForm
