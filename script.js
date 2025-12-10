document.addEventListener('DOMContentLoaded', () => {

    const textElement = document.getElementById('parallax-text');
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;
        if(textElement) {
            textElement.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            textElement.style.opacity = 1 - (scrollPosition / 700);
        }
    });

    const navLinks = document.querySelectorAll('.bubble-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});