import React from 'react';
import LegalPage from '../../components/layout/LegalPage';

const Privacy = () => {
  return (
    <LegalPage title="Política de Privacidad">
      <p>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>

      <h2>1. Información que recopilamos</h2>
      <p>
        No recopilamos información personal identificable de los usuarios que simplemente navegan 
        por la plataforma. Solo almacenamos preferencias locales en tu dispositivo (como tu lista 
        de favoritos, historial y temas) utilizando el almacenamiento local (LocalStorage) de tu 
        navegador.
      </p>

      <h2>2. Uso de la Información</h2>
      <p>
        La información de preferencias guardada localmente se utiliza exclusivamente para 
        mejorar tu experiencia en ZENKAI ANIME, como recordar los episodios que ya has visto 
        o la configuración de tu interfaz.
      </p>

      <h2>3. Servicios de Terceros</h2>
      <p>
        Nuestra plataforma indexa y muestra reproductores de video alojados en servicios de terceros. 
        Estos proveedores externos pueden utilizar cookies, balizas web y tecnologías similares 
        para recopilar datos sobre tu comportamiento, incluidos los anuncios que se muestran. 
        No tenemos acceso ni control sobre estas cookies de terceros.
      </p>

      <h2>4. Enlaces a otros sitios</h2>
      <p>
        Nuestro servicio contiene enlaces a otros sitios que no son operados por nosotros. 
        Si haces clic en un enlace de un tercero o en un reproductor de video incrustado, 
        serás dirigido al sitio de ese tercero. Te recomendamos encarecidamente que revises la 
        Política de Privacidad de cada sitio que visites.
      </p>
    </LegalPage>
  );
};

export default Privacy;
