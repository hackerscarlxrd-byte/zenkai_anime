# Memoria del Proyecto - Anime Web 🚀

## Día 19/06/2026 - Corrección de Bugs Críticos, Páginas Legales Premium y Compilación APK

1. **Corrección de Bug de Doblaje (DUB/LAT) en el Reproductor:**
   - **Problema:** El botón "DUB LAT" aparecía aunque no hubieran servidores de streaming latinos disponibles, redirigiendo engañosamente a la versión subtitulada.
   - **Solución:** Se cambió la validación en `Watch.jsx` para que el botón de doblaje solo se muestre si la API (`episodeData.servers.dub`) devuelve un arreglo de servidores válido y no vacío.

2. **Fixes de Autenticación (Bloqueador de Ventanas y Cierre de Sesión):**
   - **Login con Google:** Se arregló el error de `auth/popup-blocked` de Firebase moviendo el renderizado asíncrono (`setLoading`) después de la llamada a `signInWithPopup`, permitiendo que el navegador reconozca el clic directo del usuario y no bloquee la ventana.
   - **Modal de Logout:** Se reemplazó el componente problemático `sileo` por un `LogoutModal` completamente nativo, limpio y renderizado con animaciones de `framer-motion`, solucionando errores de HTML (`<button> inside <button>`).

3. **Páginas Legales Premium:**
   - Se crearon 5 páginas fundamentales: Términos de Uso, Política de Privacidad, Preguntas Frecuentes, Contacto y DMCA.
   - Diseño premium implementando tarjetas (`Section`), desenfoque (`backdrop-blur`), menú de acordeón interactivo y banners de advertencia usando la identidad visual del sitio.
   - Se redactó una cláusula legal profesional en *Términos de Uso* y *DMCA* aclarando que Zenkai funciona como agregador (API) y no aloja videos.

4. **Compilación de Aplicación Móvil:**
   - Se sincronizó el código web en Capacitor y se compiló exitosamente el archivo `.apk` de la aplicación de Android.
   - El archivo se alojó en la web para permitir su descarga directa.

---

## Día 06/06/2026 (Segunda Parte) - Corrección de Bugs y Ampliación de Cartelera

1. **Corrección de Linting y Errores de Renderizado (@[current_problems]):**
   - Se arreglaron múltiples _warnings_ y errores de ESLint en los componentes de la interfaz de usuario.
   - Se resolvieron problemas de renderizado (pantallazos) causados por accesos incorrectos a `window` o `globalThis` durante el SSR o render inicial en el `useTheme.js`.
   - Se añadió validación `PropTypes` en componentes clave como `Home.jsx`, `Explore.jsx`, y `ProfileStats.jsx`.
   - Se solucionaron errores de interactividad y accesibilidad en componentes como el botón de cierre del filtro y los elementos de navegación.

2. **Ampliación de Cartelera / En Emisión:**
   - Anteriormente la cartelera en la pantalla principal (`Home.jsx`) mostraba muy pocos animes (ej. 4) por limitaciones del proveedor por defecto.
   - Se desarrolló un **interceptor en `anime.service.js`** que consulta la API de Jikan para obtener la cartelera del día completo y la fusiona con los datos nativos, permitiendo mostrar ahora hasta 16 animes próximos a estrenarse/en emisión, mejorando drásticamente el contenido de la portada.

3. **Optimización de Código y Refactorización:**
   - Se simplificó la complejidad anidada y las dependencias innecesarias en `Watch.jsx` y `AnimeDetail.jsx`, limpiando importaciones redundantes y corrigiendo el uso de índices de arreglos como `keys` de React.

---

## Día 06/06/2026 - Paginación, Calendario Potenciado y Verdadera Calificación

