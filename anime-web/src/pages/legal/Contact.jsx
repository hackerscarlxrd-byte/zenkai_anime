import React from 'react';
import LegalPage from '../../components/layout/LegalPage';

const Contact = () => {
  return (
    <LegalPage title="Contacto">
      <p>
        Si tienes alguna duda, sugerencia, o quieres reportar algún problema con el sitio web 
        o la aplicación móvil, puedes ponerte en contacto con nosotros.
      </p>

      <h2>Redes Sociales y Comunidad</h2>
      <p>
        La mejor manera de interactuar con el equipo de ZENKAI ANIME y con otros miembros de la 
        comunidad es a través de nuestras redes sociales oficiales y servidores comunitarios.
      </p>
      <ul>
        <li><strong>Discord:</strong> Únete a nuestro servidor de Discord para chatear en vivo.</li>
        <li><strong>Twitter/X:</strong> Síguenos para enterarte de las últimas novedades.</li>
      </ul>

      <h2>Consultas Profesionales</h2>
      <p>
        Para asuntos relacionados con alianzas, cooperación o temas legales, por favor 
        envía un correo a nuestro equipo administrativo. (Nota: ZENKAI ANIME no aloja contenido 
        protegido por derechos de autor, por favor lee nuestra sección DMCA antes de contactarnos 
        sobre este tema).
      </p>
    </LegalPage>
  );
};

export default Contact;
