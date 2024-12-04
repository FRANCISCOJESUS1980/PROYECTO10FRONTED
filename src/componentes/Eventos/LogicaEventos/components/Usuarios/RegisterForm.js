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

      const errorMessage = error.message.includes('password')
        ? 'La longitud de la contraseña debe tener al menos 8 caracteres.'
        : error.message.includes('username')
        ? 'El nombre de usuario debe tener al menos 3 caracteres.'
        : error.message.includes('email')
        ? 'El email debe ser válido.'
        : error.message.includes('Usuario ya registrado')
        ? 'El usuario ya existe. Por favor, intenta con otro correo o nombre de usuario.'
        : 'Ocurrió un error inesperado.'

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
