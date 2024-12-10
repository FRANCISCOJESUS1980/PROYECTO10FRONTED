import api from '../../services/api'
import showAlert from '../../AlertComponent/AlerComponet'

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
    const result = await showAlert({
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
          showAlert({
            icon: 'error',
            title: 'Error',
            text: 'No se encontró el ID del usuario.',
            confirmButtonText: 'Aceptar'
          })
          return
        }

        await api(
          `/auth/delete/${userId}`,
          'DELETE',
          null,
          localStorage.getItem('token')
        )

        showAlert({
          icon: 'success',
          title: '¡Eliminado!',
          text: 'Tu cuenta ha sido eliminada.',
          confirmButtonText: 'Aceptar'
        })

        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        window.location.reload()
      } catch (error) {
        console.error('Error al eliminar usuario:', error)
        showAlert({
          icon: 'error',
          title: 'Error',
          text:
            error.message || 'Ocurrió un error al intentar eliminar el usuario',
          confirmButtonText: 'Aceptar'
        })
      }
    }
  }

  const logoutBtn = document.createElement('button')
  logoutBtn.innerText = 'Cerrar sesión'
  logoutBtn.onclick = () => {
    showAlert({
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
        showAlert({
          icon: 'success',
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión correctamente',
          confirmButtonText: 'Aceptar'
        })
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
