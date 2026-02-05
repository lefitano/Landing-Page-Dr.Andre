const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu ul');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});


//funcionalidade para mobile