import Swal from 'sweetalert2'
import api from '../services/api'

export function createUserMenu() {
  const appDiv = document.getElementById('app')
  if (!appDiv) {
    console.error('No se encontró el elemento con id "app".')
    return
  }

  const menuContainer = document.createElement('div')
  menuContainer.classList.add('menu-container')

  const menuIcon = document.createElement('div')
  menuIcon.classList.add('menu-icon')
  menuIcon.innerText = '☰'

  const dropdownMenu = document.createElement('div')
  dropdownMenu.classList.add('dropdown-menu')

  const deleteUserBtn = document.createElement('button')
  deleteUserBtn.innerText = 'Eliminar usuario'
  deleteUserBtn.onclick = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará tu cuenta de usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      try {
        const userId = localStorage.getItem('userId')
        if (!userId) {
          Swal.fire('Error', 'No se encontró el ID del usuario.', 'error')
          return
        }

        await api(
          `/auth/delete/${userId}`,
          'DELETE',
          null,
          localStorage.getItem('token')
        )

        Swal.fire('¡Eliminado!', 'Tu cuenta ha sido eliminada.', 'success')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        window.location.reload()
      } catch (error) {
        console.error('Error al eliminar usuario:', error)
        Swal.fire(
          'Error',
          error.message || 'Ocurrió un error al intentar eliminar el usuario',
          'error'
        )
      }
    }
  }

  const logoutBtn = document.createElement('button')
  logoutBtn.innerText = 'Cerrar sesión'
  logoutBtn.onclick = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token')
        Swal.fire(
          'Sesión cerrada',
          'Has cerrado sesión correctamente',
          'success'
        )
        window.location.reload()
      }
    })
  }

  dropdownMenu.appendChild(deleteUserBtn)
  dropdownMenu.appendChild(logoutBtn)

  menuContainer.appendChild(menuIcon)
  menuContainer.appendChild(dropdownMenu)

  appDiv.appendChild(menuContainer)

  menuIcon.onclick = () => {
    dropdownMenu.classList.toggle('show')
  }

  document.addEventListener('click', (event) => {
    const isClickInsideMenu =
      menuContainer.contains(event.target) || menuIcon.contains(event.target)
    if (!isClickInsideMenu) {
      dropdownMenu.classList.remove('show')
    }
  })

  return function removeUserMenu() {
    appDiv.removeChild(menuContainer)
  }
}
