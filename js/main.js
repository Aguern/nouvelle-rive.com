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
        this.initScrollAnimations();
        this.initApproachTimeline();
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

        let isTransparent = true;

        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            onUpdate: (self) => {
                if (self.direction === 1 && isTransparent) {
                    // Scrolling down - show solid header
                    header.classList.remove('header--transparent');
                    isTransparent = false;
                } else if (self.direction === -1 && !isTransparent && self.scroll() < 80) {
                    // Scrolling up and near top - show transparent header
                    header.classList.add('header--transparent');
                    isTransparent = true;
                }
            }
        });

        // Set initial state
        header.classList.add('header--transparent');
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
     * Animations d'apparition au scroll avec Intersection Observer
     */
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;

                    // Add appropriate animation class based on element
                    if (element.classList.contains('challenge-card')) {
                        element.classList.add('animate-fade-up');
                    } else if (element.classList.contains('solution-card')) {
                        element.classList.add('animate-slide-left');
                    } else if (element.classList.contains('value-card')) {
                        element.classList.add('animate-scale-in');
                    } else {
                        element.classList.add('animate-fade-in');
                    }

                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animatableElements = document.querySelectorAll(`
            .challenge-card,
            .solution-card,
            .value-card,
            .section__header,
            .hero__content
        `);

        animatableElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    /**
     * Timeline interactive de la section "Notre Approche"
     */
    initApproachTimeline() {
        const timelineSteps = document.querySelectorAll('.timeline__step');
        const visualIllustrations = document.querySelectorAll('.visual__illustration');
        const timelineLine = document.querySelector('.timeline__line');

        if (!timelineSteps.length || !visualIllustrations.length) return;

        // Function to activate a specific step
        const activateStep = (stepNumber) => {
            // Reset all steps and illustrations
            timelineSteps.forEach(step => step.classList.remove('active'));
            visualIllustrations.forEach(visual => visual.classList.remove('active'));

            // Activate current step and illustration
            const currentStep = document.querySelector(`[data-step="${stepNumber}"]`);
            const currentVisual = document.querySelector(`.visual__illustration[data-step="${stepNumber}"]`);

            if (currentStep) currentStep.classList.add('active');
            if (currentVisual) currentVisual.classList.add('active');

            // Animate timeline progress line
            if (timelineLine) {
                const progress = (stepNumber - 1) / (timelineSteps.length - 1) * 100;
                gsap.to(timelineLine, {
                    '--line-progress': `${progress}%`,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }
        };

        // Animate timeline line based on scroll progress
        ScrollTrigger.create({
            trigger: ".timeline",
            start: "top center",
            end: "bottom center",
            scrub: true,
            onUpdate: (self) => {
                if (timelineLine) {
                    const progress = self.progress * 100;
                    timelineLine.style.setProperty('--line-progress', `${progress}%`);
                }
            }
        });

        // Create scroll triggers for each timeline step with staggered animations
        timelineSteps.forEach((step, index) => {
            const stepNumber = index + 1;

            // Animate step entrance
            gsap.fromTo(step, {
                x: -50,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: step,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            ScrollTrigger.create({
                trigger: step,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => activateStep(stepNumber),
                onEnterBack: () => activateStep(stepNumber)
            });
        });

        // Activate first step by default
        activateStep(1);

        // Add particle effect for active step
        timelineSteps.forEach((step, index) => {
            step.addEventListener('mouseenter', () => {
                gsap.to(step.querySelector('.timeline__marker'), {
                    scale: 1.2,
                    rotation: 360,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                });
            });

            step.addEventListener('mouseleave', () => {
                gsap.to(step.querySelector('.timeline__marker'), {
                    scale: 1,
                    rotation: 0,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                });
            });
        });
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

        // Animation d'icônes au hover
        const icons = document.querySelectorAll('.icon');
        icons.forEach(icon => {
            const iconParent = icon.closest('.challenge-card__icon, .timeline__marker');
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

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    new NouvelleRive();
});

// Export pour tests ou utilisation externe
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NouvelleRive;
}