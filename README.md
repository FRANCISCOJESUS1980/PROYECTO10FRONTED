# Gestión de Eventos Frontend

Este proyecto es una aplicación frontend para la gestión de eventos. Permite a los usuarios ver, crear, actualizar y eliminar eventos, así como confirmar o cancelar su asistencia.

## Tabla de Contenidos

- [Características]
- [Tecnologías Utilizadas]
- [Comenzando]
  - [Prerrequisitos]
  - [Instalación]
- [Uso]
- [Estructura del Proyecto]
- [Componentes Principales]
- [Estilos]
- [Manejo de Imágenes]
- [Autenticación]
- [Alertas y Modales]
- [Scripts Disponibles]
- [Dependencias]
- [Contribuir]
- [Licencia]

## Características

- Visualización de eventos con detalles como título, descripción, fecha, ubicación y número de asistentes
- Expansión y colapso de tarjetas de eventos para más información
- Autenticación de usuarios
- Creación, actualización y eliminación de eventos por parte de los creadores
- Confirmación y cancelación de asistencia a eventos por parte de los usuarios
- Diseño responsivo para varios tamaños de pantalla
- Carga y visualización de imágenes para cada evento
- Alertas interactivas para acciones del usuario

## Tecnologías Utilizadas

- [Vite.js](https://vitejs.dev/) - Herramienta de compilación que proporciona una experiencia de desarrollo más rápida
- JavaScript (ES6+)
- [Cloudinary](https://cloudinary.com/) - Servicio de gestión de imágenes en la nube
- [SweetAlert2](https://sweetalert2.github.io/) - Librería para crear alertas y modales atractivos

## Comenzando

### Prerrequisitos

- Node.js (v14 o posterior recomendado)
- npm (viene incluido con Node.js)

### Instalación

1. Clona el repositorio:https://github.com/FRANCISCOJESUS1980/PROYECTO10FRONTED

2. Navega al directorio del proyecto

3. Instala las dependencias

## Componentes Principales

### EventCard

El componente `EventCard` es responsable de mostrar la información de cada evento. Características principales:

- Muestra imagen, título, descripción, fecha, ubicación y número de asistentes del evento
- Permite expandir/colapsar para mostrar más detalles
- Maneja diferentes acciones basadas en el rol del usuario (creador, asistente, no asistente)
- Integra funcionalidades para confirmar asistencia, salir del evento, modificar y eliminar eventos

## Estilos

Los estilos se manejan utilizando CSS. El archivo principal de estilos se encuentra en `src/style.css`.

## Manejo de Imágenes

Las imágenes de los eventos se gestionan utilizando Cloudinary. Esto permite una carga y visualización eficiente de las imágenes en la aplicación.

## Autenticación

La aplicación incluye un sistema de autenticación de usuarios. Los tokens JWT se utilizan para manejar las sesiones de usuario y determinar los permisos para diferentes acciones.

## Alertas y Modales

Se utiliza SweetAlert2 para mostrar alertas interactivas y modales al usuario, mejorando la experiencia de usuario en acciones como confirmación de asistencia, eliminación de eventos, etc.

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run preview`: Previsualiza la versión de producción localmente.

## Dependencias

- `vite`: ^5.4.10
- `cloudinary`: ^1.41.3
- `multer`: ^1.4.5-lts.1
- `multer-storage-cloudinary`: ^4.0.0
- `sweetalert2`: ^11.14.5

## Contribuir

Las contribuciones son bienvenidas. Por favor, sigue estos pasos para contribuir:

1. Haz un Fork del proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
