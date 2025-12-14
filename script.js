document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. PARALLAXE OPTIMISÉ
       ========================================= */
    const textElement = document.getElementById('parallax-text');
    
    if (textElement) {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollPosition = window.scrollY;

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
       2. NAVIGATION ACTIVE ET CLICK FIX
       ========================================= */
    const navLinks = document.querySelectorAll('.bubble-nav a');
    
    function handleNavClick(e) {
        e.preventDefault();

        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].classList.remove('active');
        }
        this.classList.add('active');
        const targetId = this.getAttribute('href');

        if (targetId === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        history.pushState(null, null, targetId);
    }

    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', handleNavClick);
    }

    /* =========================================
       3. ANIMATION D'APPARITION (SCROLL REVEAL)
       ========================================= */
    
    const allAnimatedCards = document.querySelectorAll('.rule-card, .news-card, .clan-card');

    if ('IntersectionObserver' in window) {
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        allAnimatedCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
            
            if(card.classList.contains('rule-card')) {
                card.style.transitionDelay = `${index * 0.1}s`; 
            }
            
            revealObserver.observe(card);
        });

    } else {
        for (let i = 0; i < allAnimatedCards.length; i++) {
            allAnimatedCards[i].style.opacity = '1';
            allAnimatedCards[i].style.transform = 'translateY(0)';
        }
    }


    /* =========================================
       4. EFFET TILT 3D SUR LES CARTES
       ========================================= */
    const cards = document.querySelectorAll('.clan-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top; 
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });


});