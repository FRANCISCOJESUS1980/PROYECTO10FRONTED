import api from '../services/api'
import Swal from 'sweetalert2'

const RegisterForm = (onRegister) => {
  const form = document.createElement('form')
  form.innerHTML = `
    <h2>Registro</h2>
    <input type="text" id="username" placeholder="Nombre de usuario" required />
    <input type="email" id="email" placeholder="Correo electrónico" required />
    <input type="password" id="password" placeholder="Contraseña" required />
    <button type="submit">Registrarse</button>
    <button type="button" id="closeButton">Cerrar</button>
  `

  const closeModal = () => {
    const modal = document.getElementById('registerModal')
    if (modal) {
      modal.remove()
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const username = form.querySelector('#username').value
    const email = form.querySelector('#email').value
    const password = form.querySelector('#password').value

    console.log('Datos a enviar:', { username, email, password })

    try {
      const response = await api('/auth/register', 'POST', {
        username,
        email,
        password
      })

      console.log('Registro exitoso:', response)

      localStorage.setItem('token', response.token)
      localStorage.setItem('userId', response.userId)

      onRegister(response.token)
      form.reset()

      closeModal()

      Swal.fire({
        title: 'Registro exitoso!',
        text: 'Bienvenido a nuestra plataforma.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    } catch (error) {
      console.error('Error en el registro:', error)

      let errorMessage = 'Ocurrió un error.'
      if (error.message.includes('Usuario ya registrado')) {
        errorMessage =
          'El usuario ya existe. Por favor, intenta con otro correo o nombre de usuario.'
      } else if (error.message.includes('password')) {
        errorMessage = 'La contraseña debe tener al menos 8 caracteres.'
      } else {
        errorMessage = error.message
      }

      // closeModal()

      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
  })

  form.querySelector('#closeButton').addEventListener('click', closeModal)

  return form
}

export default RegisterForm
