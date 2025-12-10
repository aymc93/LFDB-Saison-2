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



    // 3. ANIMATION D'APPARITION DES CARTES (Scroll Reveal)
    const observerOptions = {
        threshold: 0.1 // L'animation se lance quand 10% de l'élément est visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // On arrête d'observer une fois animé
            }
        });
    }, observerOptions);

    // On ajoute la classe CSS 'hidden' via JS pour que ça reste visible si JS est désactivé
    const cards = document.querySelectorAll('.rule-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`; // Délai progressif
        observer.observe(card);
    });

    // Petite triche CSS via JS pour l'état visible
    // On injecte une classe ou on modifie le style direct quand c'est visible
    document.addEventListener('scroll', () => {
        // Cette partie est gérée par l'observer au-dessus,
        // mais on doit définir ce que fait "visible"
    });
});

    // Ajout de la logique de classe "visible" directement dans l'observer
    // Modification du prototype de l'observer ci-dessus :
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
        }
    });
});

const cardsToReveal = document.querySelectorAll('.rule-card');
cardsToReveal.forEach(card => revealObserver.observe(card));

// On ajoute les nouvelles cartes à l'animation d'apparition
const moreCards = document.querySelectorAll('.news-card, .clan-card');
moreCards.forEach((card, index) => {
    // Style initial (caché)
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';

    // On observe
    revealObserver.observe(card);
});