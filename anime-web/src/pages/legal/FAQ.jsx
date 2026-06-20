import React from 'react';
import LegalPage from '../../components/layout/LegalPage';

const FAQ = () => {
  return (
    <LegalPage title="Preguntas Frecuentes">
      <h2>¿ZENKAI ANIME es completamente gratis?</h2>
      <p>
        Sí, ZENKAI ANIME es una plataforma completamente gratuita. No hay suscripciones, 
        cuentas de pago ni costos ocultos.
      </p>

      <h2>¿Por qué veo publicidad en los videos?</h2>
      <p>
        Los reproductores de video provienen de servidores de terceros (como Fembed, Mega, etc.). 
        ZENKAI ANIME no aloja videos ni inserta publicidad, pero los servidores externos que alojan 
        el contenido sí pueden hacerlo para mantener sus servidores. Recomendamos el uso de un 
        bloqueador de anuncios (AdBlock) para una mejor experiencia.
      </p>

      <h2>¿Tienen una aplicación móvil?</h2>
      <p>
        Sí. Ofrecemos una Progressive Web App (PWA) que puedes instalar directamente desde tu 
        navegador en Android o iOS para una experiencia más inmersiva, así como una APK nativa 
        para usuarios de Android disponible en nuestra sección de descargas.
      </p>

      <h2>El reproductor no funciona, ¿qué hago?</h2>
      <p>
        Si el reproductor principal falla o no carga el video, intenta cambiar a uno de los 
        otros servidores disponibles que se muestran en la sección de "Servidores". A veces los 
        servidores externos pueden caerse o saturarse temporalmente.
      </p>

      <h2>¿Dónde se guarda mi historial de animes vistos?</h2>
      <p>
        Tanto tu historial como tu lista de favoritos se guardan localmente en tu dispositivo 
        (en la memoria del navegador). Si borras los datos de navegación o usas el modo incógnito, 
        perderás esta información.
      </p>
    </LegalPage>
  );
};

export default FAQ;
