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

function toggleMenu() {
  if (window.innerWidth > 720) return
  console.log('clicked')
  document.querySelectorAll('.sidenav li').forEach( e => e.classList.toggle('mobile-hidden'))
}

function toggleField() {
  if (document.querySelector('#other').checked) {
    document.querySelector('.referral').classList.remove('hidden')
  } else {
    document.querySelector('.referral').classList.add('hidden')
  }
}

function limitWords() {
  let array = event.target.value.split(/[\s]+/)
  if (array[array.length - 1] === "") array.pop()
  let len = array.length
  console.log("​len", len)
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

// Carga de la página
document.addEventListener('DOMContentLoaded', () => {
  this.sections = ['#home', '#who-is', '#studies', '#experience', '#about-me', '#contact']
  this.menuSections = document.querySelectorAll('.nav-section')
  
  setNavigation()
  addEventListener('resize', setNavigation)
  addEventListener('scroll', scrollSpy)

  const sideNav = document.querySelector('.sidenav ul')
  sideNav.addEventListener('click', toggleMenu)

  const option = document.querySelectorAll('.radio input')
  option.forEach(i => i.addEventListener('click', toggleField))

  const textArea = document.querySelector('textarea')
  textArea.addEventListener('keydown', limitWords)
  textArea.addEventListener('keyup', limitWords)
})