import { openBaseModal, closeBaseModal } from './BaseModal/BaseModal'
import api from '../services/api'
import showAlert from '../AlertComponent/AlerComponet'

const RegisterForm = (onRegister) => {
  const form = document.createElement('form')
  form.innerHTML = `
    <h2>Registro</h2>
    <input type="text" id="username" placeholder="Nombre de usuario" required />
    <input type="email" id="email" placeholder="Correo electrónico" required />
    <input type="password" id="password" placeholder="Contraseña" required />
    <button type="submit">Registrarse</button>
  `

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const username = form.querySelector('#username').value
    const email = form.querySelector('#email').value
    const password = form.querySelector('#password').value

    try {
      const response = await api('/auth/register', 'POST', {
        username,
        email,
        password
      })

      localStorage.setItem('token', response.token)
      localStorage.setItem('userId', response.userId)

      onRegister(response.token)
      form.reset()

      closeBaseModal('registerModal')

      showAlert({
        title: 'Registro exitoso!',
        text: 'Bienvenido a nuestra plataforma.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    } catch (error) {
      console.error('Error en el registro:', error)

      let errorMessage

      switch (true) {
        case error.message.includes('password'):
          errorMessage =
            'La longitud de la contraseña debe tener al menos 8 caracteres.'
          break
        case error.message.includes('username'):
          errorMessage =
            'El nombre de usuario debe tener al menos 3 caracteres.'
          break
        case error.message.includes('email'):
          errorMessage = 'El email debe ser válido.'
          break
        case error.message.includes('Usuario ya registrado'):
          errorMessage =
            'El usuario ya existe. Por favor, intenta con otro correo o nombre de usuario.'
          break
        default:
          errorMessage = 'Ocurrió un error inesperado.'
      }

      showAlert({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
  })

  return form
}

export const openRegisterModal = (onRegister) => {
  const registerForm = RegisterForm(onRegister)
  openBaseModal(registerForm, 'registerModal')
}

export default RegisterForm
