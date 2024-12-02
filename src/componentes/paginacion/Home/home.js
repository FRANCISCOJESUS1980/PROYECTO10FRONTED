import { crearModal } from '../Modal/crearModal'
import headerImage from '../../../../public/assets/imagenes/portada.avif'
import event1Image from '../../../../public/assets/imagenes/concierto.jpg'
import event2Image from '../../../../public/assets/imagenes/gastronomia.jpg'
import event3Image from '../../../../public/assets/imagenes/arte.jpg'
import { Loading } from '../../Eventos/LogicaEventos/components/Loading/loading'
import { navigateTo } from '../router'

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
        <section class="explicacion-pagina">
          <h2>Como Crear Eventos</h2>
          <p>Para crear eventos, tienes que registrarte o loguearte y una vez hecho pulsar el boton de crear eventos y rellenar los campos obligatorios, para confirmar asistencia o cancelar asistencia solo tienes que pulsar en el evento pulsar el boton o bien para confirmar asistencia o bien para cancelar, si has creado el eventos tambien podras modificarlo o eliminarlo</p>
        </section>
        <section class="about-section">
          <h2>Sobre Nosotros</h2>
          <p>Somos líderes en la organización de eventos únicos y memorables. Con años de experiencia, nos dedicamos a crear experiencias que superan las expectativas de nuestros clientes.</p>
        </section>

        <section id="eventos" class="events-section">
          <h2>Próximos Eventos</h2>
          <div class="event-grid">
            <div class="event-card">
              <img src="${event1Image}" alt="Concierto de Rock" class="event-image">
              <div class="event-details">
                <h3>Concierto de Rock</h3>
                <p>Fecha: 15 de Julio, 2025</p>
                <p>Lugar: Estadio Central</p>
                <a href="/eventos" class="event-link">Ver todos los Eventos</a>
              </div>
            </div>
            <div class="event-card">
              <img src="${event2Image}" alt="Festival de Gastronomía" class="event-image">
              <div class="event-details">
                <h3>Festival de Gastronomía</h3>
                <p>Fecha: 5-7 de Agosto, 2025</p>
                <p>Lugar: Parque de la Ciudad</p>
                <a href="/eventos" class="event-link">Ver todos los Eventos</a>
              </div>
            </div>
            <div class="event-card">
              <img src="${event3Image}" alt="Exposición de Arte" class="event-image">
              <div class="event-details">
                <h3>Exposición de Arte</h3>
                <p>Fecha: 20 de Septiembre, 2025</p>
                <p>Lugar: Galería Nacional</p>
                <a href="/eventos" class="event-link">Ver todos los Eventos</a>
              </div>
            </div>
          </div>
        </section>

        <section class="testimonials-section">
          <h2>Lo que dicen nuestros clientes</h2>
          <div class="testimonial-grid">
            <div class="testimonial-card">
              <p>"Una experiencia increíble. El equipo de Eventos Espectaculares superó todas nuestras expectativas."</p>
              <p class="testimonial-author">- María Rodríguez</p>
            </div>
            <div class="testimonial-card">
              <p>"Profesionales, creativos y atentos a cada detalle. Nuestro evento fue un éxito rotundo."</p>
              <p class="testimonial-author">- Juan Pérez</p>
            </div>
            <div class="testimonial-card">
              <p>"La mejor decisión que tomamos fue contratar a Eventos Espectaculares. ¡Altamente recomendados!"</p>
              <p class="testimonial-author">- Ana García</p>
            </div>
          </div>
        </section>
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
