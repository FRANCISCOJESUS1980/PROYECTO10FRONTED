const Loading = () => {
  const loadingElement = document.createElement('div')
  loadingElement.classList.add('loading')

  const loaderElement = document.createElement('div')
  loaderElement.classList.add('loader')

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div')
    dot.classList.add('dot')
    loaderElement.appendChild(dot)
  }

  loadingElement.appendChild(loaderElement)

  const textElement = document.createElement('div')
  textElement.classList.add('loading-text')
  textElement.textContent = 'Cargando'

  loadingElement.appendChild(textElement)

  return loadingElement
}

export { Loading }
