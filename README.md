# Práctica: Creación de página web para currículum (CV)

Trabajo en curso de creación de pagina web personal con HTML, CSS, y JavaScript.

NOTA: He implementado el smooth scroll mediante la propiedad nativa correspondiente de CSS, válida para Chrome y Firefox, por ser lo más sencillo y conciso y no requerirse compatibilidad con Edge.
```css
html {
  scroll-behavior: smooth
}
```
Pero para trabajar JavaScript, he probado ha implementar también la solución por esta vía. Como CSS parece la solución moderna más sencilla, concisa y recomendable, he dejado el código JS mostrado más abajo deshabilitado con comentarios en `script.js`.

Lo resumo a continuación:
```javascript
function smoothScroll(e) {
  e.preventDefault()
  document.querySelector(this.attributes.href.value).scrollIntoView({
    behavior: 'smooth'
  })
}

const anchors = document.querySelectorAll('.sidenav li.nav-section a')
anchors.forEach(a => a.addEventListener('click', smoothScroll))
```