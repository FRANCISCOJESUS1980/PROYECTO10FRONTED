/*export function renderContacto() {
  const app = document.getElementById('app')
  app.innerHTML = `
    <h1>Contacto</h1>
    <p>Aquí puedes encontrar la información de contacto.</p>
  `
}
import { crearModal } from './Modal/crearModal'
import './contacto.css'
crearModal()
function createContactPage() {
  const container = document.createElement('div')
  container.className = 'contacto-container'

  const infoSection = document.createElement('div')
  infoSection.className = 'info-section'
  infoSection.innerHTML = `
    <h2>Información de Contacto</h2>
    <div class="contact-details">
      <p><i class="fas fa-phone"></i> +34 123 456 789</p>
      <p><i class="fas fa-envelope"></i> info@ejemplo.com</p>
      <p><i class="fas fa-map-marker-alt"></i> Calle Ejemplo, 123, 28001 Madrid</p>
    </div>
    <div class="social-media">
      <h3>Síguenos</h3>
      <div class="social-links">
        <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
        <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
        <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
      </div>
    </div>
  `

  const formSection = document.createElement('div')
  formSection.className = 'form-section'
  formSection.innerHTML = `
    <h1>Contáctanos</h1>
    <form id="contact-form">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="message">Mensaje</label>
        <textarea id="message" name="message" required></textarea>
      </div>
      <button type="submit">
        <i class="fas fa-paper-plane"></i> Enviar Mensaje
      </button>
    </form>
  `

  container.appendChild(infoSection)
  container.appendChild(formSection)

  return container
}

function setupFormListener() {
  const form = document.getElementById('contact-form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    console.log('Formulario enviado:', data)
    form.reset()
  })
}

export function renderContacto() {
  const app = document.getElementById('app')
  app.innerHTML = ''
  app.appendChild(createContactPage())
  setupFormListener()
}

// Llamar a la función cuando se cargue la página
document.addEventListener('DOMContentLoaded', renderContacto)*/

import { crearModal } from '../Modal/crearModal'

import mapImage from '../../../../public/assets/imagenes/header.jpg'
import employee1 from '../../../../public/assets/imagenes/header.jpg'
import employee2 from '../../../../public/assets/imagenes/header.jpg'
import employee3 from '../../../../public/assets/imagenes/header.jpg'

export function renderContacto() {
  crearModal()

  const app = document.getElementById('app')
  app.innerHTML = `
    <div class="contacto-container">
      <header class="contacto-header">
        <h1>Contacto</h1>
        <p>Conoce más sobre nuestra empresa y cómo contactarnos</p>
      </header>

      <main class="contacto-main">
        <section class="info-section">
          <h2>Información de Contacto</h2>
          <div class="contact-details">
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <p>+34 123 456 789</p>
            </div>
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <p>info@ejemplo.com</p>
            </div>
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <p>Calle Ejemplo, 123, 28001 Madrid</p>
            </div>
          </div>
        </section>

        <section class="map-section">
          <h2>Nuestra Ubicación</h2>
          <div class="map-container">
            <img src="${mapImage}" alt="Mapa de ubicación" class="map-image">
          </div>
        </section>

        <section class="team-section">
          <h2>Nuestro Equipo</h2>
          <div class="team-grid">
            <div class="team-member">
              <img src="${employee1}" alt="Foto de Juan Pérez" class="member-image">
              <h3>Juan Pérez</h3>
              <p>Director General</p>
            </div>
            <div class="team-member">
              <img src="${employee2}" alt="Foto de María García" class="member-image">
              <h3>María García</h3>
              <p>Gerente de Eventos</p>
            </div>
            <div class="team-member">
              <img src="${employee3}" alt="Foto de Carlos Rodríguez" class="member-image">
              <h3>Carlos Rodríguez</h3>
              <p>Coordinador de Logística</p>
            </div>
          </div>
        </section>
      </main>

      <footer class="contacto-footer">
        <div class="social-media">
          <h3>Síguenos</h3>
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <p>&copy; 2023 Tu Empresa de Eventos. Todos los derechos reservados.</p>
      </footer>
    </div>
  `
}

// Llamar a la función cuando se cargue la página
document.addEventListener('DOMContentLoaded', renderContacto)
