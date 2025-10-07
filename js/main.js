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

        // Animer Étape 3 : Dashboard live monitoring
        const dashboardFrame = document.querySelector('#step3-visual .dashboard-frame');
        const dashboardTitle = document.querySelector('#step3-visual .dashboard-title');
        const dashboardTitleText = document.querySelector('#step3-visual .dashboard-title-text');
        const liveDots = document.querySelectorAll('#step3-visual .live-dot');
        const gaugeBackgrounds = document.querySelectorAll('#step3-visual .gauge-bg');
        const gaugeProgressCircles = document.querySelectorAll('#step3-visual .gauge-progress');
        const gaugeValues = document.querySelectorAll('#step3-visual .gauge-value');
        const gaugeLabels = document.querySelectorAll('#step3-visual .gauge-label');
        const barLabels = document.querySelectorAll('#step3-visual .bar-label');
        const barFills = document.querySelectorAll('#step3-visual .bar-fill');
        const successCircle = document.querySelector('#step3-visual .success-circle');
        const successCheckmark = document.querySelector('#step3-visual .success-checkmark');
        const successRays = document.querySelectorAll('#step3-visual .success-ray');

        // 1. Cadre du dashboard se dessine (boot up)
        if (dashboardFrame) {
            gsap.to(dashboardFrame, {
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

        // 2. Titre se remplit (typing effect)
        if (dashboardTitle) {
            gsap.to(dashboardTitle, {
                attr: { width: 120 },
                duration: 0.6,
                delay: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        // 2b. Texte "Tableau de bord" apparaît
        if (dashboardTitleText) {
            gsap.to(dashboardTitleText, {
                opacity: 1,
                duration: 0.4,
                delay: 1.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        // 3. Indicateurs LIVE clignotent
        liveDots.forEach((dot, index) => {
            gsap.to(dot, {
                opacity: 1,
                duration: 0.5,
                delay: 1.2 + (index * 0.15),
                yoyo: true,
                repeat: -1,
                repeatDelay: 0.3,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 4. Labels des gauges apparaissent
        gaugeLabels.forEach((label, index) => {
            gsap.to(label, {
                opacity: 1,
                duration: 0.3,
                delay: 1.5 + (index * 0.1),
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 5. Backgrounds des gauges pulsent (calibration)
        gaugeBackgrounds.forEach((bg, index) => {
            gsap.to(bg, {
                opacity: 0.5,
                duration: 0.5,
                delay: 1.5 + (index * 0.3),
                yoyo: true,
                repeat: 2,
                ease: 'sine.inOut',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 6. Gauges se remplissent + compteur numérique
        gaugeProgressCircles.forEach((gauge, index) => {
            const targetValue = index === 0 ? 85 : 92;

            // Gauge progress
            gsap.to(gauge, {
                strokeDashoffset: 55,
                duration: 1.5,
                delay: 2 + (index * 0.3),
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });

            // Counter animation
            if (gaugeValues[index]) {
                gsap.to({ val: 0 }, {
                    val: targetValue,
                    duration: 1.5,
                    delay: 2 + (index * 0.3),
                    ease: 'power2.out',
                    onUpdate: function() {
                        gaugeValues[index].textContent = Math.round(this.targets()[0].val) + '%';
                    },
                    scrollTrigger: {
                        trigger: '.timeline-step[data-step="3"]',
                        start: 'top center',
                        toggleActions: 'play none none reverse'
                    }
                });
            }
        });

        // 7. Labels des barres apparaissent
        barLabels.forEach((label, index) => {
            gsap.to(label, {
                opacity: 1,
                duration: 0.3,
                delay: 3 + (index * 0.2),
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 8. Barres se remplissent avec overshoot
        barFills.forEach((bar, index) => {
            const targetWidth = 240 * (0.8 + index * 0.1);
            gsap.to(bar, {
                attr: { width: targetWidth },
                duration: 1.2,
                delay: 3.2 + (index * 0.3),
                ease: 'back.out(1.2)',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 9. Rayons lumineux du succès
        successRays.forEach((ray, index) => {
            gsap.to(ray, {
                opacity: 0.8,
                duration: 0.3,
                delay: 4.5 + (index * 0.05),
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });

            // Fade out rapide
            gsap.to(ray, {
                opacity: 0,
                duration: 0.5,
                delay: 4.8 + (index * 0.05),
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 10. Badge succès avec bounce
        if (successCircle) {
            gsap.fromTo(successCircle, {
                opacity: 0,
                scale: 0
            }, {
                opacity: 1,
                scale: 0.85,
                duration: 0.6,
                delay: 4.5,
                ease: 'back.out(2)',
                scrollTrigger: {
                    trigger: '.timeline-step[data-step="3"]',
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        // 11. Checkmark se dessine
        if (successCheckmark) {
            gsap.to(successCheckmark, {
                strokeDashoffset: 0,
                duration: 0.5,
                delay: 4.7,
                ease: 'power2.out',
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
 
