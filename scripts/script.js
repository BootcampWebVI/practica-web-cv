function toggleMenu() {

}

function toggleField() {
  if (document.querySelector('#other').checked) {
    document.querySelector('.referral').classList.remove('hidden')
  } else {
    document.querySelector('.referral').classList.add('hidden')
  }
  
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Document loaded!')

  const icon = document.querySelector('.mobile')
  icon.addEventListener('click', toggleMenu)

  const option = document.querySelectorAll('.radio input')
  option.forEach(i => i.addEventListener('click', toggleField))
})

    
