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

        console.log('🎯 Page Approche initialized');
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

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    new ApprochePage();
});

// Nettoyage à la navigation
window.addEventListener('beforeunload', () => {
    if (window.approchePage) {
        window.approchePage.cleanup();
    }
});

// Export pour utilisation externe
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ApprochePage;
}