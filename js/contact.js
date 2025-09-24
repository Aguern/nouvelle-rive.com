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
        this.initBenefitCards();
        this.initCalendlyIntegration();
        this.initMicroInteractions();

        console.log('📞 Page Contact initialized');
    }

    /**
     * Animations d'apparition au scroll
     */
    initScrollAnimations() {
        // Hero animation
        gsap.fromTo('.hero-contact__title', {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.2
        });

        gsap.fromTo('.hero-contact__subtitle', {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.5
        });

        // Section headers
        gsap.fromTo('.section__title', {
            y: 40,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.section__title',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    }

    /**
     * Animations sophistiquées pour les cartes de bénéfices
     */
    initBenefitCards() {
        const benefitCards = document.querySelectorAll('.benefit-card');

        benefitCards.forEach((card, index) => {
            // Animation d'entrée avec stagger
            gsap.fromTo(card, {
                y: 60,
                opacity: 0,
                rotationX: 15,
                scale: 0.9
            }, {
                y: 0,
                opacity: 1,
                rotationX: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.2
            });

            const icon = card.querySelector('.benefit-card__icon');
            const title = card.querySelector('.benefit-card__title');
            const description = card.querySelector('.benefit-card__description');

            // Interactions au hover
            card.addEventListener('mouseenter', () => {
                const tl = gsap.timeline();

                tl.to(card, {
                    scale: 1.03,
                    rotationY: index % 2 === 0 ? -2 : 2,
                    z: 50,
                    duration: 0.4,
                    ease: "power2.out"
                })
                .to(icon, {
                    rotationY: 360,
                    scale: 1.15,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                }, 0.1)
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
                    rotationY: 0,
                    z: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.3)"
                })
                .to(icon, {
                    rotationY: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                }, 0)
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
                    x: deltaX * 3,
                    y: deltaY * 2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    /**
     * Intégration Calendly avec transition fluide (repris du main.js)
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
                    utmMedium: 'contact_page'
                }
            });

            calendlyLoaded = true;
            console.log('📅 Calendly widget loaded on contact page');
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

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    new ContactPage();
});

// Nettoyage à la navigation
window.addEventListener('beforeunload', () => {
    if (window.contactPage) {
        window.contactPage.cleanup();
    }
});

// Export pour utilisation externe
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactPage;
}