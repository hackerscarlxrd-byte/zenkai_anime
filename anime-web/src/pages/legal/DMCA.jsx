import React from 'react';
import LegalPage from '../../components/layout/LegalPage';

const DMCA = () => {
  return (
    <LegalPage title="DMCA (Derechos de Autor)">
      <p>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>

      <h2>Aviso de Copyright</h2>
      <p>
        <strong>ZENKAI ANIME NO ALOJA NINGÚN TIPO DE ARCHIVO MULTIMEDIA.</strong><br/>
        ZENKAI ANIME funciona exclusivamente como un motor de búsqueda y agregador 
        de enlaces (similar a Google). La plataforma automatiza la indexación de enlaces que ya 
        se encuentran disponibles públicamente en Internet. 
      </p>

      <h2>Contenido de Terceros</h2>
      <p>
        Todos los videos, imágenes, marcas registradas y otros medios que se pueden encontrar 
        a través de nuestro buscador o reproductores incrustados son propiedad de sus respectivos 
        dueños y autores. ZENKAI ANIME no tiene control ni responsabilidad sobre el contenido 
        que se encuentra en los servidores de terceros (como Fembed, Mega, Uqload, entre otros).
      </p>

      <h2>Reclamaciones de Derechos de Autor</h2>
      <p>
        ZENKAI ANIME respeta los derechos de propiedad intelectual de terceros. Dado que no 
        alojamos el contenido, no podemos eliminar videos específicos de Internet. Si consideras 
        que un enlace proporcionado a través de nuestra plataforma infringe tus derechos de autor, 
        te sugerimos enfáticamente <strong>contactar directamente al servicio de alojamiento o 
        servidor de terceros</strong> donde se encuentra físicamente el archivo.
      </p>
      <p>
        Al eliminar el archivo del servidor de origen, nuestro sistema automatizado dejará de 
        encontrar y mostrar dicho enlace automáticamente, ya que la plataforma solo refleja 
        lo que está disponible actualmente en la red.
      </p>
    </LegalPage>
  );
};

export default DMCA;
