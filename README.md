# RDS Spelling Bee

RDS Spelling Bee es una aplicación web diseñada como una plataforma de gestión para los concursos de Spelling Bee organizados por la Escuela Rafael Díaz Serdán. La aplicación permite a los administradores gestionar participantes, palabras y resultados, mientras que los usuarios pueden practicar y participar en los concursos de manera interactiva.

## Características principales

- **Gestión de concursos**: Administración de participantes, palabras y resultados.
- **Práctica interactiva**: Los usuarios pueden practicar palabras con retroalimentación en tiempo real.
- **Integración de voz**: Uso de `speechSynthesis` para pronunciar palabras durante las prácticas y concursos.
- **Autenticación segura**: Implementada con Firebase Authentication.
- **Almacenamiento en la nube**: Uso de Firebase Firestore para la base de datos.
- **Estado global**: Gestión del estado de la aplicación con NgRx.

## Tecnologías utilizadas

- **Angular 17**: Framework principal para el desarrollo de la aplicación.
- **Firebase**: Servicios de autenticación, base de datos y hosting.
  - Firebase Authentication
  - Firebase Firestore
- **NgRx**: Gestión del estado global de la aplicación.
- **speechSynthesis**: API para la síntesis de voz en el navegador.

## Demo

Puedes ver una implementación demo de la aplicación en el siguiente enlace:

[https://rds-spelling-bee.web.app](https://rds-spelling-bee.web.app)

## Instalación y configuración

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/rds-spelling-bee.git
   cd rds-spelling-bee
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura Firebase:
   - Crea un proyecto en Firebase.
   - Configura Firebase Authentication y Firestore.
   - Descarga el archivo `firebaseConfig` y colócalo en el proyecto.

4. Inicia el servidor de desarrollo:
   ```bash
   ng serve
   ```

5. Accede a la aplicación en `http://localhost:4200`.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

---
Desarrollado con ❤️ por la Escuela Rafael Díaz Serdán.
