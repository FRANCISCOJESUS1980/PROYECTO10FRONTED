import Swal from 'sweetalert2'

const showAlert = ({
  icon = 'info',
  title = '',
  text = '',
  confirmButtonText = 'Aceptar',
  showCancelButton = false,
  cancelButtonText = 'Cancelar',
  customClass = {},
  ...rest
}) => {
  return Swal.fire({
    icon,
    title,
    text,
    confirmButtonText,
    showCancelButton,
    cancelButtonText,
    customClass,
    ...rest
  })
}

export default showAlert
