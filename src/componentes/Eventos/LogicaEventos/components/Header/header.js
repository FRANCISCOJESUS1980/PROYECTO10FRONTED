const Header = () => {
  const headerElement = document.createElement('header')
  headerElement.className = 'header-container'

  headerElement.innerHTML = `
    <div class="header-left">
      <h1 class="header-title">EVENTOS</h1>
    </div>
    <img src="/assets/imagenes/foto15.jpg" alt="Logo" class="header-image" />
  `

  return headerElement
}

export default Header
