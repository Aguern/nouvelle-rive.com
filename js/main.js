/**
 * NOUVELLE RIVE - JavaScript principal
 * Architecture moderne et performante
 */

class NouvelleRive {
    constructor() {
        this.init();
    }

    init() {
        // Enregistrement des plugins GSAP
        gsap.registerPlugin(ScrollTrigger);

        // Initialisation des modules
        this.initHeader();
        this.initMobileMenu();
        this.initStaggeredAnimations();
        this.initApproachPreviewAnimation();
        this.initCalendlyIntegration();
        this.initSmoothScrolling();
        this.initHeroVideo();
        this.initHeroParallax();
        this.initValueCardsTilt();
        this.initMicroInteractions();
        this.initArtisanalCardAnimation();

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
     * Menu mobile avec animations fluides
     */
    initMobileMenu() {
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

        this.initScrollAnimations();
        this.initPhilosophyCards();
        this.initStepCards();
        this.initParallaxEffects();
        this.initMicroInteractions();
        this.initProgressiveReveal();
        this.initAccessibility();
        this.initInteractiveTimeline();

        console.log('🎯 Page Approche initialized');
    }

    /**
     * Gère la timeline interactive de la page Approche.
     */
    initInteractiveTimeline() {
        const timelineContainer = document.querySelector('.interactive-timeline');
        if (!timelineContainer) return; // N'exécute le code que sur la bonne page

        // Charge le SVG et l'insère dans le conteneur
        const visualContainer = document.querySelector('.timeline-visual__sticky-container');
        fetch('../assets/svg/timeline-animation.svg')
            .then(response => response.text())
            .then(data => {
                visualContainer.innerHTML = data;
                this.setupTimelineAnimation(visualContainer);
            });
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
                start: "top center",
                end: "bottom center",
                onEnter: () => this.updateTimelineVisual(i + 1, visuals, steps),
                onEnterBack: () => this.updateTimelineVisual(i + 1, visuals, steps),
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
     * Nettoyage et optimisation
     */
    cleanup() {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.killTweensOf('*');
    }
}

/**
 * PAGE CAS-USAGE - Interface des explorations
 * Module pour l'affichage et l'interaction avec les cartes d'exploration
 */

class ExplorationsPage {
    constructor() {
        this.activeCard = null;
        this.isAnimating = false;
        this.init();
    }

    init() {
        const cards = document.querySelectorAll('.exploration-card');
        cards.forEach(card => {
            const preview = card.querySelector('.exploration-card__preview');
            preview.addEventListener('click', () => this.toggleCard(card));
        });

        console.log('🔍 ExplorationsPage initialized');
    }

    toggleCard(card) {
        if (this.isAnimating) return;

        const isOpening = !card.classList.contains('is-expanded');

        // Fermer la carte déjà ouverte s'il y en a une
        if (this.activeCard && this.activeCard !== card) {
            this.closeCard(this.activeCard);
        }

        if (isOpening) {
            this.openCard(card);
        } else {
            this.closeCard(card);
        }
    }

    openCard(card) {
        this.isAnimating = true;
        this.activeCard = card;
        card.classList.add('is-expanded');

        const content = card.querySelector('.exploration-card__content');
        content.style.display = 'block';

        gsap.fromTo(content,
            { height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 },
            {
                height: 'auto',
                opacity: 1,
                paddingTop: 'var(--space-2xl)',
                paddingBottom: 'var(--space-2xl)',
                duration: 0.6,
                ease: 'power3.out',
                onComplete: () => {
                    this.isAnimating = false;
                    ScrollTrigger.refresh(); // Met à jour les positions pour le scroll
                }
            }
        );
    }

    closeCard(card) {
        this.isAnimating = true;
        card.classList.remove('is-expanded');

        const content = card.querySelector('.exploration-card__content');

        gsap.to(content,
            {
                height: 0,
                opacity: 0,
                paddingTop: 0,
                paddingBottom: 0,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {
                    content.style.display = 'none';
                    this.isAnimating = false;
                    if (this.activeCard === card) {
                        this.activeCard = null;
                    }
                }
            }
        );
    }

    /**
     * Fermeture de la carte courante (méthode publique pour les boutons)
     */
    closeCurrentCard(buttonElement) {
        const card = buttonElement.closest('.exploration-card');
        if (card) {
            this.closeCard(card);
        }
    }

    /**
     * Nettoyage des animations
     */
    cleanup() {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.killTweensOf('*');
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

// Initialisation intelligente par page
document.addEventListener('DOMContentLoaded', () => {
    const path = document.location.pathname;

    if (path.includes('/approche')) {
        new ApprochePage();
    } else if (path.includes('/cas-usage')) {
        window.explorationsPage = new ExplorationsPage();
    } else if (path.includes('/contact')) {
        new ContactPage();
    } else {
        // Si aucune autre page ne correspond, nous sommes sur l'accueil
        new NouvelleRive();
    }
});

// Export pour tests ou utilisation externe
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NouvelleRive, ApprochePage, ExplorationsPage, ContactPage };
}
