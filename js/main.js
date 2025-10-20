/**
 * NOUVELLE RIVE - JavaScript principal
 * Architecture moderne et performante
 */

/**
 * Bouton retour en haut - Fonction standalone pour toutes les pages
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    // Afficher/masquer le bouton selon le scroll
    const toggleButton = () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('is-visible');
        } else {
            backToTopBtn.classList.remove('is-visible');
        }
    };

    // Écouter le scroll avec throttle pour les performances
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(toggleButton);
    });

    // Retour en haut au clic
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Menu mobile - Fonction standalone pour toutes les pages
 */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    const links = menu?.querySelectorAll('.nav__link');

    if (!toggle || !menu) return;

    let isOpen = false;

    toggle.addEventListener('click', () => {
        isOpen = !isOpen;

        toggle.classList.toggle('active', isOpen);
        menu.classList.toggle('active', isOpen);

        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking on links
    links?.forEach(link => {
        link.addEventListener('click', () => {
            if (isOpen) {
                isOpen = false;
                toggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
            isOpen = false;
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

class NouvelleRive {
    constructor() {
        this.init();
    }

    init() {
        // Enregistrement des plugins GSAP
        gsap.registerPlugin(ScrollTrigger);

        // Initialisation des modules
        this.initHeader();
        this.initStaggeredAnimations();
        this.initApproachPreviewAnimation();
        this.initCalendlyIntegration();
        this.initSmoothScrolling();
        this.initHeroVideo();
        this.initHeroParallax();
        this.initValueCardsTilt();
        this.initMicroInteractions();
        this.initArtisanalCardAnimation();
        this.initTrustQAAnimation();

        console.log('🚀 Nouvelle Rive initialized');
    }

    /**
     * Header intelligent avec changement d'état au scroll
     */
    initHeader() {
        const header = document.getElementById('header');
        if (!header) return;

        // Header is always solid (no transparent logic)
        // This ensures uniform appearance across all pages
    }

    /**
     * Animations d'entrée en cascade pour les groupes d'éléments
     */
    initStaggeredAnimations() {
        // Cibler tous les conteneurs dont les enfants doivent apparaître en cascade
        const batchContainers = ['.challenges', '.potential-grid', '.bento-grid'];

        batchContainers.forEach(container => {
            const cards = document.querySelectorAll(`${container} > *`);
            if (cards.length === 0) return;

            gsap.set(cards, { y: 30, opacity: 0 }); // Position initiale

            ScrollTrigger.batch(cards, {
                interval: 0.1, // Léger décalage entre chaque carte
                start: "top 85%",
                onEnter: batch => gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power2.out",
                    overwrite: true
                }),
                onLeaveBack: batch => gsap.set(batch, {
                    opacity: 0,
                    y: 30,
                    overwrite: true
                })
            });
        });
    }

    /**
     * Animation de la timeline de l'aperçu de l'approche
     */
    initApproachPreviewAnimation() {
        const section = document.querySelector('#approche-preview');
        if (!section) return;

        const line = section.querySelector('.approach-preview__line');
        const markers = section.querySelectorAll('.approach-preview__marker');
        const titles = section.querySelectorAll('.approach-preview__title');

        // Créer une timeline GSAP
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        // Animer la ligne
        tl.from(line, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1,
            ease: "power2.inOut"
        });

        // Animer les marqueurs et titres en cascade
        tl.from([markers, titles], {
            opacity: 0,
            scale: 0.5,
            y: 20,
            stagger: 0.2,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, "-=0.5"); // Commence 0.5s avant la fin de l'animation précédente
    }

    /**
     * Intégration Calendly avec transition fluide
     */
    initCalendlyIntegration() {
        const showButton = document.getElementById('showCalendly');
        const introSection = document.getElementById('contactIntro');
        const calendlyContainer = document.getElementById('calendlyContainer');
        const calendlyWidget = document.getElementById('calendlyWidget');

        if (!showButton || !introSection || !calendlyContainer) return;

        let calendlyLoaded = false;

        const loadCalendlyWidget = () => {
            if (calendlyLoaded || !window.Calendly) return;

            window.Calendly.initInlineWidget({
                url: 'https://calendly.com/angougeardnicolas/30min',
                parentElement: calendlyWidget,
                prefill: {},
                utm: {
                    utmCampaign: 'Nouvelle Rive Website',
                    utmSource: 'website',
                    utmMedium: 'cta_button'
                }
            });

            calendlyLoaded = true;
            console.log('📅 Calendly widget loaded');
        };

        const showCalendly = () => {
            // Fade out intro
            gsap.to(introSection, {
                opacity: 0,
                y: -20,
                duration: 0.4,
                ease: 'power2.inOut',
                onComplete: () => {
                    introSection.style.display = 'none';
                    calendlyContainer.style.display = 'block';
                    calendlyContainer.classList.add('visible');

                    // Load Calendly widget
                    loadCalendlyWidget();

                    // Fade in Calendly
                    gsap.fromTo(calendlyContainer, {
                        opacity: 0,
                        y: 20
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            });
        };

        showButton.addEventListener('click', (e) => {
            e.preventDefault();
            showCalendly();
        });
    }

    /**
     * Smooth scrolling pour les liens de navigation
     */
    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Gestion de la vidéo hero avec fallback
     */
    initHeroVideo() {
        const video = document.querySelector('.hero__video');
        if (!video) return;

        // Ensure video plays on mobile devices
        video.addEventListener('loadedmetadata', () => {
            video.play().catch(e => {
                console.log('Video autoplay prevented:', e);
                // Could add a play button here if needed
            });
        });

        // Pause video when not in viewport for performance
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            });
        }, { rootMargin: '50px' });

        videoObserver.observe(video);
    }

    /**
     * Préchargement des ressources critiques
     */
    preloadCriticalResources() {
        // Preload critical fonts
        const fontUrls = [
            'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
            'https://fonts.gstatic.com/s/lora/v32/0QIvMX1D_JOuGQbT0gPQ1LlT.woff2'
        ];

        fontUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.type = 'font/woff2';
            link.href = url;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    /**
     * Animation parallaxe Hero avec GSAP
     */
    initHeroParallax() {
        const heroVideo = document.querySelector('.hero__video');
        const heroContent = document.querySelector('.hero__content');

        if (!heroVideo || !heroContent) return;

        // PAS D'ANIMATION PARALLAX SUR LA VIDÉO
        // La vidéo reste fixe pour éviter les décalages

        // Animation subtile uniquement sur le contenu (fade out au scroll)
        gsap.to(heroContent, {
            opacity: 0.7,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "center top",
                scrub: 1
            }
        });

        // Animation d'entrée du titre avec split text
        const heroTitle = document.querySelector('.hero__title');
        if (heroTitle) {
            const words = heroTitle.textContent.split(' ');
            heroTitle.innerHTML = words.map(word =>
                `<span class="word">${word}</span>`
            ).join(' ');

            gsap.fromTo('.hero__title .word', {
                y: 100,
                opacity: 0,
                rotationX: 90
            }, {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 1,
                stagger: 0.1,
                ease: "back.out(1.7)",
                delay: 0.5
            });
        }
    }

    /**
     * Tilt 3D interactif sur les cartes valeurs
     */
    initValueCardsTilt() {
        const valueCards = document.querySelectorAll('.value-card');

        valueCards.forEach(card => {
            let isActive = false;

            card.addEventListener('mouseenter', () => {
                isActive = true;
                gsap.to(card, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                isActive = false;
                gsap.to(card, {
                    scale: 1,
                    rotationX: 0,
                    rotationY: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mousemove', (e) => {
                if (!isActive) return;

                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const deltaX = (e.clientX - centerX) / (rect.width / 2);
                const deltaY = (e.clientY - centerY) / (rect.height / 2);

                const rotationY = deltaX * 15; // Max 15deg rotation
                const rotationX = -deltaY * 10; // Max 10deg rotation

                gsap.to(card, {
                    rotationX: rotationX,
                    rotationY: rotationY,
                    duration: 0.2,
                    ease: "power2.out"
                });

                // Subtle shadow adjustment
                const shadowIntensity = Math.abs(deltaX) + Math.abs(deltaY);
                const shadowOpacity = Math.min(0.2 + shadowIntensity * 0.1, 0.4);

                gsap.to(card, {
                    boxShadow: `
                        0 ${5 + shadowIntensity * 15}px ${30 + shadowIntensity * 20}px rgba(0, 0, 0, ${shadowOpacity}),
                        0 ${2 + shadowIntensity * 5}px ${10 + shadowIntensity * 10}px rgba(0, 168, 255, ${shadowOpacity * 0.3})
                    `,
                    duration: 0.2
                });
            });
        });
    }

    /**
     * Micro-interactions avancées
     */
    initMicroInteractions() {
        // Cursor magnétique sur les boutons
        const magneticElements = document.querySelectorAll('.btn, .nav__link--cta');

        magneticElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(element, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    scale: 1,
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            });

            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const deltaX = (e.clientX - centerX) * 0.2;
                const deltaY = (e.clientY - centerY) * 0.2;

                gsap.to(element, {
                    x: deltaX,
                    y: deltaY,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Animation spécifique pour les icônes de la section défis
        const challengeCards = document.querySelectorAll('#defis .challenge-card');
        challengeCards.forEach(card => {
            const icon = card.querySelector('.icon--challenge');
            const iconParent = card.querySelector('.challenge-card__icon');

            if (icon && iconParent) {
                // Nettoyer les styles inline existants
                gsap.set(icon, { clearProps: "all" });

                card.addEventListener('mouseenter', () => {
                    // Animation du conteneur icône
                    gsap.to(iconParent, {
                        scale: 1.15,
                        background: "linear-gradient(135deg, var(--color-primary), #0099ff)",
                        boxShadow: "0 8px 25px rgba(0, 116, 217, 0.4)",
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(iconParent, {
                        scale: 1,
                        background: "var(--color-primary)",
                        boxShadow: "var(--shadow-md)",
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                });
            }
        });

        // Animation d'icônes pour les autres sections (timeline, etc.)
        const otherIcons = document.querySelectorAll('.icon:not(.icon--challenge)');
        otherIcons.forEach(icon => {
            const iconParent = icon.closest('.timeline__marker');
            if (iconParent) {
                iconParent.addEventListener('mouseenter', () => {
                    gsap.to(icon, {
                        scale: 1.2,
                        rotation: 10,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                });

                iconParent.addEventListener('mouseleave', () => {
                    gsap.to(icon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                });
            }
        });

        // Stagger animations pour les cartes
        const cardContainers = ['.challenges', '.solutions', '.values'];
        cardContainers.forEach(containerSelector => {
            const container = document.querySelector(containerSelector);
            if (container) {
                const cards = container.querySelectorAll('.challenge-card, .solution-card, .value-card');

                gsap.fromTo(cards, {
                    y: 60,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        });

        // Parallax subtil sur le scroll (exclut la section défis et le hero content)
        const parallaxElements = document.querySelectorAll('.section__header:not(#defis .section__header):not(.hero__content)');
        parallaxElements.forEach(element => {
            gsap.to(element, {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Interactions pour la grille "Potentiel"
        document.querySelectorAll('.potential-card').forEach(card => {
            const arrow = card.querySelector('.potential-card__arrow');
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { y: -8, scale: 1.03, duration: 0.3, ease: 'power2.out' });
                if (arrow) {
                    gsap.to(arrow, { x: 10, duration: 0.3, ease: 'power2.out' });
                }
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
                if (arrow) {
                    gsap.to(arrow, { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
                }
            });
        });

        // Interactions pour la grille "Bento"
        document.querySelectorAll('.bento-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
            });
        });

        // Animation des lignes de connexion Bento
        this.initBentoConnections();
    }

    /**
     * Animation des lignes de connexion Bento
     */
    initBentoConnections() {
        const bentoGrid = document.querySelector('.bento-grid');
        const connectionLines = document.querySelectorAll('.connection-line');

        if (!bentoGrid || connectionLines.length === 0) return;

        // Animation d'apparition séquentielle des lignes
        ScrollTrigger.create({
            trigger: bentoGrid,
            start: "top 70%",
            onEnter: () => {
                connectionLines.forEach((line, index) => {
                    gsap.to(line, {
                        strokeDashoffset: 0,
                        opacity: 1,
                        duration: 1.5,
                        ease: "power2.inOut",
                        delay: index * 0.4 // Décalage pour effet séquentiel
                    });
                });
            }
        });

        // Animation au hover des cartes
        document.querySelectorAll('.bento-card').forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                // Mettre en évidence les lignes connectées à cette carte
                const relatedLines = this.getBentoRelatedLines(index);
                relatedLines.forEach(lineIndex => {
                    const line = connectionLines[lineIndex];
                    if (line) {
                        gsap.to(line, {
                            opacity: 1,
                            strokeWidth: 3,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    }
                });
            });

            card.addEventListener('mouseleave', () => {
                // Retour à l'état normal
                connectionLines.forEach(line => {
                    gsap.to(line, {
                        opacity: 0.6,
                        strokeWidth: 2,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            });
        });
    }

    /**
     * Retourne les indices des lignes connectées à une carte donnée
     */
    getBentoRelatedLines(cardIndex) {
        // Connection path: Block 1 → Block 2 → Block 3 (L'Humain) → Block 4 (Prototype) → Block 1
        // DOM mapping: 0 → 1 → 3 → 2 → 0
        const connections = {
            0: [0, 3], // Votre Contexte (Block 1): lignes 1→2 et 4→1
            1: [0, 1], // La Clarté (Block 2): lignes 1→2 et 2→3
            2: [2, 3], // Prototype (Block 4): lignes 3→4 et 4→1
            3: [1, 2]  // L'Humain (Block 3): lignes 2→3 et 3→4
        };
        return connections[cardIndex] || [];
    }

    /**
     * Animation spéciale pour la carte Approche artisanale
     */
    initArtisanalCardAnimation() {
        const artisanalCard = document.querySelector('.value-card--large');
        if (!artisanalCard) return;

        // Animation de particules suivant la souris
        artisanalCard.addEventListener('mousemove', (e) => {
            const rect = artisanalCard.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            // Déplacer les gradients en fonction de la position de la souris
            gsap.to(artisanalCard, {
                '--mouse-x': `${x}%`,
                '--mouse-y': `${y}%`,
                duration: 0.3,
                ease: "power2.out"
            });

            // Animation des formes flottantes
            const floatingShapes = artisanalCard.querySelector('.floating-shapes');
            if (floatingShapes) {
                gsap.to(floatingShapes, {
                    x: (x - 50) * 0.1,
                    y: (y - 50) * 0.1,
                    rotation: x * 0.1,
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
        });

        artisanalCard.addEventListener('mouseleave', () => {
            // Retour à la position initiale
            const floatingShapes = artisanalCard.querySelector('.floating-shapes');
            if (floatingShapes) {
                gsap.to(floatingShapes, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    duration: 1,
                    ease: "elastic.out(1, 0.3)"
                });
            }
        });

        // Animation au scroll avec ScrollTrigger
        ScrollTrigger.create({
            trigger: artisanalCard,
            start: "top 80%",
            onEnter: () => {
                gsap.fromTo(artisanalCard.querySelector('.floating-shapes'), {
                    scale: 0,
                    opacity: 0
                }, {
                    scale: 1,
                    opacity: 1,
                    duration: 1.5,
                    ease: "elastic.out(1, 0.5)"
                });

                // Animation staggerée du contenu
                gsap.fromTo([
                    artisanalCard.querySelector('.value-card__title'),
                    artisanalCard.querySelector('.value-card__description')
                ], {
                    y: 50,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "back.out(1.7)"
                });
            }
        });
    }

    /**
     * Animation de la section Trust Q&A avec timeline verticale
     */
    initTrustQAAnimation() {
        const trustQA = document.querySelector('.trust-qa');
        if (!trustQA) {
            console.log('Trust QA section not found');
            return;
        }

        const items = gsap.utils.toArray('.trust-qa__item');
        const progressLine = document.querySelector('.trust-qa__timeline-progress');

        // Animation de la ligne de progression
        if (progressLine) {
            gsap.to(progressLine, {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.trust-qa',
                    start: 'top center',
                    end: 'bottom center',
                    scrub: 0.5
                }
            });
            console.log('Trust QA progress line animation initialized');
        }

        // Animation de chaque item au scroll
        items.forEach((item, index) => {
            ScrollTrigger.create({
                trigger: item,
                start: 'top center+=100',
                onEnter: () => item.classList.add('is-visible'),
                onLeaveBack: () => item.classList.remove('is-visible')
            });
        });
    }

    /**
     * Gestion des erreurs globales
     */
    handleErrors() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }
}

/**
 * Section Assistants Glass Morphism - Animations GSAP
 */
function initAssistantsGlassSection() {
    if (!document.querySelector('.assistants-glass-section')) {
        console.log('⚠️ Assistants Glass Section not found');
        return;
    }

    console.log('✅ Initializing Assistants Glass Section');

    // 1. Counter Animation pour la statistique
    const statNumber = document.querySelector('.stat-number');
    if (!statNumber) {
        console.warn('⚠️ .stat-number not found - skipping counter animation');
    } else {
        const target = parseInt(statNumber.dataset.target);

        gsap.to(statNumber, {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.assistants-glass-stat',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            snap: { innerText: 1 },
            onUpdate: function() {
                statNumber.innerText = Math.ceil(statNumber.innerText);
            }
        });
    }

    // 2. Cascade d'apparition des cards
    gsap.from('.glass-card', {
        scrollTrigger: {
            trigger: '.assistants-glass-cards',
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all'
    });

    // 3. Animation du contenu gauche
    gsap.from('.assistants-glass-content > *', {
        scrollTrigger: {
            trigger: '.assistants-glass-content',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // 4. Particules désactivées (enlevées à la demande)

    // 5. Effet parallaxe au mouvement de la souris (desktop only)
    if (window.innerWidth > 1024) {
        const cards = document.querySelectorAll('.glass-card');
        const section = document.querySelector('.assistants-glass-section');

        if (section && cards.length > 0) {
            section.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;

                const moveX = (clientX - centerX) / 50;
                const moveY = (clientY - centerY) / 50;

                cards.forEach((card, index) => {
                    gsap.to(card, {
                        x: moveX * (index + 1) * 0.5,
                        y: moveY * (index + 1) * 0.5,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                });
            });
        } else {
            console.warn('⚠️ .assistants-glass-section or .glass-card not found - skipping parallax effect');
        }
    }
}

/**
 * PAGE APPROCHE - JavaScript avancé
 * Animations et interactions premium pour une expérience immersive
 */

class ApprochePage {
    constructor() {
        this.init();
    }

    init() {
        // Attendre que GSAP et ScrollTrigger soient chargés
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            setTimeout(() => this.init(), 100);
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        // Register MotionPathPlugin if available (for mountain animation)
        if (typeof MotionPathPlugin !== 'undefined') {
            gsap.registerPlugin(MotionPathPlugin);
        }

        // Animation montagne du hero désactivée (utilise vidéo maintenant)
        // this.initApprocheMountainAnimation();
        this.initScrollAnimations();
        this.initPhilosophyCards();
        this.initStepCards();
        this.initParallaxEffects();
        this.initMicroInteractions();
        this.initProgressiveReveal();
        this.initAccessibility();
        this.initInteractiveTimeline();
        this.initInteractiveArchitecture();
        this.initGearAnimation(); // Nouvelle animation d'engrenages 2025

        console.log('🎯 Page Approche initialized');
    }

    /**
     * Gère la timeline interactive de la page Approche.
     */
    initInteractiveTimeline() {
        const timelineContainer = document.querySelector('.interactive-timeline');
        if (!timelineContainer) return; // N'exécute le code que sur la bonne page

        const visualContainer = document.querySelector('.timeline-visual__sticky-container');
        // Les SVG sont maintenant inline dans le HTML, pas besoin de les charger
        if (visualContainer) {
            this.setupTimelineAnimation(visualContainer);
            this.animateMethodeVisuals();
        }
    }

    /**
     * Anime les éléments SVG de la section méthode
     */
    animateMethodeVisuals() {
        // Animer Étape 1 : Document d'audit qui se remplit
        const docFrame = document.querySelector('#step1-visual .doc-frame');
        const docHeader = document.querySelector('#step1-visual .doc-header');
        const textLines = document.querySelectorAll('#step1-visual .text-line');
        const checkCircles = document.querySelectorAll('#step1-visual .check-circle');
        const checkmarks = document.querySelectorAll('#step1-visual .check-mark');
        const magnifier = document.querySelector('#step1-visual .magnifier');
        const magnifierGlow = document.querySelector('#step1-visual .magnifier-glow');
        const magnifierLens = document.querySelector('#step1-visual .magnifier-lens');

        // 1. Cadre du document se dessine
        if (docFrame) {
            gsap.to(docFrame, {
                strokeDashoffset: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="1"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        // 2. Header du document pulse (loop)
        if (docHeader) {
            gsap.to(docHeader, {
                opacity: 0.8,
                duration: 1.5,
                delay: 0.5,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="1"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        // 3. Lignes de texte se remplissent
        textLines.forEach((line, index) => {
            gsap.to(line, {
                strokeDashoffset: 0,
                duration: 0.6,
                delay: 0.5 + (index * 0.2),
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="1"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 4. Checkmarks se cochent avec bounce
        checkmarks.forEach((mark, index) => {
            // Cercle pulse
            if (checkCircles[index]) {
                gsap.to(checkCircles[index], {
                    scale: 1.3,
                    duration: 0.3,
                    delay: 1.5 + (index * 0.4),
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.timeline-step[data-step="1"]',
                        start: 'top center',
                        toggleActions: 'play none none reverse'
                    }
                });
            }

            // Checkmark apparaît avec bounce
            gsap.fromTo(mark, {
                opacity: 0,
                scale: 0
            }, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                delay: 1.6 + (index * 0.4),
                ease: 'back.out(2)',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="1"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 5. Loupe scanne (mouvement + pulse)
        if (magnifier) {
            // Mouvement vertical de scan
            gsap.to(magnifier, {
                y: -10,
                duration: 1.5,
                delay: 2.5,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="1"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        if (magnifierLens) {
            // Pulse de la lentille
            gsap.to(magnifierLens, {
                scale: 1.15,
                duration: 1.5,
                delay: 2.5,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
                transformOrigin: 'center',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="1"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        if (magnifierGlow) {
            // Glow pulse
            gsap.to(magnifierGlow, {
                opacity: 0.3,
                scale: 1.1,
                duration: 1.5,
                delay: 2.5,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
                transformOrigin: 'center',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="1"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        // Animer Étape 2 : Robot en construction
        const robotParts = document.querySelectorAll('#step2-visual .robot-part');
        const robotEyes = document.querySelectorAll('#step2-visual .robot-eye');
        const robotHands = document.querySelectorAll('#step2-visual .robot-hand');
        const antennaLights = document.querySelectorAll('#step2-visual .antenna-light');
        const controlPanel = document.querySelectorAll('#step2-visual .control-panel');
        const progressBarFill = document.querySelector('#step2-visual .progress-bar-fill');
        const progressText = document.querySelector('#step2-visual .progress-text');
        const progressTextColored = document.querySelector('#step2-visual .progress-text-colored');
        const progressClipRect = document.querySelector('#step2-visual .progress-clip-rect');
        const skillIcons = document.querySelectorAll('#step2-visual .skill-icon');

        // Les parties du robot se dessinent séquentiellement
        robotParts.forEach((part, index) => {
            gsap.to(part, {
                strokeDashoffset: 0,
                duration: 0.8,
                delay: index * 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="2"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Yeux apparaissent
        gsap.to(robotEyes, {
            opacity: 1,
            duration: 0.3,
            delay: 1.5,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.timeline-step[data-step="2"]',
                start: 'top center',
                toggleActions: 'play none none reverse'
            }
        });

        // Mains apparaissent
        gsap.to(robotHands, {
            opacity: 1,
            duration: 0.3,
            delay: 1.8,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.timeline-step[data-step="2"]',
                start: 'top center',
                toggleActions: 'play none none reverse'
            }
        });

        // Lumières antennes pulsent
        gsap.to(antennaLights, {
            opacity: 1,
            duration: 0.5,
            delay: 2,
            yoyo: true,
            repeat: -1,
            repeatDelay: 0.5,
            scrollTrigger: {
                trigger: '.timeline-step[data-step="2"]',
                start: 'top center',
                toggleActions: 'play none none reverse'
            }
        });

        // Panneau de contrôle apparaît
        gsap.to(controlPanel, {
            opacity: 1,
            duration: 0.4,
            delay: 2.2,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.timeline-step[data-step="2"]',
                start: 'top center',
                toggleActions: 'play none none reverse'
            }
        });

        // Jauge de progression se remplit
        if (progressBarFill) {
            gsap.to(progressBarFill, {
                attr: { width: 125 },
                duration: 1.5,
                delay: 2.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="2"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        // Clip-path synchronisé avec la jauge
        if (progressClipRect) {
            gsap.to(progressClipRect, {
                attr: { width: 125 },
                duration: 1.5,
                delay: 2.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="2"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        // Textes apparaissent
        if (progressText && progressTextColored) {
            gsap.to([progressText, progressTextColored], {
                opacity: 1,
                duration: 0.3,
                delay: 3,
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="2"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        // Icônes de compétences apparaissent
        skillIcons.forEach((icon, index) => {
            gsap.to(icon, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                delay: 3.3 + (index * 0.2),
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="2"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Animer Étape 3 : L'Équipe Augmentée - Période d'Essai (PATTERN COMME ÉTAPES 1-2)
        const workspaceTable = document.querySelector('#step3-visual .workspace-table');
        const humanParts = document.querySelectorAll('#step3-visual .human-part');
        const step3RobotParts = document.querySelectorAll('#step3-visual .robot-part');
        const step3RobotEyes = document.querySelectorAll('#step3-visual .robot-eye-left, #step3-visual .robot-eye-right');
        const step3RobotHands = document.querySelectorAll('#step3-visual .robot-hand-left, #step3-visual .robot-hand-right');
        const step3RobotScreen = document.querySelector('#step3-visual .robot-screen');
        const step3RobotActivity = document.querySelectorAll('#step3-visual .robot-activity-1, #step3-visual .robot-activity-2');
        const step3AntennaePulse = document.querySelectorAll('#step3-visual .antenna-pulse-left, #step3-visual .antenna-pulse-right');
        const dataFlows = document.querySelectorAll('#step3-visual .data-flow');
        const sharedDocs = document.querySelectorAll('#step3-visual .doc-shared');
        const bubbles = document.querySelectorAll('#step3-visual [class^="bubble-"]');
        const teamBadge = document.querySelector('#step3-visual .team-badge');
        const step3PerformanceIndicator = document.querySelector('#step3-visual .performance-indicator');
        const step3PerformanceTexts = document.querySelectorAll('#step3-visual .performance-text-value, #step3-visual .performance-text-label');
        const robotLowerBody = document.querySelector('#step3-visual .robot-lower-body');
        const human3Arms = document.querySelectorAll('#step3-visual .human-3-arm-left, #step3-visual .human-3-arm-right');

        // 1. Table de travail se dessine (comme doc-frame étape 1)
        if (workspaceTable) {
            gsap.to(workspaceTable, {
                strokeDashoffset: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        // 2. Membres humains se dessinent (comme robot-part étape 2)
        humanParts.forEach((part, index) => {
            gsap.to(part, {
                strokeDashoffset: 0,
                duration: 0.5,
                delay: 0.8 + (index * 0.08),
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 3. Robot se dessine (comme robot-part étape 2)
        step3RobotParts.forEach((part, index) => {
            gsap.to(part, {
                strokeDashoffset: 0,
                duration: 0.5,
                delay: 1.5 + (index * 0.1),
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 4. Yeux du robot apparaissent (comme robot-eye étape 2)
        step3RobotEyes.forEach((eye, index) => {
            gsap.to(eye, {
                opacity: 1,
                duration: 0.3,
                delay: 2.2 + (index * 0.1),
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 5. Écran et lignes d'activité apparaissent
        if (step3RobotScreen) {
            gsap.to(step3RobotScreen, {
                opacity: 1,
                duration: 0.4,
                delay: 2.4,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        }
        step3RobotActivity.forEach((line, index) => {
            gsap.to(line, {
                opacity: 1,
                duration: 0.3,
                delay: 2.5 + (index * 0.1),
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 6. Mains du robot apparaissent
        step3RobotHands.forEach((hand, index) => {
            gsap.to(hand, {
                opacity: 1,
                duration: 0.3,
                delay: 2.3 + (index * 0.1),
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 7. Antennes pulsent
        step3AntennaePulse.forEach((antenna, index) => {
            gsap.to(antenna, {
                opacity: 1,
                duration: 0.3,
                delay: 2.2 + (index * 0.1),
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 8. Connexions de données se dessinent
        dataFlows.forEach((flow, index) => {
            gsap.to(flow, {
                strokeDashoffset: 0,
                duration: 0.6,
                delay: 2.8 + (index * 0.15),
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 9. Tâches sur la table apparaissent et se cochent progressivement
        const taskItems = document.querySelectorAll('#step3-visual .task-item');
        const taskCheckmarks = document.querySelectorAll('#step3-visual .task-checkmark');

        taskItems.forEach((task, index) => {
            // Tâche apparaît
            gsap.to(task, {
                opacity: 1,
                y: -5,
                duration: 0.4,
                delay: 2.8 + (index * 0.3),
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });

            // Checkmark apparaît après
            if (taskCheckmarks[index]) {
                gsap.to(taskCheckmarks[index], {
                    opacity: 1,
                    scale: 1.2,
                    duration: 0.3,
                    delay: 3.2 + (index * 0.3),
                    ease: 'back.out(2)',
                    scrollTrigger: {
                        trigger: '.timeline-step[data-step="3"]',
                        start: 'top center',
                        toggleActions: 'play none none reverse'
                    }
                });
            }
        });

        // 10. Bulles de communication apparaissent
        bubbles.forEach((bubble, index) => {
            gsap.to(bubble, {
                opacity: 1,
                scale: 1.05,
                duration: 0.4,
                delay: 4.5 + (index * 0.15),
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 11. Flux de données pulsent en continu (effet de communication active)
        dataFlows.forEach((flow, index) => {
            gsap.to(flow, {
                strokeDashoffset: [0, -20],
                duration: 1.5,
                delay: 3.5,
                repeat: -1,
                ease: 'linear',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 12. Indicateur de performance apparaît avec animation
        if (step3PerformanceIndicator) {
            gsap.to(step3PerformanceIndicator, {
                opacity: 1,
                scale: 1.05,
                duration: 0.5,
                delay: 5.2,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        // 13. Texte de performance avec compteur animé
        const performanceValue = document.querySelector('#step3-visual .performance-text-value');
        if (performanceValue && step3PerformanceTexts.length > 0) {
            // Animation du compteur de 0% à +45%
            gsap.fromTo(performanceValue,
                {
                    textContent: "+0%",
                    opacity: 0
                },
                {
                    textContent: "+45%",
                    opacity: 1,
                    duration: 1.5,
                    delay: 5.4,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: '.timeline-step[data-step="3"]',
                        start: 'top center',
                        toggleActions: 'play none none reverse'
                    },
                    onUpdate: function() {
                        const value = Math.round(parseFloat(this.targets()[0].textContent));
                        this.targets()[0].textContent = `+${value}%`;
                    }
                }
            );

            // Label apparaît
            const performanceLabel = document.querySelector('#step3-visual .performance-text-label');
            if (performanceLabel) {
                gsap.to(performanceLabel, {
                    opacity: 1,
                    duration: 0.4,
                    delay: 5.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.timeline-step[data-step="3"]',
                        start: 'top center',
                        toggleActions: 'play none none reverse'
                    }
                });
            }
        }

        // 14. Animation de la bulle avec clé à molette (humain 3)
        const bubbleWrench = document.querySelector('#step3-visual .bubble-3-wrench');
        if (bubbleWrench) {
            gsap.to(bubbleWrench, {
                opacity: 1,
                y: -5,
                duration: 0.5,
                delay: 4.5,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        // 15. Animation du bas du robot (effet ombre sous la table)
        if (robotLowerBody) {
            gsap.to(robotLowerBody, {
                opacity: 1,
                duration: 0.6,
                delay: 1.5,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        // 16. Animation des bras de l'humain 3
        if (human3Arms && human3Arms.length > 0) {
            human3Arms.forEach((arm, index) => {
                gsap.to(arm, {
                    strokeDashoffset: 0,
                    duration: 0.4,
                    delay: 1.2 + (index * 0.1),
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.timeline-step[data-step="3"]',
                        start: 'top center',
                        toggleActions: 'play none none reverse'
                    }
                });
            });
        }

        // 17. Animations continues des bulles pour montrer l'interaction permanente
        // Bulle gauche - Animation des points "typing"
        const bubbleDots = document.querySelectorAll('#step3-visual .bubble-1-dot-1, #step3-visual .bubble-1-dot-2, #step3-visual .bubble-1-dot-3');
        bubbleDots.forEach((dot, index) => {
            gsap.to(dot, {
                opacity: 0.3,
                duration: 0.6,
                delay: 5 + (index * 0.2),
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Bulle droite - Pulse du checkmark
        const bubbleCheck = document.querySelector('#step3-visual .bubble-2-check');
        if (bubbleCheck) {
            gsap.to(bubbleCheck, {
                scale: 1.15,
                opacity: 0.7,
                duration: 1.2,
                delay: 5.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        // Bulle du bas - Pulse de la clé anglaise entière
        const wrenchIcon = document.querySelectorAll('#step3-visual .bubble-3-wrench rect:not(:first-child), #step3-visual .bubble-3-wrench path, #step3-visual .bubble-3-wrench .wrench-screw');
        if (wrenchIcon.length > 0) {
            gsap.to(wrenchIcon, {
                scale: 1.1,
                opacity: 0.8,
                duration: 1.4,
                delay: 6,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                transformOrigin: 'center center',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        }
    }

    /**
     * NOUVELLE FONCTION : Gère l'architecture interactive sur la page Fondations.
     */
    initInteractiveArchitecture() {
        const architectureContainer = document.querySelector('#interactive-architecture');
        if (!architectureContainer) return;

        const visualContainer = architectureContainer.querySelector('.visual-sticky-container');
        const steps = gsap.utils.toArray(".arch-step");
        
        // Charger le SVG
        fetch('../assets/svg/architecture-interactive.svg')
            .then(response => response.text())
            .then(data => {
                visualContainer.innerHTML = data;
                const svg = visualContainer.querySelector('svg');
                const svgGroups = {
                    data: svg.querySelector('#arch-data'),
                    reasoning: svg.querySelector('#arch-reasoning'),
                    connection: svg.querySelector('#arch-connection'),
                    core: svg.querySelector('#arch-core') // Le coeur est toujours un peu visible
                };
                
                // Le coeur est toujours un peu actif
                svgGroups.core.classList.add('is-active');

                steps.forEach(step => {
                    ScrollTrigger.create({
                        trigger: step,
                        start: "top center",
                        end: "bottom center",
                        onToggle: self => {
                            const stepId = step.dataset.step;
                            if (self.isActive) {
                                this.updateArchitectureVisual(stepId, svgGroups, steps, step);
                            }
                        },
                    });
                });

                // Activer le premier élément par défaut
                this.updateArchitectureVisual(steps[0].dataset.step, svgGroups, steps, steps[0]);
            });
    }

    updateArchitectureVisual(activeStepId, svgGroups, allSteps, activeStep) {
        // Mettre à jour la classe active pour le texte
        allSteps.forEach(s => {
            s.classList.toggle('is-active', s === activeStep);
        });

        // Mettre à jour l'opacité des visuels SVG
        for (const key in svgGroups) {
            if (key !== 'core') { // Ne pas désactiver le coeur
                svgGroups[key].classList.toggle('is-active', key === activeStepId);
            }
        }
    }

    /**
     * PIPELINE TIMELINE PROGRESSIVE - ScrollTrigger
     */
    initGearAnimation() {
        const pipelineSection = document.querySelector('#gear-architecture');
        if (!pipelineSection) {
            console.log('⚠️ #gear-architecture not found');
            return;
        }

        const pipelineSteps = gsap.utils.toArray('.pipeline-step');
        const progressLine = document.querySelector('.pipeline-line__progress');

        console.log(`🔧 Found ${pipelineSteps.length} pipeline steps`);

        if (pipelineSteps.length === 0) return;

        // Animer la ligne de progression
        if (progressLine) {
            gsap.to(progressLine, {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.pipeline-timeline',
                    start: 'top center',
                    end: 'bottom center',
                    scrub: 0.5
                }
            });
        }

        // Créer ScrollTrigger pour chaque step
        pipelineSteps.forEach((step, index) => {
            ScrollTrigger.create({
                trigger: step,
                start: 'top center+=100',
                end: 'bottom center-=100',
                onEnter: () => {
                    step.classList.add('is-active');
                },
                onLeave: () => {
                    step.classList.remove('is-active');
                },
                onEnterBack: () => {
                    step.classList.add('is-active');
                },
                onLeaveBack: () => {
                    step.classList.remove('is-active');
                }
            });
        });

        // Bouton de cycle : retour au début de la section
        const loopBtn = document.getElementById('restartPipeline');
        if (loopBtn) {
            loopBtn.addEventListener('click', () => {
                const section = document.getElementById('gear-architecture');
                if (section) {
                    section.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }

        console.log('⚙️ Pipeline Timeline initialized with ScrollTrigger');
    }

    setupTimelineAnimation(visualContainer) {
        const steps = gsap.utils.toArray(".timeline-step");
        const visuals = {
            step1: visualContainer.querySelector('#step1-visual'),
            step2: visualContainer.querySelector('#step2-visual'),
            step3: visualContainer.querySelector('#step3-visual')
        };

        // Cache tous les visuels sauf le premier
        gsap.set([visuals.step2, visuals.step3], { opacity: 0 });

        steps.forEach((step, i) => {
            ScrollTrigger.create({
                trigger: step,
                start: "top center+=150",
                end: "bottom center-=100",
                onEnter: () => this.updateTimelineVisual(i + 1, visuals, steps),
                onEnterBack: () => this.updateTimelineVisual(i + 1, visuals, steps)
            });
        });
    }

    updateTimelineVisual(stepIndex, visuals, steps) {
        // Met à jour la classe active pour le texte
        steps.forEach((s, i) => {
            s.classList.toggle('is-active', i + 1 === stepIndex);
        });

        // Met à jour l'opacité des visuels SVG
        gsap.to(visuals.step1, { opacity: stepIndex === 1 ? 1 : 0, duration: 0.5 });
        gsap.to(visuals.step2, { opacity: stepIndex === 2 ? 1 : 0, duration: 0.5 });
        gsap.to(visuals.step3, { opacity: stepIndex === 3 ? 1 : 0, duration: 0.5 });
    }

    /**
     * Animations d'apparition au scroll avec séquencement
     */
    initScrollAnimations() {
        // Hero animation
        gsap.fromTo('.hero-page__title', {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.2
        });

        gsap.fromTo('.hero-page__subtitle', {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.5
        });

        // Section headers avec stagger
        gsap.fromTo('.section__header', {
            y: 40,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.section__header',
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            stagger: 0.2
        });

        // Paragraphes d'intro
        gsap.fromTo(['.intro-paragraph', '.conclusion-paragraph', '.partnership-text'], {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.intro-paragraph',
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            stagger: 0.1
        });
    }

    /**
     * Interactions sophistiquées sur les cartes de philosophie
     */
    initPhilosophyCards() {
        const cards = document.querySelectorAll('.philosophy-card');

        cards.forEach((card, index) => {
            // Animation d'entrée avec stagger
            gsap.fromTo(card, {
                y: 60,
                opacity: 0,
                rotationX: 15
            }, {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.2
            });

            // Interactions au hover
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.03,
                    rotationY: index === 0 ? -3 : 3,
                    z: 50,
                    duration: 0.4,
                    ease: "power2.out"
                });

                // Animation du titre
                const title = card.querySelector('h4');
                gsap.to(title, {
                    color: '#0074D9',
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    rotationY: 0,
                    z: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });

                const title = card.querySelector('h4');
                gsap.to(title, {
                    color: 'var(--color-primary)',
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            // Effet de suivie de souris subtil
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const deltaX = (e.clientX - centerX) / (rect.width / 2);
                const deltaY = (e.clientY - centerY) / (rect.height / 2);

                gsap.to(card, {
                    rotationX: -deltaY * 5,
                    rotationY: deltaX * 5,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });
    }

    /**
     * Animations avancées pour les cartes d'étapes
     */
    initStepCards() {
        const stepCards = document.querySelectorAll('.step-card');

        stepCards.forEach((card, index) => {
            // Animation d'entrée séquencée
            gsap.fromTo(card, {
                y: 80,
                opacity: 0,
                rotationX: 20,
                scale: 0.9
            }, {
                y: 0,
                opacity: 1,
                rotationX: 0,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.15
            });

            const number = card.querySelector('.step-card__number');
            const icon = card.querySelector('.step-card__icon');
            const title = card.querySelector('.step-card__title');
            const description = card.querySelector('.step-card__description');

            // Interactions au hover avec orchestration
            card.addEventListener('mouseenter', () => {
                const tl = gsap.timeline();

                tl.to(card, {
                    scale: 1.05,
                    rotationX: 5,
                    rotationY: index % 2 === 0 ? -2 : 2,
                    z: 100,
                    duration: 0.4,
                    ease: "power2.out"
                })
                .to(number, {
                    rotationY: 360,
                    scale: 1.15,
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                    duration: 0.6,
                    ease: "back.out(1.7)"
                }, 0.1)
                .to(icon, {
                    rotation: 15,
                    scale: 1.2,
                    color: 'rgba(255, 255, 255, 0.8)',
                    duration: 0.3,
                    ease: "power2.out"
                }, 0.2)
                .to([title, description], {
                    y: -5,
                    duration: 0.3,
                    ease: "power2.out",
                    stagger: 0.1
                }, 0.1);
            });

            card.addEventListener('mouseleave', () => {
                const tl = gsap.timeline();

                tl.to(card, {
                    scale: 1,
                    rotationX: 0,
                    rotationY: 0,
                    z: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.3)"
                })
                .to(number, {
                    rotationY: 0,
                    scale: 1,
                    background: 'var(--color-primary)',
                    duration: 0.5,
                    ease: "power2.out"
                }, 0)
                .to(icon, {
                    rotation: 0,
                    scale: 1,
                    color: 'rgba(255, 255, 255, 0.3)',
                    duration: 0.4,
                    ease: "power2.out"
                }, 0.1)
                .to([title, description], {
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    stagger: 0.05
                }, 0);
            });

            // Effet de profondeur au mouvement de souris
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const deltaX = (e.clientX - centerX) / (rect.width / 2);
                const deltaY = (e.clientY - centerY) / (rect.height / 2);

                gsap.to(card, {
                    rotationX: -deltaY * 8,
                    rotationY: deltaX * 8,
                    duration: 0.3,
                    ease: "power2.out"
                });

                // Parallax subtil sur le contenu
                gsap.to([title, description], {
                    x: deltaX * 5,
                    y: deltaY * 3,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    /**
     * Effets de parallax subtils
     */
    initParallaxEffects() {
        // Parallax sur le hero
        gsap.to('.hero-page__title', {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-page",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to('.hero-page__subtitle', {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-page",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Parallax sur les backgrounds des sections
        gsap.to('.section--light', {
            backgroundPosition: "50% 100px",
            ease: "none",
            scrollTrigger: {
                trigger: ".section--light",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    /**
     * Micro-interactions et détails raffinés
     */
    initMicroInteractions() {
        // Animation des eyebrow texts
        const eyebrows = document.querySelectorAll('.eyebrow-text');
        eyebrows.forEach(eyebrow => {
            gsap.fromTo(eyebrow, {
                opacity: 0,
                y: 20,
                scale: 0.9
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: eyebrow,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animation des boutons CTA
        const ctaButtons = document.querySelectorAll('.btn--primary');
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    rotationZ: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

                // Effet de particules simulé
                gsap.to(button, {
                    boxShadow: "0 10px 30px rgba(0, 168, 255, 0.4), 0 0 20px rgba(0, 168, 255, 0.2)",
                    duration: 0.3
                });
            });

            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    rotationZ: 0,
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    duration: 0.4,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });

        // Animation des liens de navigation
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                if (!link.classList.contains('nav__link--cta')) {
                    gsap.to(link, {
                        y: -2,
                        scale: 1.05,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                }
            });

            link.addEventListener('mouseleave', () => {
                if (!link.classList.contains('nav__link--cta')) {
                    gsap.to(link, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        });
    }

    /**
     * Révélation progressive du contenu
     */
    initProgressiveReveal() {
        // Animation en chaîne des sections
        ScrollTrigger.batch('.philosophy-card, .step-card', {
            onEnter: (elements) => {
                gsap.fromTo(elements, {
                    opacity: 0,
                    y: 50,
                    rotationX: 15
                }, {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.15,
                    overwrite: 'auto'
                });
            },
            onLeave: (elements) => {
                gsap.to(elements, {
                    opacity: 0.3,
                    scale: 0.95,
                    duration: 0.3
                });
            },
            onEnterBack: (elements) => {
                gsap.to(elements, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5
                });
            }
        });

        // Compteur animé si des métriques sont présentes
        const numbers = document.querySelectorAll('[data-number]');
        numbers.forEach(numberEl => {
            const targetNumber = parseInt(numberEl.dataset.number);

            ScrollTrigger.create({
                trigger: numberEl,
                start: "top 80%",
                onEnter: () => {
                    gsap.fromTo(numberEl, {
                        textContent: 0
                    }, {
                        textContent: targetNumber,
                        duration: 2,
                        ease: "power2.out",
                        snap: { textContent: 1 },
                        onUpdate: function() {
                            numberEl.textContent = Math.floor(this.targets()[0].textContent);
                        }
                    });
                }
            });
        });
    }

    /**
     * Améliorations d'accessibilité
     */
    initAccessibility() {
        // Gestion du focus au clavier
        const interactiveElements = document.querySelectorAll('.philosophy-card, .step-card, .btn');

        interactiveElements.forEach(element => {
            element.addEventListener('focus', () => {
                gsap.to(element, {
                    scale: 1.02,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });

            element.addEventListener('blur', () => {
                gsap.to(element, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Respect des préférences de mouvement réduit
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Désactiver les animations complexes
            gsap.set('*', { clearProps: 'transform' });
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            console.log('🔇 Animations réduites pour l\'accessibilité');
        }

        // Support des hauts contrastes
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            document.documentElement.classList.add('high-contrast');
        }
    }

    /**
     * Animation 3D de la montagne vue frontale avec particules scintillantes
     */
    initApprocheMountainAnimation() {
        const svg = document.querySelector('#mountain-svg');
        if (!svg) {
            console.error('❌ SVG #mountain-svg not found');
            return;
        }

        console.log('🏔️ Initializing 3D mountain animation...');

        // Éléments SVG 3D
        const faceLeft = svg.querySelector('#face-left');
        const faceFront = svg.querySelector('#face-front');
        const faceRight = svg.querySelector('#face-right');
        const summitPeak = svg.querySelector('#summit-peak');
        const pathZigzag = svg.querySelector('#path-zigzag');
        const camp1 = svg.querySelector('#camp-1');
        const camp2 = svg.querySelector('#camp-2');
        const camp3 = svg.querySelector('#camp-3');
        const summitBadge = svg.querySelector('#summit-badge');
        const climber = svg.querySelector('#climber');
        const sparkleContainer = svg.querySelector('#sparkle-particles');

        // Vérifier les éléments
        if (!faceLeft || !faceFront || !faceRight || !summitPeak || !pathZigzag) {
            console.error('❌ Missing SVG 3D elements');
            return;
        }

        // Positionner l'alpiniste au départ du zigzag
        gsap.set(climber, {
            x: 420,
            y: 520
        });

        console.log('✅ 3D setup complete');

        // Créer particules scintillantes le long du chemin
        const createSparkles = (count) => {
            const sparkles = [];
            for (let i = 0; i < count; i++) {
                const sparkle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                sparkle.setAttribute('r', 3);
                sparkle.setAttribute('fill', '#3898FF');
                sparkle.style.opacity = '0';
                sparkleContainer.appendChild(sparkle);
                sparkles.push(sparkle);
            }
            return sparkles;
        };

        const sparkles = createSparkles(30);
        console.log('✨ Created', sparkles.length, 'sparkle particles');

        // TIMELINE PRINCIPALE
        const tl = gsap.timeline({
            delay: 0.5,
            onStart: () => console.log('▶️ 3D Animation started'),
            onComplete: () => console.log('✅ 3D Animation complete')
        });

        // 1. Construction de la montagne (faces apparaissent)
        tl.to([faceLeft, faceRight, faceFront], {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            stagger: 0.2,
            ease: 'power3.out',
            transformOrigin: 'center bottom',
            onStart: () => console.log('🏔️ Mountain faces building...')
        }, 0);

        // 2. Sommet apparaît (pyramide blanche)
        tl.to(summitPeak, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(2)',
            transformOrigin: 'center bottom',
            onStart: () => console.log('⛰️ Summit peak appears')
        }, 1.2);

        // 3. Chemin zigzag se trace
        tl.to(pathZigzag, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.inOut',
            onStart: () => console.log('🛤️ Path revealing...')
        }, 1.8);

        // 4. Camps apparaissent en 3D
        tl.to(camp1, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            transformOrigin: 'center center',
            onStart: () => console.log('🏕️ Camp 1 appears')
        }, 2.2);

        tl.to(camp2, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            transformOrigin: 'center center',
            onStart: () => console.log('🏕️ Camp 2 appears')
        }, 2.6);

        tl.to(camp3, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            transformOrigin: 'center center',
            onStart: () => console.log('🏕️ Camp 3 appears')
        }, 3.0);

        // 5. Badge de succès au sommet
        tl.to(summitBadge, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)',
            transformOrigin: 'center center',
            onStart: () => console.log('🎯 Summit badge appears!')
        }, 3.4);

        // Animation de l'alpiniste le long du zigzag (MotionPath)
        if (typeof MotionPathPlugin !== 'undefined') {
            console.log('✅ MotionPath plugin available');

            gsap.to(climber, {
                motionPath: {
                    path: pathZigzag,
                    align: pathZigzag,
                    autoRotate: false,
                    alignOrigin: [0.5, 0.5]
                },
                duration: 5,
                ease: 'power1.inOut',
                delay: 2,
                onUpdate: function() {
                    if (this.progress() > 0 && this.progress() < 1 && this.progress() % 0.2 < 0.05) {
                        console.log('🚶 Climber:', Math.round(this.progress() * 100) + '%');
                    }
                }
            });
        } else {
            console.warn('⚠️ MotionPath plugin not loaded');
        }

        // PARTICULES SCINTILLANTES le long du chemin
        sparkles.forEach((sparkle, i) => {
            gsap.to(sparkle, {
                motionPath: {
                    path: pathZigzag,
                    align: pathZigzag,
                    start: i / sparkles.length,
                    end: (i + 1) / sparkles.length,
                    alignOrigin: [0.5, 0.5]
                },
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
                duration: 2,
                repeat: -1,
                delay: 2.5 + (i * 0.06),
                ease: 'sine.inOut'
            });
        });

        console.log('✅ 3D Mountain animation initialized with sparkle particles');
    }

    /**
     * Nettoyage et optimisation
     */
    cleanup() {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.killTweensOf('*');
    }
}

/**
 * PAGE CAS-USAGE - Carousel Solutions Bento Grid
 * Gère le carousel de mockups et les interactions avec les solution cards
 */

class SolutionsCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.dots = document.querySelectorAll('.carousel-dots .dot');
        this.cards = document.querySelectorAll('.solution-card');
        this.prevBtn = document.querySelector('.carousel-btn--prev');
        this.nextBtn = document.querySelector('.carousel-btn--next');

        if (this.slides.length === 0) {
            console.log('⚠️ No carousel slides found');
            return;
        }

        this.init();
    }

    init() {
        console.log('🎬 Initializing Solutions Carousel...');

        // Afficher le premier slide
        this.showSlide(0);

        // Event listeners pour les boutons prev/next
        this.prevBtn?.addEventListener('click', () => {
            this.prev();
        });

        this.nextBtn?.addEventListener('click', () => {
            this.next();
        });

        // Event listeners pour les dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // Event listeners pour les solution cards
        this.cards.forEach((card, index) => {
            // Hover sur card → change le carousel
            card.addEventListener('mouseenter', () => {
                this.goToSlide(index);
            });

            // Click sur la zone clickable → lance la démo (reste sur place)
            const clickableZone = card.querySelector('.solution-card__clickable');
            if (clickableZone) {
                clickableZone.addEventListener('click', () => {
                    this.goToSlide(index);
                });
            }
        });

        // Event listeners pour les boutons "En savoir plus"
        document.querySelectorAll('.solution-card__learn-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Empêcher le click sur la carte
                const card = btn.closest('.solution-card');
                if (card) {
                    this.scrollToSection(card.dataset.solution);
                }
            });
        });

        console.log('✅ Solutions Carousel initialized with', this.slides.length, 'slides');
    }

    showSlide(index) {
        // Vérifier l'index
        if (index < 0 || index >= this.slides.length) {
            console.warn('Invalid slide index:', index);
            return;
        }

        // Désactiver tous les slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Désactiver tous les dots
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Désactiver toutes les cards
        this.cards.forEach(card => {
            card.classList.remove('active');
        });

        // Activer le slide, dot et card correspondants
        this.slides[index].classList.add('active');
        this.dots[index]?.classList.add('active');
        this.cards[index]?.classList.add('active');

        this.currentSlide = index;

        // Animation GSAP (fade + scale)
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(this.slides[index], {
                opacity: 0,
                scale: 0.95
            }, {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: 'power2.out'
            });
        }

        console.log(`📍 Slide ${index + 1} active`);
    }

    next() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    goToSlide(index) {
        this.showSlide(index);
    }

    scrollToSection(solutionId) {
        const targetCard = document.querySelector(`article[data-exploration="${solutionId}"]`);
        if (targetCard) {
            targetCard.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            console.log(`📍 Scrolled to ${solutionId} section`);
        }
    }

    cleanup() {
        console.log('🧹 Solutions Carousel cleaned up');
    }
}

/**
 * PAGE CAS-USAGE - Interface des explorations
 * Module pour l'affichage et l'interaction avec les cartes d'exploration
 */

class ExplorationsPage {
    constructor() {
        this.modal = null;
        this.modalContent = null;
        this.backdrop = null;
        this.closeBtn = null;
        this.init();
    }

    init() {
        // Récupérer les éléments de la modal
        this.modal = document.getElementById('articleModal');
        this.modalContent = this.modal?.querySelector('.article-modal__content');
        this.backdrop = this.modal?.querySelector('.article-modal__backdrop');
        this.closeBtn = this.modal?.querySelector('.article-modal__close');

        // Ajouter les event listeners sur les cartes
        const cards = document.querySelectorAll('.exploration-card');
        cards.forEach(card => {
            const preview = card.querySelector('.exploration-card__preview');
            preview.addEventListener('click', () => this.openModal(card));
        });

        // Gérer la fermeture de la modal
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }
        if (this.backdrop) {
            this.backdrop.addEventListener('click', () => this.closeModal());
        }

        // Fermer avec la touche Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('article-modal--open')) {
                this.closeModal();
            }
        });

        // Gérer le hash fragment dans l'URL
        this.handleHashNavigation();

        console.log('🔍 ExplorationsPage initialized with modal');
    }

    handleHashNavigation() {
        const hash = window.location.hash;
        if (hash) {
            const explorationId = hash.substring(1);
            const targetCard = document.querySelector(`article[data-exploration="${explorationId}"]`);

            if (targetCard) {
                console.log(`📍 Navigating to ${explorationId} from hash`);

                // Petit délai pour laisser la page se charger
                setTimeout(() => {
                    // Scroll vers la carte
                    targetCard.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });

                    // Ouvrir la modal automatiquement
                    setTimeout(() => {
                        this.openModal(targetCard);
                    }, 600);
                }, 300);
            }
        }
    }

    openModal(card) {
        if (!this.modal || !this.modalContent) return;

        // Récupérer le contenu de l'article
        const articleContent = card.querySelector('.exploration-card__content');
        if (!articleContent) return;

        // Copier le contenu dans la modal
        this.modalContent.innerHTML = articleContent.innerHTML;

        // Afficher la modal
        this.modal.style.display = 'flex';

        // Scroller le container de la modal vers le haut
        const modalContainer = this.modal.querySelector('.article-modal__container');
        if (modalContainer) {
            modalContainer.scrollTop = 0;
        }

        // Forcer un reflow pour que la transition fonctionne
        void this.modal.offsetWidth;

        // Ajouter la classe pour l'animation
        this.modal.classList.add('article-modal--open');

        // Bloquer le scroll du body
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        if (!this.modal) return;

        // Retirer la classe d'animation
        this.modal.classList.remove('article-modal--open');

        // Attendre la fin de la transition avant de masquer
        setTimeout(() => {
            this.modal.style.display = 'none';
            this.modalContent.innerHTML = '';
        }, 300);

        // Rétablir le scroll du body
        document.body.style.overflow = '';
    }

    /**
     * Fermeture de la modal (méthode publique pour compatibilité)
     */
    closeCurrentCard(buttonElement) {
        this.closeModal();
    }

    /**
     * Nettoyage
     */
    cleanup() {
        if (this.modal) {
            this.modal.style.display = 'none';
            this.modal.classList.remove('article-modal--open');
        }
        document.body.style.overflow = '';
    }
}

/**
 * PAGE CONTACT - JavaScript spécialisé
 * Animations et interactions pour la page de contact
 */

class ContactPage {
    constructor() {
        this.init();
    }

    init() {
        // Attendre que GSAP et ScrollTrigger soient chargés
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            setTimeout(() => this.init(), 100);
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        this.initScrollAnimations();
        this.initCalendlyIntegration();
        this.initMicroInteractions();

        console.log('📞 Page Contact initialized');
    }

    /**
     * Animations d'apparition au scroll
     */
    initScrollAnimations() {
        // Animation du fond visuel
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to('.contact-background-visual .shape1', {
            x: 100,
            y: 50,
            duration: 20,
            ease: "sine.inOut"
        });
        tl.to('.contact-background-visual .shape2', {
            x: -80,
            y: -60,
            duration: 20,
            ease: "sine.inOut"
        }, "-=20");

        // Animation d'entrée du contenu
        const introElements = [
            '.contact-intro__title',
            '.contact-intro__subtitle',
            '.contact-intro__step',
            '.contact-separator',
            '.contact-alternative'
        ];

        gsap.from(introElements, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
        });

        gsap.from('.contact-calendly', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.5
        });
    }


    /**
     * Simplified Calendly integration for new HTML structure
     */
    initCalendlyIntegration() {
        const loadCalendlyWidget = () => {
            const calendlyContainer = document.getElementById('calendly-widget-container');

            if (!calendlyContainer) {
                // Retry after 100ms if container not found
                setTimeout(loadCalendlyWidget, 100);
                return;
            }

            if (!window.Calendly) {
                // Retry after 100ms if Calendly not loaded
                setTimeout(loadCalendlyWidget, 100);
                return;
            }

            window.Calendly.initInlineWidget({
                url: 'https://calendly.com/angougeardnicolas/30min',
                parentElement: calendlyContainer,
                prefill: {},
                utm: {
                    utmCampaign: 'Nouvelle Rive Website',
                    utmSource: 'website',
                    utmMedium: 'contact_page'
                }
            });

            console.log('📅 Calendly widget loaded successfully');
        };

        // Start loading the widget
        loadCalendlyWidget();
    }

    /**
     * Micro-interactions et détails
     */
    initMicroInteractions() {
        // Animation des boutons CTA
        const ctaButtons = document.querySelectorAll('.btn--primary');
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    rotationZ: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(button, {
                    boxShadow: "0 10px 30px rgba(0, 168, 255, 0.4), 0 0 20px rgba(0, 168, 255, 0.2)",
                    duration: 0.3
                });
            });

            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    rotationZ: 0,
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    duration: 0.4,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });

        // Animation des liens de navigation
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                if (!link.classList.contains('nav__link--cta')) {
                    gsap.to(link, {
                        y: -2,
                        scale: 1.05,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                }
            });

            link.addEventListener('mouseleave', () => {
                if (!link.classList.contains('nav__link--cta')) {
                    gsap.to(link, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        });

        // Parallax subtil sur le hero
        gsap.to('.hero-contact__title', {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-contact",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to('.hero-contact__subtitle', {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-contact",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Respect des préférences de mouvement réduit
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            gsap.set('*', { clearProps: 'transform' });
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            console.log('🔇 Animations réduites pour l\'accessibilité');
        }
    }

    /**
     * Nettoyage
     */
    cleanup() {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.killTweensOf('*');
    }
}

/**
 * ============================================
 * ENTER KEY AUTOMATION HERO - HOMEPAGE
 * Concept: Appuyer sur Entrée → Branches d'automatisation qui se déploient
 * ============================================
 */
class EnterKeyHero {
    constructor() {
        this.canvas = document.getElementById('enterKeyCanvas');
        if (!this.canvas) return;

        // Configuration
        this.width = 800;
        this.height = 500;
        this.keyPosition = { x: 150, y: 250 }; // Touche à gauche
        this.iconsStartX = 580; // Icônes décalées à droite

        // Palette bleu → cyan cohérente
        this.colors = ['#60A5FA', '#93C5FD', '#A7C7E7', '#DBEAFE', '#06B6D4', '#22D3EE'];

        // Endpoints configuration (6 icônes épurées)
        this.endpoints = [
            { type: 'email', color: this.colors[0], y: 100 },
            { type: 'chart', color: this.colors[1], y: 160 },
            { type: 'document', color: this.colors[2], y: 220 },
            { type: 'briefcase', color: this.colors[3], y: 280 },
            { type: 'calendar', color: this.colors[4], y: 340 },
            { type: 'bell', color: this.colors[5], y: 400 }
        ];

        this.branches = [];

        this.init();
    }

    init() {
        this.createSVG();
        this.createEnterKey();
        this.createBranches();

        // Démarrer l'animation après un court délai
        setTimeout(() => this.startFullSequence(), 500);
    }

    /**
     * Crée le SVG de base (fond transparent)
     */
    createSVG() {
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('width', this.width);
        this.svg.setAttribute('height', this.height);
        this.svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
        // Pas de background - transparent pour hériter du container

        // Defs pour filtres et gradients
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

        // Glow filter pour particules
        const glowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        glowFilter.setAttribute('id', 'particleGlow');
        glowFilter.innerHTML = `
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        `;
        defs.appendChild(glowFilter);

        // Gradients pour les lignes
        this.colors.forEach((color, i) => {
            const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            grad.setAttribute('id', `lineGradient${i}`);
            grad.setAttribute('x1', '0%');
            grad.setAttribute('y1', '0%');
            grad.setAttribute('x2', '100%');
            grad.setAttribute('y2', '0%');
            grad.innerHTML = `
                <stop offset="0%" style="stop-color:${color};stop-opacity:0.3"/>
                <stop offset="50%" style="stop-color:${color};stop-opacity:0.8"/>
                <stop offset="100%" style="stop-color:${color};stop-opacity:0.3"/>
            `;
            defs.appendChild(grad);
        });

        this.svg.appendChild(defs);

        // Groupes pour les layers
        this.branchesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.svg.appendChild(this.branchesGroup);

        this.particlesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.svg.appendChild(this.particlesGroup);

        this.keyGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.svg.appendChild(this.keyGroup);

        this.endpointsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.svg.appendChild(this.endpointsGroup);

        this.canvas.appendChild(this.svg);
    }

    /**
     * Crée le robot (remplace la touche ENTER)
     */
    createEnterKey() {
        const robotG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        robotG.setAttribute('transform', `translate(${this.keyPosition.x}, ${this.keyPosition.y})`);
        robotG.classList.add('enter-key');

        // Glow background (pour animation)
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glow.setAttribute('r', '0');
        glow.setAttribute('fill', 'rgba(96, 165, 250, 0.4)');
        glow.setAttribute('opacity', '0');
        robotG.appendChild(glow);
        this.glowCircle = glow;

        // Robot
        const robot = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        robot.classList.add('robot');

        // Tête
        const head = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        head.setAttribute('cx', '0');
        head.setAttribute('cy', '-10');
        head.setAttribute('r', '30');
        head.setAttribute('fill', 'none');
        head.setAttribute('stroke', '#3898FF');
        head.setAttribute('stroke-width', '2.5');
        robot.appendChild(head);

        // Antenne gauche
        const antennaL = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        antennaL.setAttribute('x1', '-15');
        antennaL.setAttribute('y1', '-40');
        antennaL.setAttribute('x2', '-15');
        antennaL.setAttribute('y2', '-55');
        antennaL.setAttribute('stroke', '#00BBFF');
        antennaL.setAttribute('stroke-width', '2');
        robot.appendChild(antennaL);

        const antennaLightL = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        antennaLightL.setAttribute('cx', '-15');
        antennaLightL.setAttribute('cy', '-55');
        antennaLightL.setAttribute('r', '4');
        antennaLightL.setAttribute('fill', '#00BBFF');
        robot.appendChild(antennaLightL);

        // Antenne droite
        const antennaR = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        antennaR.setAttribute('x1', '15');
        antennaR.setAttribute('y1', '-40');
        antennaR.setAttribute('x2', '15');
        antennaR.setAttribute('y2', '-55');
        antennaR.setAttribute('stroke', '#00BBFF');
        antennaR.setAttribute('stroke-width', '2');
        robot.appendChild(antennaR);

        const antennaLightR = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        antennaLightR.setAttribute('cx', '15');
        antennaLightR.setAttribute('cy', '-55');
        antennaLightR.setAttribute('r', '4');
        antennaLightR.setAttribute('fill', '#00BBFF');
        robot.appendChild(antennaLightR);

        // Yeux
        const eyeL = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        eyeL.setAttribute('cx', '-10');
        eyeL.setAttribute('cy', '-15');
        eyeL.setAttribute('r', '5');
        eyeL.setAttribute('fill', '#3898FF');
        robot.appendChild(eyeL);

        const eyeR = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        eyeR.setAttribute('cx', '10');
        eyeR.setAttribute('cy', '-15');
        eyeR.setAttribute('r', '5');
        eyeR.setAttribute('fill', '#3898FF');
        robot.appendChild(eyeR);

        // Sourire
        const smile = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        smile.setAttribute('d', 'M -15 0 Q 0 7 15 0');
        smile.setAttribute('stroke', '#00BBFF');
        smile.setAttribute('stroke-width', '2');
        smile.setAttribute('fill', 'none');
        robot.appendChild(smile);

        // Corps
        const body = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        body.setAttribute('x', '-30');
        body.setAttribute('y', '25');
        body.setAttribute('width', '60');
        body.setAttribute('height', '70');
        body.setAttribute('rx', '8');
        body.setAttribute('fill', 'none');
        body.setAttribute('stroke', '#3898FF');
        body.setAttribute('stroke-width', '2.5');
        robot.appendChild(body);

        // Panneau de contrôle
        const panel = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        panel.setAttribute('x', '-15');
        panel.setAttribute('y', '45');
        panel.setAttribute('width', '30');
        panel.setAttribute('height', '20');
        panel.setAttribute('rx', '3');
        panel.setAttribute('fill', 'rgba(56, 152, 255, 0.1)');
        panel.setAttribute('stroke', '#00BBFF');
        panel.setAttribute('stroke-width', '1');
        robot.appendChild(panel);

        // Lines du panneau
        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.setAttribute('x1', '-12');
        line1.setAttribute('y1', '50');
        line1.setAttribute('x2', '12');
        line1.setAttribute('y2', '50');
        line1.setAttribute('stroke', '#00BBFF');
        line1.setAttribute('stroke-width', '1');
        robot.appendChild(line1);

        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line2.setAttribute('x1', '-12');
        line2.setAttribute('y1', '55');
        line2.setAttribute('x2', '7');
        line2.setAttribute('y2', '55');
        line2.setAttribute('stroke', '#00BBFF');
        line2.setAttribute('stroke-width', '1');
        robot.appendChild(line2);

        const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line3.setAttribute('x1', '-12');
        line3.setAttribute('y1', '60');
        line3.setAttribute('x2', '10');
        line3.setAttribute('y2', '60');
        line3.setAttribute('stroke', '#00BBFF');
        line3.setAttribute('stroke-width', '1');
        robot.appendChild(line3);

        // Bras gauche
        const armL = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        armL.setAttribute('x1', '-30');
        armL.setAttribute('y1', '35');
        armL.setAttribute('x2', '-55');
        armL.setAttribute('y2', '60');
        armL.setAttribute('stroke', '#3898FF');
        armL.setAttribute('stroke-width', '2.5');
        robot.appendChild(armL);

        const handL = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        handL.setAttribute('cx', '-55');
        handL.setAttribute('cy', '60');
        handL.setAttribute('r', '6');
        handL.setAttribute('fill', 'none');
        handL.setAttribute('stroke', '#00BBFF');
        handL.setAttribute('stroke-width', '2');
        robot.appendChild(handL);

        // Bras droit
        const armR = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        armR.setAttribute('x1', '30');
        armR.setAttribute('y1', '35');
        armR.setAttribute('x2', '55');
        armR.setAttribute('y2', '60');
        armR.setAttribute('stroke', '#3898FF');
        armR.setAttribute('stroke-width', '2.5');
        robot.appendChild(armR);

        const handR = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        handR.setAttribute('cx', '55');
        handR.setAttribute('cy', '60');
        handR.setAttribute('r', '6');
        handR.setAttribute('fill', 'none');
        handR.setAttribute('stroke', '#00BBFF');
        handR.setAttribute('stroke-width', '2');
        robot.appendChild(handR);

        robotG.appendChild(robot);
        this.keyGroup.appendChild(robotG);
        this.enterKeyElement = robotG;
        this.robotElement = robot;
    }

    /**
     * Crée toutes les branches et endpoints
     */
    createBranches() {
        this.endpoints.forEach((endpoint, index) => {
            const branch = this.createBranch(endpoint, index);
            this.branches.push(branch);
        });
    }

    /**
     * Crée une branche avec ligne parallèle puis divergente
     */
    createBranch(endpointConfig, index) {
        const startX = this.keyPosition.x + 60; // Départ à droite du robot
        const startY = this.keyPosition.y;

        // Phase 1: Ligne horizontale parallèle (150px vers la droite)
        const parallelDistance = 150;
        const parallelEndX = startX + parallelDistance;
        const parallelEndY = startY;

        // Phase 2: Divergence vers l'icône
        const endX = this.iconsStartX;
        const endY = endpointConfig.y;

        // Créer le path avec deux phases
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const pathD = `M ${startX} ${startY} L ${parallelEndX} ${parallelEndY} Q ${(parallelEndX + endX) / 2} ${(parallelEndY + endY) / 2} ${endX} ${endY}`;
        path.setAttribute('d', pathD);
        path.setAttribute('stroke', endpointConfig.color);
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        path.classList.add('branch-line');
        path.setAttribute('opacity', '0');

        this.branchesGroup.appendChild(path);

        // Créer l'icône endpoint (épurée, sans texte)
        const icon = this.createSimpleIcon(endpointConfig);

        return {
            path: path,
            pathD: pathD,
            icon: icon,
            config: endpointConfig,
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY
        };
    }

    /**
     * Crée une icône SVG épurée (pas de texte, juste le pictogramme)
     */
    createSimpleIcon(config) {
        const iconG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        iconG.setAttribute('transform', `translate(${(config.x || this.iconsStartX) + 24}, ${config.y})`);
        iconG.setAttribute('opacity', '0');
        iconG.classList.add('endpoint-icon');

        // Créer le SVG path selon le type
        const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        iconPath.setAttribute('stroke', config.color);
        iconPath.setAttribute('stroke-width', '2');
        iconPath.setAttribute('fill', 'none');
        iconPath.setAttribute('stroke-linecap', 'round');
        iconPath.setAttribute('stroke-linejoin', 'round');

        switch(config.type) {
            case 'email':
                iconPath.innerHTML = `
                    <rect x="-24" y="-16" width="48" height="32" rx="4"/>
                    <path d="M -24,-16 L 0,4 L 24,-16"/>
                `;
                break;
            case 'chart':
                iconPath.innerHTML = `
                    <path d="M -24,16 L -24,-16 L 24,-16 L 24,16"/>
                    <path d="M -16,8 L -8,-4 L 4,4 L 16,-8"/>
                `;
                break;
            case 'document':
                iconPath.innerHTML = `
                    <path d="M -16,-20 L -16,20 L 16,20 L 16,-8 L 4,-20 Z"/>
                    <path d="M 4,-20 L 4,-8 L 16,-8"/>
                    <line x1="-8" y1="0" x2="8" y2="0"/>
                    <line x1="-8" y1="8" x2="8" y2="8"/>
                `;
                break;
            case 'briefcase':
                iconPath.innerHTML = `
                    <rect x="-20" y="-8" width="40" height="24" rx="4"/>
                    <path d="M -8,-8 L -8,-16 L 8,-16 L 8,-8"/>
                `;
                break;
            case 'calendar':
                iconPath.innerHTML = `
                    <rect x="-20" y="-16" width="40" height="32" rx="4"/>
                    <line x1="-20" y1="-4" x2="20" y2="-4"/>
                    <line x1="-12" y1="-24" x2="-12" y2="-16"/>
                    <line x1="12" y1="-24" x2="12" y2="-16"/>
                `;
                break;
            case 'bell':
                iconPath.innerHTML = `
                    <path d="M -12,8 C -12,-4 -4,-12 0,-16 C 4,-12 12,-4 12,8"/>
                    <path d="M -16,8 L 16,8"/>
                    <path d="M -4,16 C -4,16 0,20 4,16"/>
                `;
                break;
        }

        iconG.appendChild(iconPath);
        this.endpointsGroup.appendChild(iconG);

        return { element: iconG, path: iconPath };
    }

    /**
     * Crée des particules lumineuses qui voyagent sur les lignes
     */
    createDataParticles(branch, delay = 0) {
        const particleCount = 3;

        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                particle.setAttribute('r', '4');
                particle.setAttribute('fill', branch.config.color);
                particle.setAttribute('filter', 'url(#particleGlow)');
                particle.setAttribute('opacity', '0');

                this.particlesGroup.appendChild(particle);

                // Animer la particule le long du path
                gsap.timeline()
                    .to(particle, {
                        opacity: 1,
                        duration: 0.2,
                        ease: 'power2.out'
                    })
                    .to(particle, {
                        motionPath: {
                            path: branch.path,
                            align: branch.path,
                            alignOrigin: [0.5, 0.5]
                        },
                        duration: 1.5,
                        ease: 'none'
                    }, 0.2)
                    .to(particle, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.in'
                    }, '-=0.3')
                    .call(() => particle.remove());
            }, delay + i * 300);
        }
    }

    /**
     * Animation complète: touche → lignes → particules → icônes
     */
    startFullSequence() {
        const masterTL = gsap.timeline({
            repeat: -1,
            repeatDelay: 0.3
        });

        // 1. Glow de la touche (0.3s)
        masterTL.to(this.glowCircle, {
            r: 60,
            opacity: 0.5,
            duration: 0.3,
            ease: 'power2.out'
        });

        // 2. Les lignes se tracent (0.8s)
        this.branches.forEach((branch, index) => {
            masterTL.to(branch.path, {
                opacity: 1,
                strokeDashoffset: 0,
                duration: 0.8,
                ease: 'power2.out'
            }, 0.3 + index * 0.08);
        });

        // 3. Les particules lumineuses partent (1.5s)
        this.branches.forEach((branch, index) => {
            masterTL.call(() => {
                this.createDataParticles(branch);
            }, null, 1.0 + index * 0.1);
        });

        // 4. Les icônes apparaissent (0.4s)
        this.branches.forEach((branch, index) => {
            masterTL.to(branch.icon.element, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'back.out(1.5)'
            }, 1.8 + index * 0.08);
        });

        // 5. Pulse des icônes (effet "completed")
        this.branches.forEach((branch, index) => {
            masterTL.to(branch.icon.path, {
                strokeWidth: 3,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            }, 2.6 + index * 0.05);
        });

        // 6. Pause (0.5s)
        masterTL.to({}, { duration: 0.5 });

        // 7. Tout disparaît (0.6s)
        masterTL.to([
            ...this.branches.map(b => b.path),
            ...this.branches.map(b => b.icon.element),
            this.glowCircle
        ], {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.in'
        });

        return masterTL;
    }
}

/**
 * ============================================
 * NEURAL NETWORK HERO - FONDATIONS PAGE
 * ============================================
 */
class NeuralNetworkHero {
    constructor() {
        this.canvas = document.getElementById('neuralCanvas');
        if (!this.canvas) return;

        this.nodes = [];
        this.connections = [];
        this.particles = [];
        this.svg = null;

        // Configuration
        this.config = {
            nodeCount: window.innerWidth > 768 ? 30 : 15,
            nodeRadius: 6,
            connectionDistance: 200,
            particleSpeed: 2,
            particleCount: 20
        };

        this.init();
    }

    init() {
        this.createSVG();
        this.generateNodes();
        this.generateConnections();
        this.animateEntrance();
        this.startParticleAnimation();
        this.setupInteractions();
    }

    createSVG() {
        const width = this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;

        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('width', width);
        this.svg.setAttribute('height', height);
        this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

        // Groupe pour les connexions
        this.connectionsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.connectionsGroup.setAttribute('class', 'connections-group');
        this.svg.appendChild(this.connectionsGroup);

        // Groupe pour les nœuds
        this.nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.nodesGroup.setAttribute('class', 'nodes-group');
        this.svg.appendChild(this.nodesGroup);

        // Groupe pour les particules
        this.particlesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.particlesGroup.setAttribute('class', 'particles-group');
        this.svg.appendChild(this.particlesGroup);

        this.canvas.appendChild(this.svg);
    }

    generateNodes() {
        const width = this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;
        const margin = 50;

        for (let i = 0; i < this.config.nodeCount; i++) {
            // Position initiale aléatoire (chaos)
            const startX = Math.random() * width;
            const startY = Math.random() * height;

            // Position finale en grille organisée
            const cols = Math.ceil(Math.sqrt(this.config.nodeCount));
            const rows = Math.ceil(this.config.nodeCount / cols);
            const col = i % cols;
            const row = Math.floor(i / cols);

            const endX = margin + (col / (cols - 1)) * (width - 2 * margin);
            const endY = margin + (row / (rows - 1)) * (height - 2 * margin);

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('class', 'neural-node');
            circle.setAttribute('cx', startX);
            circle.setAttribute('cy', startY);
            circle.setAttribute('r', this.config.nodeRadius);
            circle.setAttribute('opacity', '0');

            this.nodesGroup.appendChild(circle);

            this.nodes.push({
                element: circle,
                x: startX,
                y: startY,
                targetX: endX,
                targetY: endY,
                connections: []
            });
        }
    }

    generateConnections() {
        // Créer des connexions entre nœuds proches
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[j].targetX - this.nodes[i].targetX;
                const dy = this.nodes[j].targetY - this.nodes[i].targetY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.connectionDistance) {
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('class', 'neural-connection');
                    line.setAttribute('x1', this.nodes[i].x);
                    line.setAttribute('y1', this.nodes[i].y);
                    line.setAttribute('x2', this.nodes[j].x);
                    line.setAttribute('y2', this.nodes[j].y);
                    line.setAttribute('opacity', '0');

                    this.connectionsGroup.appendChild(line);

                    const connection = {
                        element: line,
                        from: i,
                        to: j
                    };

                    this.connections.push(connection);
                    this.nodes[i].connections.push(connection);
                    this.nodes[j].connections.push(connection);
                }
            }
        }
    }

    animateEntrance() {
        if (typeof gsap === 'undefined') return;

        const tl = gsap.timeline();

        // 1. Apparition des nœuds (chaos)
        tl.to(this.nodes.map(n => n.element), {
            opacity: 1,
            duration: 0.5,
            stagger: 0.02
        });

        // 2. Réorganisation en structure ordonnée
        this.nodes.forEach((node, i) => {
            tl.to(node.element, {
                attr: {
                    cx: node.targetX,
                    cy: node.targetY
                },
                duration: 1.5,
                ease: 'power2.inOut',
                onUpdate: () => {
                    node.x = parseFloat(node.element.getAttribute('cx'));
                    node.y = parseFloat(node.element.getAttribute('cy'));
                }
            }, '-=1.4');
        });

        // 3. Apparition des connexions
        tl.to(this.connections.map(c => c.element), {
            opacity: 1,
            duration: 0.3,
            stagger: 0.02,
            onStart: () => {
                this.connections.forEach(conn => {
                    conn.element.setAttribute('x1', this.nodes[conn.from].targetX);
                    conn.element.setAttribute('y1', this.nodes[conn.from].targetY);
                    conn.element.setAttribute('x2', this.nodes[conn.to].targetX);
                    conn.element.setAttribute('y2', this.nodes[conn.to].targetY);
                });
            }
        }, '-=0.5');

        // 4. Activer quelques nœuds aléatoirement
        tl.call(() => {
            this.activateRandomNodes();
        });
    }

    activateRandomNodes() {
        const activeCount = Math.floor(this.nodes.length * 0.15);
        const indices = [];

        while (indices.length < activeCount) {
            const idx = Math.floor(Math.random() * this.nodes.length);
            if (!indices.includes(idx)) {
                indices.push(idx);
                this.nodes[idx].element.classList.add('active');
            }
        }

        // Changer les nœuds actifs toutes les 3 secondes
        setInterval(() => {
            this.nodes.forEach(n => n.element.classList.remove('active'));
            this.activateRandomNodes();
        }, 3000);
    }

    startParticleAnimation() {
        if (this.connections.length === 0) return;

        // Créer des particules qui circulent
        for (let i = 0; i < this.config.particleCount; i++) {
            const connection = this.connections[Math.floor(Math.random() * this.connections.length)];
            const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            particle.setAttribute('class', 'neural-particle');
            particle.setAttribute('r', '2');
            particle.setAttribute('opacity', '0');

            this.particlesGroup.appendChild(particle);

            this.animateParticle(particle, connection, i * 0.5);
        }
    }

    animateParticle(particle, connection, delay) {
        if (typeof gsap === 'undefined') return;

        const from = this.nodes[connection.from];
        const to = this.nodes[connection.to];

        gsap.set(particle, {
            attr: { cx: from.targetX, cy: from.targetY }
        });

        gsap.to(particle, {
            attr: { cx: to.targetX, cy: to.targetY },
            opacity: 1,
            duration: 2,
            delay: delay,
            ease: 'none',
            onComplete: () => {
                // Choisir une nouvelle connexion aléatoire
                const newConnection = this.connections[Math.floor(Math.random() * this.connections.length)];
                this.animateParticle(particle, newConnection, 0);
            }
        });
    }

    setupInteractions() {
        this.nodes.forEach((node, i) => {
            node.element.addEventListener('mouseenter', () => {
                node.element.classList.add('active');
                node.connections.forEach(conn => {
                    conn.element.classList.add('active');
                });
            });

            node.element.addEventListener('mouseleave', () => {
                node.element.classList.remove('active');
                node.connections.forEach(conn => {
                    conn.element.classList.remove('active');
                });
            });
        });
    }
}

// Initialisation intelligente par page
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser le bouton retour en haut sur toutes les pages
    initBackToTop();

    // Initialiser le menu mobile sur toutes les pages
    initMobileMenu();

    const path = document.location.pathname;
    console.log('📍 Current path:', path);

    if (path.includes('/approche')) {
        new ApprochePage();
    } else if (path.includes('/Fondations')) {
        // Initialiser le réseau neuronal du hero
        if (document.querySelector('.hero-fondations-neural')) {
            new NeuralNetworkHero();
        }
        new ApprochePage();
    } else if (path.includes('/cas-usage')) {
        // Initialiser le carousel Bento Grid
        if (document.querySelector('.hero-solutions-bento')) {
            window.solutionsCarousel = new SolutionsCarousel();
        }
        // Initialiser les cartes d'explorations
        window.explorationsPage = new ExplorationsPage();
    } else if (path.includes('/contact')) {
        new ContactPage();
    } else {
        // Si aucune autre page ne correspond, nous sommes sur l'accueil
        new NouvelleRive();

        // Initialiser l'animation Enter Key du hero
        if (document.getElementById('enterKeyCanvas')) {
            new EnterKeyHero();
        }

        // Initialiser la section Assistants Glass Morphism
        initAssistantsGlassSection();
    }
});

// Export pour tests ou utilisation externe
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NouvelleRive, ApprochePage, ExplorationsPage, ContactPage };
}
