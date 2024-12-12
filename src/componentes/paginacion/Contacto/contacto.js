import mapImage from '/assets/imagenes/mapa.jpg'
import employee1 from '/assets/imagenes/foto persona1.jpg'
import employee2 from '/assets/imagenes/foto persona2.jpg'
import employee3 from '/assets/imagenes/foto persona3.jpg'
import employee4 from '/assets/imagenes/foto persona4.webp'
import logoImage from '/assets/imagenes/foto15.jpg'
import showAlert from '../../Eventos/LogicaEventos/components/AlertComponent/AlerComponet'

const contactDetails = [
  { icon: 'fas fa-phone', text: '+34 123 456 789' },
  { icon: 'fas fa-envelope', text: 'info@ejemplo.com' },
  {
    icon: 'fas fa-map-marker-alt',
    text: 'Calle Manuel de Falla, 123, 28001 Madrid'
  }
]

const teamMembers = [
  { name: 'Juan Pérez', role: 'Director General', photo: employee1 },
  { name: 'María García', role: 'Gerente de Eventos', photo: employee2 },
  { name: 'Frederic Kanoute', role: 'Tesorería y Contactos', photo: employee4 },
  {
    name: 'Carla Rodríguez',
    role: 'Coordinadora de Logística',
    photo: employee3
  }
]

const faqItems = [
  {
    question: '¿Cuáles son sus horarios de atención?',
    answer:
      'Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00 horas.'
  },
  {
    question: '¿Ofrecen servicios de catering?',
    answer:
      'Sí, ofrecemos servicios de catering para todo tipo de eventos. Contáctanos para más información.'
  },
  {
    question: '¿Cuál es el proceso de reserva?',
    answer:
      'Para reservar, puedes contactarnos por teléfono o email. Requerimos un depósito del 50% para confirmar la fecha.'
  }
]

const socialLinks = [
  { url: 'https://www.facebook.com', icon: 'fab fa-facebook-f' },
  { url: 'https://www.twitter.com', icon: 'fab fa-twitter' },
  { url: 'https://www.linkedin.com', icon: 'fab fa-linkedin-in' },
  { url: 'https://www.instagram.com', icon: 'fab fa-instagram' }
]

const createTeamMember = (member) => `
  <div class="contacto-team-member">
    <img src="${member.photo}" alt="Foto de ${member.name}" class="contacto-member-image">
    <h3>${member.name}</h3>
    <p>${member.role}</p>
  </div>
`

const createContactDetail = (detail) => `
  <div class="contacto-item">
    <i class="${detail.icon}"></i>
    <p>${detail.text}</p>
  </div>
`

const createFAQItem = (faq) => `
  <details>
    <summary>${faq.question}</summary>
    <p>${faq.answer}</p>
  </details>
`

const createSocialLink = (link) => `
  <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="contacto-social-link">
    <i class="${link.icon}"></i>
  </a>
`

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
            ${contactDetails.map(createContactDetail).join('')}
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
            ${faqItems.map(createFAQItem).join('')}
          </div>
        </section>

        <section class="contacto-team-section">
          <h2>Nuestro Equipo</h2>
          <div class="contacto-team-grid">
            ${teamMembers.map(createTeamMember).join('')}
          </div>
        </section>

      </main>

      <footer class="contacto-footer">
        <div class="contacto-social-media">
          <h3>Síguenos</h3>
          <div class="contacto-social-links">
            ${socialLinks.map(createSocialLink).join('')}
          </div>
        </div>
        <p>&copy; 2023 Tu Empresa de Eventos. Todos los derechos reservados.</p>
      </footer>
    </div>
  `

  const contactForm = document.querySelector('form#contacto-form')

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.getElementById('contacto-name').value
    const email = document.getElementById('contacto-email').value
    const message = document.getElementById('contacto-message').value

    showAlert({
      icon: 'success',
      title: '¡Mensaje Enviado!',
      text: 'Gracias por tu mensaje. Te contactaremos pronto.',
      confirmButtonText: 'Aceptar'
    })

    contactForm.reset()
  })
}

document.addEventListener('DOMContentLoaded', renderContacto)
