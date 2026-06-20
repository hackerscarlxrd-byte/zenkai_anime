import React from 'react';
import LegalPage from '../../components/layout/LegalPage';

const Terms = () => {
  return (
    <LegalPage title="Términos de Uso">
      <p>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>

      <h2>1. Aceptación de los Términos</h2>
      <p>
        Al acceder y utilizar ZENKAI ANIME, aceptas estar sujeto a estos Términos de Uso. 
        Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestra plataforma.
      </p>

      <h2>2. Naturaleza del Servicio y Contenido de Terceros</h2>
      <p>
        <strong>ZENKAI ANIME actúa como un motor de búsqueda y agregador de enlaces (API).</strong> 
        Nosotros no alojamos, subimos ni controlamos ningún archivo multimedia (como videos, imágenes 
        o episodios de anime) en nuestros propios servidores. Todo el contenido multimedia al que 
        se accede a través de la plataforma proviene directamente de servicios de terceros y servidores externos.
      </p>
      <p>
        Dado que consumimos una API de terceros para recopilar y organizar estos enlaces, 
        <strong>el sitio web puede contener enlaces o dirigir a páginas de terceros.</strong> ZENKAI ANIME 
        no tiene control sobre el contenido, las políticas de privacidad, la publicidad o las 
        prácticas de los sitios web o servicios de terceros, y por ende, <strong>no asume ninguna 
        responsabilidad</strong> ni puede garantizar la evitación total de elementos externos (como ventanas 
        emergentes o publicidad) que puedan estar incrustados en los reproductores de terceros.
      </p>

      <h2>3. Uso de la Plataforma</h2>
      <p>
        El usuario se compromete a usar la plataforma únicamente con fines de entretenimiento 
        personal y no comercial. Está prohibido el uso de la plataforma para fines ilegales o 
        no autorizados.
      </p>

      <h2>4. Limitación de Responsabilidad</h2>
      <p>
        En la máxima medida permitida por la ley aplicable, ZENKAI ANIME no será responsable de 
        ningún daño indirecto, incidental, especial, consecuente o punitivo, o cualquier pérdida 
        de beneficios o ingresos, ya sea incurrida directa o indirectamente, o cualquier pérdida 
        de datos, uso, buena voluntad, u otras pérdidas intangibles, resultantes de (a) tu 
        acceso o uso de o incapacidad para acceder o utilizar el servicio; (b) cualquier conducta 
        o contenido de terceros en el servicio.
      </p>

      <h2>5. Cambios a estos Términos</h2>
      <p>
        Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios 
        entrarán en vigor inmediatamente después de su publicación en el sitio. Es tu responsabilidad 
        revisar estos términos periódicamente.
      </p>
    </LegalPage>
  );
};

export default Terms;
