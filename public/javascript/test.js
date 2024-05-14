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