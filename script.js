document.addEventListener('DOMContentLoaded', () => {

    // --- 1. PARALLAXE OPTIMISÉ ---
    const textElement = document.getElementById('parallax-text');
    
    if (textElement) {
        // On ne fait le calcul que quand l'écran est prêt à afficher une image
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollPosition = window.scrollY;
                    // On limite le calcul si on est trop bas dans la page pour rien
                    if (scrollPosition < 800) { 
                        textElement.style.transform = `translateY(${scrollPosition * 0.4}px)`;
                        textElement.style.opacity = 1 - (scrollPosition / 700);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /* =========================================
       2. NAVIGATION ACTIVE (BULLES)
       ========================================= */
    const navLinks = document.querySelectorAll('.bubble-nav a');
    
    // Fonction utilitaire pour gérer la boucle (compatible vieux navigateurs)
    function handleNavClick() {
        // Enlève 'active' sur tous
        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].classList.remove('active');
        }
        // Ajoute 'active' sur celui cliqué
        this.classList.add('active');
    }

    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', handleNavClick);
    }

    /* =========================================
       3. ANIMATION D'APPARITION (SCROLL REVEAL)
       ========================================= */
    
    // On sélectionne TOUS les éléments à animer
    const allAnimatedCards = document.querySelectorAll('.rule-card, .news-card, .clan-card');

    // VÉRIFICATION DE COMPATIBILITÉ
    // Si le navigateur supporte IntersectionObserver (Moderne)
    if ('IntersectionObserver' in window) {
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // L'élément est visible
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    // On arrête d'observer cet élément pour économiser des ressources
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // 10% visible
        });

        // On initialise l'état caché et on lance l'observation
        allAnimatedCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            // Délai progressif un peu random pour un effet naturel
            card.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
            
            // Si c'est une 'rule-card', on garde ton délai décalé sympa
            if(card.classList.contains('rule-card')) {
                card.style.transitionDelay = `${index * 0.1}s`; 
            }
            
            revealObserver.observe(card);
        });

    } else {
        // FALLBACK : Si le navigateur est trop vieux (IE, vieux Safari)
        // On affiche tout direct pour ne pas casser le site
        for (let i = 0; i < allAnimatedCards.length; i++) {
            allAnimatedCards[i].style.opacity = '1';
            allAnimatedCards[i].style.transform = 'translateY(0)';
        }
    }
});