1. **Datos de API Inteligentes y Multi-Fuentes:**
   - Se actualizó el backend (`anime.service.js`) para integrar **Jikan API
     (MyAnimeList)**.
   - Ahora, al entrar a la ficha de un anime, se consulta la calificación y
     estado real a nivel mundial en MyAnimeList (eliminando el problema del "4.8
     genérico" y "Finalizado" falso de AnimeFLV).
   - Se habilitó lógica de cruce de datos para contrastar contra _JKAnime_,
     _TioAnime_ y _MonosChinos_ si faltan piezas de información.

2. **Paginación Clásica Estricta:**
   - Se eliminó por completo el _Scroll Infinito_ en las páginas de `Explorar` y
     `Calendario` para evitar bloqueos y saturación en móviles.
   - Se implementó una **paginación clásica por números** y botones de
     navegación inferior, forzando un límite de **20 animes exactos por
     página**.

3. **Calendario Zenkai Potenciado:**
   - Se creó la ruta `/calendario` y se enlazó a la barra de navegación lateral
     e inferior.
   - Para evadir el filtro limitado de AnimeFLV (que daba solo 4 próximos
     estrenos), se creó un **interceptor en el backend** para conectar el estado
     `upcoming` directamente con la cartelera global de Jikan (MyAnimeList).
     Ahora muestra páginas completas de cientos de próximos animes con portada y
     datos correctos, permitiendo entrar a sus detalles nativamente.

4. **Navegación e Interconexión Web App:**
   - **`Home.jsx`**: Se arreglaron todos los botones de "Ver Todo" en la
     pantalla principal para que te envíen a las listas correctas auto-filtradas
     (ej. Historial, Populares, En Emisión, Recientes).
   - **`Watch.jsx`**: Se volvió "clicable" el nombre del anime mientras estás
     viendo un episodio, permitiendo navegar fácilmente de vuelta a su página de
     detalles completa.

5. **Hotfix: Error de Pantallazo Rojo (MyAnimeList URLs):**
   - Se corrigió un error en `anime.service.js` que causaba el "Error de Datos"
     al hacer clic en un próximo estreno. El servidor estaba intentando buscar
     el nombre del anime en lugar del ID numérico en la API de Jikan, resultando
     en un 404. Ahora extrae correctamente el ID numérico (`malId`) usando
     Regex.

---

## Próximos pasos (Pendientes)

1. **Actualización Interna de la APK (Opción 2):**
   - Implementar la lógica para que la aplicación nativa en Android lea un `version.json` alojado en el servidor web de forma periódica.
   - Si se detecta una nueva versión disponible, mostrar una ventana interactiva ("Nueva versión disponible") y, tras la aprobación del usuario, descargar la nueva APK (`.apk`) de forma automática en segundo plano.
   - Lanzar el *Intent* del instalador de Android para aplicar la actualización (Estilo Epic Games).

---

## Tareas Completadas Recientemente

1. **Revisión de Calificaciones (Problema del 4.8 en Tarjetas):**
   - **Solución:** Se implementó lógica en el Frontend para ocultar la estrella y la calificación genérica "4.8" proveniente de AnimeFLV en el explorador, manteniendo un diseño más limpio y sin información engañosa.
   - Adicionalmente, se añadió un retardo artificial de 350ms en el Backend para permitir que las animaciones "Skeleton" brillen, dando una sensación mucho más *premium*.

2. **Gestión de Múltiples Temporadas (Sagas y Secuelas):**
   - **Backend:** Se integró el endpoint `/relations` de Jikan API para cruzar datos y descubrir secuelas, precuelas, historias extras y spin-offs.
   - **Frontend:** Se creó un componente dedicado `RelationCard` en `AnimeDetail.jsx`. Este componente busca de forma silenciosa e inteligente la secuela en nuestro catálogo de proveedores y pinta su portada oficial. Al hacer clic, navega inmediatamente sin pasar por una ventana intermedia.

3. **Corrección de Bugs en Buscador:**
   - Se resolvió un error en `SearchDropdown.jsx` donde al hacer clic en un resultado de la lista desplegable se activaba el formulario principal, enviando al usuario a la vista de búsqueda `/search` en lugar de la ficha individual del anime.

---

## Días Anteriores (Resumen)

1. **Gestión Global del Tema y Colores:**
   - Se implementó un `ThemeProvider` usando React Context
     (`src/hooks/useTheme.js`) para manejar el estado global del tema
     (claro/oscuro) y los colores de acento (purple, red, blue, green).
   - Se resolvió un problema que impedía cambiar correctamente los colores en
     vivo.

2. **Correcciones en `AnimeDetail.jsx`:**
   - Se arregló un error de _crasheo_ del servidor Vite provocado por variables
     duplicadas (`sortedEps`).
   - Se solucionó una advertencia importante de React sobre el orden de
     ejecución de los Hooks en el renderizado.

3. **Mejoras en el Hero Banner (`Home.jsx` y `HeroBanner.jsx`):**
   - Se agregó un filtro de limpieza a las consultas a la API para evitar que se
     muestren "animes fantasma" (elementos sin título, imagen o sinopsis) en el
     carrusel principal de recomendaciones.
   - Se ajustó el gradiente del fondo en el modo claro para que no se vea tan
     oscuro y el texto sea completamente legible y estilizado.

4. **Experiencia de Desarrollo y Red Local:**
   - Se configuró `.vscode/settings.json` para eliminar la molesta advertencia
     del linter sobre `@theme` introducida por Tailwind CSS v4.
   - Se modificó el `package.json` para incluir `--host` por defecto,
     permitiendo así poder visualizar y probar el proyecto desde el teléfono
     móvil conectado a la misma red Wi-Fi.

---

## Próximos pasos para mañana

1. **Gestión de Múltiples Temporadas:**
   - Crear una lógica para agrupar animes que tienen varias temporadas.
   - Agregar botones o un selector en la vista del anime para advertir al
     usuario de temporadas adicionales y permitirle navegar directamente a la
     temporada deseada de manera fluida.

2. **Ajuste en la Velocidad de Carga (Animaciones/Transiciones):**
   - El usuario notó que la carga es "demasiado rápida". Se puede agregar
     animaciones de entrada suaves (fade-ins) o skeleton loaders (esqueletos de
     carga) durante micro-segundos para dar una sensación de app más robusta y
     natural (usando Framer Motion o View Transitions).

3. **Pulido Final del Diseño:**
   - Revisar a detalle el _Light Mode_ para asegurar contrastes perfectos en
     todas las páginas.
   - Revisar la adaptabilidad móvil de los componentes ahora que se puede
     testear directo en el teléfono.

---

_¡Nos vemos mañana para seguir mejorando!_ 💻✨
