document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.see-more-btn').forEach(function(button) {
        let postContent = button.parentElement.querySelector('.post-title');
      
        if (postContent.scrollWidth > postContent.clientWidth) {
            button.style.display = 'block';
        } 
        else {
            button.style.display = 'none';
        }
      
        button.addEventListener('click', function() {
            let clickedPostContent = this.parentElement.querySelector('.post-title');
            clickedPostContent.classList.toggle('expanded');

            if (clickedPostContent.classList.contains('expanded')) {
                button.textContent = 'See less';
            } 
            else {
                button.textContent = 'See more';
            }
        });
    });
});

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
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

let commentBtn = document.querySelector('#comment-btn');

commentBtn.addEventListener('click', submitComment);
document.querySelector('.comment-input').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    submitComment();
  }
});

function submitComment() {
  let commentInput = document.querySelector('.comment-input');
  
  if (commentInput.value.trim() !== '') {
    let comment = document.createElement('div');
    let img = document.createElement('img');
    let content = document.createElement('div');
    let username = document.createElement('div');
    let text = document.createElement('div');

    comment.classList.add('cmt-section');
    content.classList.add('content');
    username.classList.add('username');
    img.src = 'images/dogcol1.jpg';
    img.alt = 'dog';
    username.textContent = 'Username';
    text.textContent = commentInput.value.trim();

    content.appendChild(username);
    content.appendChild(text);

    comment.appendChild(img);
    comment.appendChild(content);

    let modalFooter = document.querySelector('.modal-footer');
    modalFooter.insertBefore(comment, document.querySelector('.modal-cmt'));

    commentInput.value = '';
  } 
  else {
    alert('Please enter a valid comment.');
  }
}