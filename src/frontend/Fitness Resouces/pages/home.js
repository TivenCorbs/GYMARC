document.addEventListener('DOMContentLoaded',()=>{
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if(href === currentPage){
            link.classList.add('active');
        }
    })
});

const username = localStorage.getItem('username');
const welcomeMessage = document.querySelector('.best-gym-app-for-betterment');
if(username){
    welcomeMessage.textContent = `Welcome back, ${username}!`;
};