import { crearModal } from '../Modal/crearModal'
import headerImage from '../../../../public/assets/imagenes/portada.avif'
import { Loading } from '../../Eventos/LogicaEventos/components/Loading/loading'
import { navigateTo } from '../router'

import event1Image from '../../../../public/assets/imagenes/concierto.jpg'
import event2Image from '../../../../public/assets/imagenes/gastronomia.jpg'
import event3Image from '../../../../public/assets/imagenes/arte.jpg'

const eventsData = [
  {
    title: 'Concierto de Rock',
    date: '15 de Julio, 2025',
    location: 'Estadio Central',
    image: event1Image
  },
  {
    title: 'Festival de Gastronomía',
    date: '5-7 de Agosto, 2025',
    location: 'Parque de la Ciudad',
    image: event2Image
  },
  {
    title: 'Exposición de Arte',
    date: '20 de Septiembre, 2025',
    location: 'Galería Nacional',
    image: event3Image
  }
]

const testimonialsData = [
  {
    quote:
      'Una experiencia increíble. El equipo de Eventos Espectaculares superó todas nuestras expectativas.',
    author: 'María Rodríguez'
  },
  {
    quote:
      'Profesionales, creativos y atentos a cada detalle. Nuestro evento fue un éxito rotundo.',
    author: 'Juan Pérez'
  },
  {
    quote:
      'La mejor decisión que tomamos fue contratar a Eventos Espectaculares. ¡Altamente recomendados!',
    author: 'Ana García'
  }
]

const createEventCard = (event) => `
  <div class="event-card">
    <img src="${event.image}" alt="${event.title}" class="event-image">
    <div class="event-details">
      <h3>${event.title}</h3>
      <p>Fecha: ${event.date}</p>
      <p>Lugar: ${event.location}</p>
      <a href="/eventos" class="event-link">Ver todos los Eventos</a>
    </div>
  </div>
`

const createTestimonialCard = (testimonial) => `
  <div class="testimonial-card">
    <p>"${testimonial.quote}"</p>
    <p class="testimonial-author">- ${testimonial.author}</p>
  </div>
`

const createSection = (title, content) => `
  <section class="custom-section">
    <h2>${title}</h2>
    <div class="custom-content">
      ${content}
    </div>
  </section>
`

export function renderHome() {
  Loading()
  crearModal()

  const app = document.getElementById('app')

  app.innerHTML = `
    <div class="home-container">
      <header class="home-header" style="background-image: url(${headerImage});">
        <div class="header-content">
          <h1>Eventos Espectaculares</h1>
          <p>Creando experiencias inolvidables</p>
          <a href="#eventos" class="cta-button">Descubre nuestros eventos</a>
        </div>
      </header>

      <main class="home-main">
        ${createSection(
          'Cómo Crear Eventos',
          `
          <p>Para crear eventos, tienes que registrarte o loguearte y una vez hecho pulsar el botón de crear eventos y rellenar los campos obligatorios. Para confirmar o cancelar asistencia solo tienes que pulsar el evento y seleccionar la opción deseada. Si has creado el evento, también podrás modificarlo o eliminarlo.</p>
        `
        )}

        ${createSection(
          'Sobre Nosotros',
          `
          <p>Somos líderes en la organización de eventos únicos y memorables. Con años de experiencia, nos dedicamos a crear experiencias que superan las expectativas de nuestros clientes.</p>
        `
        )}

        <section id="eventos" class="events-section">
          <h2>Próximos Eventos</h2>
          <div class="event-grid">
            ${eventsData.map(createEventCard).join('')}
          </div>
        </section>

        ${createSection(
          'Lo que dicen nuestros clientes',
          `
          <div class="testimonial-grid">
            ${testimonialsData.map(createTestimonialCard).join('')}
          </div>
        `
        )}
      </main>
    </div>
  `

  const eventLinks = document.querySelectorAll('.event-link')
  eventLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      navigateTo('/eventos')
    })
  })
}

document.addEventListener('DOMContentLoaded', renderHome)
