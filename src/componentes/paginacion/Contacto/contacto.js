import { crearModal } from '../Modal/crearModal'
import mapImage from '../../../../public/assets/imagenes/mapa.jpg'
import employee1 from '../../../../public/assets/imagenes/foto persona1.jpg'
import employee2 from '../../../../public/assets/imagenes/foto persona2.jpg'
import employee3 from '../../../../public/assets/imagenes/foto persona3.jpg'
import { Loading } from '../../Eventos/LogicaEventos/components/Loading/loading'

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
              <p>Calle Manuel de Falla, 123, 28001 Madrid</p>
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
              <img src="${employee3}" alt="Foto de Carla Rodríguez" class="member-image">
              <h3>Carla Rodríguez</h3>
              <p>Coordinadora de Logística</p>
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
  Loading()
}

document.addEventListener('DOMContentLoaded', renderContacto)
