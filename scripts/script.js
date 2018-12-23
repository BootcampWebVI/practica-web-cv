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

// Implementación del smooth scroll en caso de que falle la regla CSS
function smoothScroll(e) {
  document.querySelector(this.attributes.href.value).scrollIntoView({
    behavior: 'smooth'
  })
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
  let limit = 150
  let array = event.target.value.split(/[\s]+/)
  if (array[array.length - 1] === "") array.pop()
  let len = array.length
  if (len >= limit) this.value = array.slice(0,150).join(' ')
  if (len >= limit && event.keyCode === 32) {
    if (event.keyCode === 46 || event.keyCode === 8) {} else if (event.keyCode < 48 || event.keyCode > 57) {
      event.preventDefault()
      document.querySelector('div.count').style.color = 'red'
      document.querySelector('div.count').style.fontWeight = 'bold'
    }
  }

  if (len < limit) {
    document.querySelector('div.count').style.color = 'unset'
    document.querySelector('div.count').style.fontWeight = 'unset'
  }

  let counter = document.querySelector('span.count')
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
  otherReferral = document.querySelector('#referral')
  inputPhone = document.querySelector('#phone')
  textMessage = document.querySelector('#message')

  data = {
    name: '',
    email: '',
    selection: '',
    referral: '',
    phone: '',
    message: ''
  }

  e.preventDefault()

  if (validar()) {
    data = {
      name: inputName.value,
      email: inputEmail.value,
      selection: selectList.options[selectList.selectedIndex].value,
      referral: otherReferral.value,
      phone: inputPhone.value,
      message: textMessage.value,
    }
    console.dir(data)
  }

  function validar() {
    return true
  }
}

function showErrorMessage(e) {
  if (this.id === 'name') this.setCustomValidity('El nombre es obligatorio')
  if (this.id === 'email' && this.value === '') {
    this.setCustomValidity('El e-mail es obligatorio')
  } else {
    this.setCustomValidity('Introduce un e-mail válido')
  }
  if (this.id === 'phone') this.setCustomValidity('Introduce un teléfono válido de España ')
  if (this.id === 'message') this.setCustomValidity('El mensaje es obligatorio')
}

function clearErrorMessage(e) {
  this.setCustomValidity('')
}

// Carga de la página
document.addEventListener('DOMContentLoaded', () => {
  this.sections = ['#home', '#who-is', '#studies', '#experience', '#about-me', '#contact']
  this.menuSections = document.querySelectorAll('.nav-section')

  // Preparar la navegación
  setNavigation()
  addEventListener('resize', setNavigation)
  addEventListener('scroll', scrollSpy)

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
  textArea.addEventListener('paste', limitWords)

  const form = document.querySelector('form')
  form.addEventListener('submit', submitForm)

  const validationInputs = document.querySelectorAll('#name, #email, #phone, #message')

  validationInputs.forEach(e => e.addEventListener('invalid', showErrorMessage))
  validationInputs.forEach(e => e.addEventListener('input', clearErrorMessage))
})