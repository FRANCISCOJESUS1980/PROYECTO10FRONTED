import Swal from 'sweetalert2'
import mapImage from '/assets/imagenes/mapa.jpg'
import employee1 from '/assets/imagenes/foto persona1.jpg'
import employee2 from '/assets/imagenes/foto persona2.jpg'
import employee3 from '/assets/imagenes/foto persona3.jpg'
import logoImage from '/assets/imagenes/foto15.jpg'

export function renderContacto() {
  const app = document.getElementById('app')

  const fontAwesomeLink = document.createElement('link')
  fontAwesomeLink.rel = 'stylesheet'
  fontAwesomeLink.href =
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
  document.head.appendChild(fontAwesomeLink)

  app.innerHTML = `
    <div class="contacto-page">
      <header class="contacto-header">
        <div class="contacto-header-content">
          <img src="${logoImage}" alt="Logo de la empresa" class="contacto-logo">
          <div class="contacto-header-text">
            <h1>Contacto</h1>
            <p>Conoce más sobre nuestra empresa y cómo contactarnos</p>
          </div>
        </div>
        <nav class="contacto-header-nav">
          <a href="#contacto-info">Información</a>
          <a href="#contacto-form">Mensaje</a>
          <a href="#contacto-location">Ubicación</a>
          <a href="#contacto-faq">FAQ</a>
        </nav>
      </header>

      <main class="contacto-main">
        <section id="contacto-info" class="contacto-info-section">
          <h2>Información de Contacto</h2>
          <div class="contacto-details">
            <div class="contacto-item">
              <i class="fas fa-phone"></i>
              <p>+34 123 456 789</p>
            </div>
            <div class="contacto-item">
              <i class="fas fa-envelope"></i>
              <p>info@ejemplo.com</p>
            </div>
            <div class="contacto-item">
              <i class="fas fa-map-marker-alt"></i>
              <p>Calle Manuel de Falla, 123, 28001 Madrid</p>
            </div>
          </div>
        </section>

        <section id="contacto-form" class="contacto-form-section">
          <h2>Envíanos un mensaje</h2>
          <form id="contacto-form">
            <div class="contacto-form-group">
              <label for="contacto-name">Nombre:</label>
              <input type="text" id="contacto-name" name="name" required>
            </div>
            <div class="contacto-form-group">
              <label for="contacto-email">Email:</label>
              <input type="email" id="contacto-email" name="email" required>
            </div>
            <div class="contacto-form-group">
              <label for="contacto-message">Mensaje:</label>
              <textarea id="contacto-message" name="message" required></textarea>
            </div>
            <button type="submit" class="contacto-submit-btn">Enviar Mensaje</button>
          </form>
        </section>

        <section id="contacto-location" class="contacto-map-section">
          <h2>Nuestra Ubicación</h2>
          <div class="contacto-map-container">
            <img src="${mapImage}" alt="Mapa de ubicación" class="contacto-map-image">
          </div>
        </section>

        <section id="contacto-faq" class="contacto-faq-section">
          <h2>Preguntas Frecuentes</h2>
          <div class="contacto-faq-list">
            <details>
              <summary>¿Cuáles son sus horarios de atención?</summary>
              <p>Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00 horas.</p>
            </details>
            <details>
              <summary>¿Ofrecen servicios de catering?</summary>
              <p>Sí, ofrecemos servicios de catering para todo tipo de eventos. Contáctanos para más información.</p>
            </details>
            <details>
              <summary>¿Cuál es el proceso de reserva?</summary>
              <p>Para reservar, puedes contactarnos por teléfono o email. Requerimos un depósito del 50% para confirmar la fecha.</p>
            </details>
          </div>
        </section>

        <section class="contacto-team-section">
          <h2>Nuestro Equipo</h2>
          <div class="contacto-team-grid">
            <div class="contacto-team-member">
              <img src="${employee1}" alt="Foto de Juan Pérez" class="contacto-member-image">
              <h3>Juan Pérez</h3>
              <p>Director General</p>
            </div>
            <div class="contacto-team-member">
              <img src="${employee2}" alt="Foto de María García" class="contacto-member-image">
              <h3>María García</h3>
              <p>Gerente de Eventos</p>
            </div>
            <div class="contacto-team-member">
              <img src="${employee3}" alt="Foto de Carla Rodríguez" class="contacto-member-image">
              <h3>Carla Rodríguez</h3>
              <p>Coordinadora de Logística</p>
            </div>
          </div>
        </section>
      </main>

      <footer class="contacto-footer">
        <div class="contacto-social-media">
          <h3>Síguenos</h3>
          <div class="contacto-social-links">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" class="contacto-social-link"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" class="contacto-social-link"><i class="fab fa-twitter"></i></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" class="contacto-social-link"><i class="fab fa-linkedin-in"></i></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" class="contacto-social-link"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <p>&copy; 2023 Tu Empresa de Eventos. Todos los derechos reservados.</p>
      </footer>
    </div>
  `

  const contactForm = document.querySelector('form#contacto-form')
  console.log(contactForm)

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.getElementById('contacto-name').value
    const email = document.getElementById('contacto-email').value
    const message = document.getElementById('contacto-message').value

    console.log('Formulario enviado:', { name, email, message })

    Swal.fire({
      icon: 'success',
      title: '¡Mensaje Enviado!',
      text: 'Gracias por tu mensaje. Te contactaremos pronto.',
      confirmButtonText: 'Aceptar'
    })

    contactForm.reset()
  })
}

document.addEventListener('DOMContentLoaded', renderContacto)
