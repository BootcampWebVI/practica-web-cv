//jshint esversion:6
//jshint asi: true

function setNavigation() {
  this.offsets = []
  this.sections.forEach(section => this.offsets.push(getOffset(document.querySelector(section))))
}

function scrollSpy() {
  let currentOffsets = [...this.offsets, this.pageYOffset]
  let activeSection = currentOffsets.sort((a, b) => a - b).lastIndexOf(this.pageYOffset) - 1
  document.querySelector('.active').classList.remove('active')
  this.menuSections[activeSection].classList.add('active')
}

function getOffset(element) {
  var offset = 0
  do {
    offset += element.offsetTop
    element = element.parentOffset
  } while (element)
  return offset
}

function smoothScroll(e) {
  // e.preventDefault()
  document.querySelector(e.target.attributes.href.value).scrollIntoView({
    behavior: 'smooth'
  })
  console.log("​smoothScroll -> e.target.attributes.href.value", e.target.attributes.href.value)
}

function toggleMenu() {
  if (window.innerWidth > 720) return
  document.querySelectorAll('.sidenav li').forEach(e => e.classList.toggle('mobile-hidden'))
}

function toggleField() {
  if (document.querySelector('#other').selected) {
    document.querySelector('.referral').classList.remove('hidden')
  } else {
    document.querySelector('.referral').classList.add('hidden')
  }
}

function limitWords() {
  let array = event.target.value.split(/[\s]+/)
  if (array[array.length - 1] === "") array.pop()
  let len = array.length
  if (len >= 150 && event.keyCode === 32) {
    if (event.keyCode === 46 || event.keyCode === 8) {} else if (event.keyCode < 48 || event.keyCode > 57) {
      event.preventDefault()
    }
  }
  let counter = document.querySelector('.count')
  if (counter.value === "") {
    counter.innerHTML = "0"
  } else {
    counter.innerHTML = len
  }
}

function submitForm(e) {
  console.log("​submitForm -> 'SENT!'", 'SENT!')

  formContact = document.querySelector('#contact-form')
  inputName = document.querySelector('#name')
  inputEmail = document.querySelector('#email')
  selectList = document.querySelector('#selection')
  inputPhone = document.querySelector('#phone')
  textMessage = document.querySelector('#message')

  data = {
    name: '',
    email: '',
    seleccion: '',
    phone: '',
    message: ''
  }

  e.preventDefault()

  if (validar()) {
    data = {
      name: inputName.value,
      email: inputEmail.value,
      seleccion: selectList.options[selectList.selectedIndex].value,
      phone: inputPhone.value,
      message: textMessage.value,
    }
    console.dir(data)
  }

  function validar() {
    return true
  }
}

// Carga de la página
document.addEventListener('DOMContentLoaded', () => {
  this.sections = ['#home', '#who-is', '#studies', '#experience', '#about-me', '#contact']
  this.menuSections = document.querySelectorAll('.nav-section')

  // Preparar la navegación
  setNavigation()
  addEventListener('resize', setNavigation)
  addEventListener('scroll', scrollSpy)

  // Establacer mensajes personalizados de validación del formulario
  // document.querySelector('#name').setCustomValidity('El nombre es obligatorio')
  // document.querySelector('#name').setCustomValidity('El email es obligatorio')
  // document.querySelector('#name').setCustomValidity('El mensaje es obligatorio')

  // Añadir los listeners
  const anchors = document.querySelectorAll('.sidenav li.nav-section a')
  anchors.forEach(a => a.addEventListener('click', smoothScroll))

  const sideNav = document.querySelector('.sidenav ul')
  sideNav.addEventListener('click', toggleMenu)

  const select = document.querySelector('select')
  select.addEventListener('change', toggleField)

  const textArea = document.querySelector('textarea')
  textArea.addEventListener('keydown', limitWords)
  textArea.addEventListener('keyup', limitWords)

  const form = document.querySelector('form')
  form.addEventListener('submit', submitForm)
})