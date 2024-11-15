import { crearModal } from '../Modal/crearModal'
import headerImage from '../../../../public/assets/imagenes/header.jpg'
import event1Image from '../../../../public/assets/imagenes/concierto.jpg'
import event2Image from '../../../../public/assets/imagenes/gastronomia.jpg'
import event3Image from '../../../../public/assets/imagenes/arte.jpg'
import { Loading } from '../../Eventos/LogicaEventos/components/Loading/loading'

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
                <p>Fecha: 15 de Julio, 2023</p>
                <p>Lugar: Estadio Central</p>
                <a href="#" class="event-link">Más información</a>
              </div>
            </div>
            <div class="event-card">
              <img src="${event2Image}" alt="Festival de Gastronomía" class="event-image">
              <div class="event-details">
                <h3>Festival de Gastronomía</h3>
                <p>Fecha: 5-7 de Agosto, 2023</p>
                <p>Lugar: Parque de la Ciudad</p>
                <a href="#" class="event-link">Más información</a>
              </div>
            </div>
            <div class="event-card">
              <img src="${event3Image}" alt="Exposición de Arte" class="event-image">
              <div class="event-details">
                <h3>Exposición de Arte</h3>
                <p>Fecha: 20 de Septiembre, 2023</p>
                <p>Lugar: Galería Nacional</p>
                <a href="#" class="event-link">Más información</a>
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
  `
}

document.addEventListener('DOMContentLoaded', renderHome)
