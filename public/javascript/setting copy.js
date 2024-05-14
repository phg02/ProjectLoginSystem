const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const cancelButton = document.querySelectorAll('.cancelBtn')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

cancelButton.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal')
      closeModal(modal)
    })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
  document.body.classList.add('modal-open');
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
  document.body.classList.remove('modal-open');
}

window.addEventListener('DOMContentLoaded', (event) => {
  // Get the checkbox element 		
  let checkbox = document.querySelector(".switch input[type='checkbox']")
  
  // Get the body tag	
  let body = document.querySelector("body")
  
  // This event handler listens for the checkbox to be checked or unchecked
  // Then, if the checkbox is checked (event.target.checked == true)
  // Then apply `data-theme="dark"` to the body tag
  // Otherwise, remove the attribute
  checkbox.addEventListener('change', (event) => {
          
    event.target.checked ? body.setAttribute('data-theme', "dark") : body.removeAttribute("data-theme")

  });

});