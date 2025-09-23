document.addEventListener('DOMContentLoaded', function() {
    console.log('Site chargé avec succès');

    // === INTERSECTION OBSERVER DE BASE POUR ANIMATIONS D'ENTRÉE ===

    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1]
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const element = entry.target;

            if (entry.isIntersecting) {
                element.classList.add('is-inview');
                console.log(`Element entered view: ${element.id || element.className}`);
            } else {
                element.classList.remove('is-inview');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observer les éléments avec les classes d'animation
    const elementsToObserve = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .observe-element');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });

    // Observer automatiquement les sections principales
    const mainSections = document.querySelectorAll('section[id]');
    mainSections.forEach(section => {
        section.classList.add('observe-section');
        observer.observe(section);
    });

    // === FONCTION UTILITAIRE POUR SMOOTH SCROLL ===

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    window.scrollToSection = scrollToSection;

    // === HEADER STICKY ET MENU MOBILE ===

    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    // Gestion du header sticky avec backdrop-filter au scroll
    let lastScrollY = window.scrollY;

    function handleHeaderScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleHeaderScroll);

    // Gestion du menu mobile
    function toggleMobileMenu() {
        const isActive = mobileMenu.classList.contains('header__mobile-menu--active');

        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        mobileMenu.classList.add('header__mobile-menu--active');
        menuToggle.classList.add('header__menu-toggle--active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('header__mobile-menu--active');
        menuToggle.classList.remove('header__menu-toggle--active');
        document.body.style.overflow = '';
    }

    // Event listeners pour le menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Fermer le menu mobile en cliquant en dehors
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });
    }

    // Fermer le menu mobile avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('header__mobile-menu--active')) {
            closeMobileMenu();
        }
    });

    // Exposer la fonction globalement
    window.closeMobileMenu = closeMobileMenu;

    // === GESTION VIDÉO HERO (SIMPLE) ===

    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        heroVideo.addEventListener('loadedmetadata', () => {
            heroVideo.play().catch(e => console.log('Autoplay bloqué:', e));
        });
    }

    // === SECTION APPROCHE - BARRE DE PROGRESSION ET BOUSSOLE ===

    const approacheSection = document.querySelector('.approche');
    const progressFill = document.getElementById('progressFill');
    const compassContainer = document.getElementById('compassContainer');
    const compass = document.getElementById('compass');

    let lastScrollPosition = 0;
    let compassRotation = 0;

    /**
     * Met à jour la progression et la position de la boussole
     */
    function updateApproachProgress() {
        if (!approacheSection || !progressFill || !compassContainer) return;

        const sectionRect = approacheSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progressContainer = document.querySelector('.progress-container');

        if (!progressContainer) return;

        // Calculer la progression (0 à 1)
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;

        // Commencer la progression quand la section est à 20% dans la vue
        let progress = 0;

        if (sectionTop <= windowHeight * 0.8) {
            // La section est suffisamment visible
            const scrolledIntoView = windowHeight * 0.8 - sectionTop;
            const totalScrollDistance = sectionHeight + windowHeight * 0.2;
            progress = Math.max(0, Math.min(scrolledIntoView / totalScrollDistance, 1));
        }

        // Mettre à jour la barre de progression
        progressFill.style.height = `${progress * 100}%`;

        // Mettre à jour la position de la boussole
        const containerRect = progressContainer.getBoundingClientRect();
        const containerHeight = containerRect.height;
        const compassHeight = 60; // hauteur de la boussole
        const availableHeight = containerHeight - compassHeight;

        const compassPosition = progress * availableHeight;

        compassContainer.style.top = `${compassPosition}px`;

        // Rotation de la boussole basée sur la progression
        const currentScrollPosition = window.pageYOffset;
        if (Math.abs(currentScrollPosition - lastScrollPosition) > 5) {
            // Détecter la direction du scroll pour la rotation
            const scrollDirection = currentScrollPosition > lastScrollPosition ? 1 : -1;
            compassRotation += scrollDirection * 10; // 10 degrés par "pas" de scroll

            compass.style.transform = `rotate(${compassRotation}deg)`;
            lastScrollPosition = currentScrollPosition;
        }

        // Animation de rotation aux jalons importants
        const prevProgress = parseFloat(progressFill.dataset.prevProgress || '0');
        const milestones = [0.25, 0.5, 0.75, 1];

        milestones.forEach(milestone => {
            if (prevProgress < milestone && progress >= milestone) {
                triggerCompassAnimation();
            }
        });

        progressFill.dataset.prevProgress = progress.toString();

        // Debug
        console.log(`Progress: ${(progress * 100).toFixed(1)}%, Compass position: ${compassPosition.toFixed(1)}px`);
    }

    /**
     * Déclenche l'animation de rotation de la boussole
     */
    function triggerCompassAnimation() {
        if (!compass) return;

        compass.classList.remove('rotating');
        // Force reflow pour redémarrer l'animation
        compass.offsetHeight;
        compass.classList.add('rotating');

        // Retirer la classe après l'animation
        setTimeout(() => {
            compass.classList.remove('rotating');
        }, 2000);
    }

    /**
     * Gestionnaire de scroll optimisé avec throttling
     */
    let scrollTimeout;
    function handleApproachScroll() {
        if (scrollTimeout) return;

        scrollTimeout = requestAnimationFrame(() => {
            updateApproachProgress();
            scrollTimeout = null;
        });
    }

    /**
     * Observer d'intersection pour détecter quand la section approche entre en vue
     */
    const approachObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Commencer à écouter le scroll
                window.addEventListener('scroll', handleApproachScroll);
                updateApproachProgress();
                console.log('Approach section entered view - scroll listener activated');
            } else {
                // Continuer à écouter le scroll même quand la section n'est plus visible
                // pour permettre la progression complète
                console.log('Approach section left view - keeping scroll listener for completion');
            }
        });
    }, {
        rootMargin: '200px 0px 200px 0px', // Commencer bien avant que la section soit visible
        threshold: 0
    });

    // Observer la section approche
    if (approacheSection) {
        approachObserver.observe(approacheSection);

        // Initialisation
        updateApproachProgress();

        console.log('Approach section with progress bar and animated compass initialized');
    }

    // === INTÉGRATION CALENDLY AMÉLIORÉE ===

    const showCalendlyBtn = document.getElementById('show-calendly');
    const contactIntro = document.getElementById('contactIntro');
    const calendlyContainer = document.getElementById('calendlyContainer');
    const contactCard = document.getElementById('contactCard');

    // État
    let isTransitioning = false;
    let calendlyLoaded = false;

    function loadCalendlyWidget() {
        if (calendlyLoaded) return;

        const calendlyWidget = document.getElementById('calendlyWidget');
        if (calendlyWidget && window.Calendly) {
            window.Calendly.initInlineWidget({
                url: 'https://calendly.com/nouvelle-rive/consultation-30min',
                parentElement: calendlyWidget,
                prefill: {},
                utm: {
                    utmCampaign: 'Nouvelle Rive Website',
                    utmSource: 'website',
                    utmMedium: 'cta_button'
                }
            });
            calendlyLoaded = true;
            console.log('Calendly widget loaded');
        } else {
            // Réessayer si Calendly n'est pas encore chargé
            setTimeout(loadCalendlyWidget, 500);
        }
    }

    function transitionToCalendly() {
        if (isTransitioning) return;
        isTransitioning = true;

        // Phase 1: Fade out intro
        contactIntro.classList.add('fade-out');

        // Phase 2: Show Calendly
        setTimeout(() => {
            contactIntro.style.display = 'none';
            calendlyContainer.style.display = 'block';
            loadCalendlyWidget();

            // Phase 3: Fade in Calendly
            setTimeout(() => {
                calendlyContainer.classList.add('visible');
                contactCard.style.minHeight = 'auto';
                isTransitioning = false;
            }, 100);
        }, 600);
    }

    // Event listener pour le bouton
    if (showCalendlyBtn) {
        showCalendlyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            transitionToCalendly();
        });
    }

    // Animations d'entrée pour la section contact
    const contactSection = document.querySelector('.contact');
    const contactTitle = document.querySelector('.contact__title');
    const contactSubtitle = document.querySelector('.contact__subtitle');

    if (contactSection) {
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ajouter les classes d'animation
                    if (contactTitle) contactTitle.classList.add('fade-in');
                    if (contactSubtitle) contactSubtitle.classList.add('fade-in');
                    if (showCalendlyBtn) showCalendlyBtn.classList.add('fade-in');
                    contactObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        contactObserver.observe(contactSection);
    }

    console.log('Main script initialized with enhanced approach interaction and Calendly integration');
});

/**
 * Additional Enhancement: Parallax Effect for Icons
 * Adds subtle parallax movement to icons on scroll
 */
const addParallaxEffect = () => {
    const visualWrapper = document.querySelector('.visual__wrapper, .approche__visual');
    if (!visualWrapper) return;

    let ticking = false;

    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const speed = 0.5;
        const yPos = -(scrolled * speed);

        visualWrapper.style.transform = `translateY(${yPos}px)`;
        ticking = false;
    };

    const requestTick = () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    };

    // Only apply on desktop
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestTick);
    }
};

// Initialize parallax when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addParallaxEffect);
} else {
    addParallaxEffect();
}