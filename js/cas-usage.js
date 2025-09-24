/**
 * EXPLORATIONS INTERACTIVES - JavaScript avancé
 * Système d'accordion pour cartes d'explorations dépliables
 */

class ExplorationsPage {
    constructor() {
        this.activeCard = null;
        this.isAnimating = false;
        this.init();
    }

    init() {
        console.log('🔍 Initialisation des explorations...');

        // Initialiser les cartes d'exploration immédiatement
        this.initExplorationCards();

        // Attendre que GSAP soit chargé pour les animations
        if (typeof gsap !== 'undefined') {
            // Enregistrer ScrollTrigger s'il est disponible
            if (typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);
                this.initScrollAnimations();
                this.initMicroInteractions();
            }
        }

        console.log('🔍 Explorations interactives initialized');
    }

    /**
     * Animations d'apparition au scroll
     */
    initScrollAnimations() {
        // Hero animation
        gsap.fromTo('.hero-page__title', {
            y: 60,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.3
        });

        gsap.fromTo('.hero-page__subtitle', {
            y: 40,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            delay: 0.6
        });

        // Cards animation avec stagger
        const explorationCards = document.querySelectorAll('.exploration-card');
        explorationCards.forEach((card, index) => {
            gsap.fromTo(card, {
                y: 60,
                opacity: 0,
                scale: 0.95
            }, {
                y: 0,
                opacity: 1,
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
        });
    }

    /**
     * Système d'accordion pour les cartes d'exploration
     */
    initExplorationCards() {
        const explorationCards = document.querySelectorAll('.exploration-card');
        console.log(`Found ${explorationCards.length} exploration cards`);

        explorationCards.forEach(card => {
            const cta = card.querySelector('.exploration-card__cta');
            const preview = card.querySelector('.exploration-card__preview');
            const content = card.querySelector('.exploration-card__content');

            if (!cta || !preview || !content) {
                console.error('Missing elements in card:', card);
                return;
            }

            console.log('Adding event listeners to card:', card.dataset.exploration);

            // Event listeners
            cta.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('CTA clicked for:', card.dataset.exploration);
                this.toggleCard(card);
            });

            // Click sur la preview pour toggle (sauf sur le CTA)
            preview.addEventListener('click', (e) => {
                if (!e.target.closest('.exploration-card__cta')) {
                    console.log('Preview clicked for:', card.dataset.exploration);
                    this.toggleCard(card);
                }
            });

            // Interactions hover seulement si GSAP est disponible
            if (typeof gsap !== 'undefined') {
                card.addEventListener('mouseenter', () => this.onCardHover(card));
                card.addEventListener('mouseleave', () => this.onCardLeave(card));
            }
        });

        // Support clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeCard) {
                this.closeCard(this.activeCard);
            }
        });
    }

    /**
     * Toggle une carte d'exploration
     */
    async toggleCard(card) {
        if (this.isAnimating) return;

        const isExpanded = card.classList.contains('exploration-card--expanded');

        if (isExpanded) {
            await this.closeCard(card);
        } else {
            // Fermer la carte active si elle existe
            if (this.activeCard && this.activeCard !== card) {
                await this.closeCard(this.activeCard);
            }
            await this.openCard(card);
        }
    }

    /**
     * Ouvrir une carte d'exploration
     */
    async openCard(card) {
        if (this.isAnimating) return;

        console.log('Opening card:', card.dataset.exploration);
        this.isAnimating = true;
        this.activeCard = card;

        const content = card.querySelector('.exploration-card__content');
        const cta = card.querySelector('.exploration-card__cta');
        const preview = card.querySelector('.exploration-card__preview');

        // Marquer comme expanded
        card.classList.add('exploration-card--expanded');
        card.classList.add('exploration-card--loading');

        // Révéler le contenu
        content.style.display = 'block';

        // Si GSAP est disponible, utiliser les animations
        if (typeof gsap !== 'undefined') {
            // Animation du CTA
            gsap.to(cta, {
                scale: 0.95,
                opacity: 0.7,
                duration: 0.3,
                ease: "power2.out"
            });

            // Animation d'ouverture
            const timeline = gsap.timeline({
                onComplete: () => {
                    this.isAnimating = false;
                    card.classList.remove('exploration-card--loading');
                    this.animateContent(card);
                }
            });

            timeline
                .fromTo(content, {
                    height: 0,
                    opacity: 0
                }, {
                    height: 'auto',
                    opacity: 1,
                    duration: 0.6,
                    ease: "power3.out"
                })
                .to(preview, {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    duration: 0.3
                }, 0);
        } else {
            // Fallback sans GSAP
            content.style.opacity = '1';
            content.style.height = 'auto';
            preview.style.borderBottomLeftRadius = '0';
            preview.style.borderBottomRightRadius = '0';

            this.isAnimating = false;
            card.classList.remove('exploration-card--loading');
        }

        // Changer le texte du CTA
        const originalText = cta.textContent;
        cta.dataset.originalText = originalText;
        cta.textContent = 'Masquer';

        // Scroll vers la carte après animation
        setTimeout(() => {
            this.scrollToCard(card);
        }, 200);
    }

    /**
     * Fermer la carte actuelle depuis un bouton
     */
    closeCurrentCard(button) {
        const card = button.closest('.exploration-card');
        if (card && card.classList.contains('exploration-card--expanded')) {
            this.closeCard(card);
        }
    }

    /**
     * Fermer une carte d'exploration
     */
    async closeCard(card) {
        if (this.isAnimating) return;

        console.log('Closing card:', card.dataset.exploration);
        this.isAnimating = true;

        const content = card.querySelector('.exploration-card__content');
        const cta = card.querySelector('.exploration-card__cta');
        const preview = card.querySelector('.exploration-card__preview');

        // Si GSAP est disponible, utiliser les animations
        if (typeof gsap !== 'undefined') {
            // Animation de fermeture
            const timeline = gsap.timeline({
                onComplete: () => {
                    content.style.display = 'none';
                    card.classList.remove('exploration-card--expanded');
                    this.activeCard = null;
                    this.isAnimating = false;
                }
            });

            timeline
                .to(content, {
                    height: 0,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.inOut"
                })
                .to(preview, {
                    borderBottomLeftRadius: 'var(--radius-lg)',
                    borderBottomRightRadius: 'var(--radius-lg)',
                    duration: 0.3
                }, 0)
                .to(cta, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
        } else {
            // Fallback sans GSAP
            content.style.display = 'none';
            content.style.opacity = '0';
            content.style.height = '0';
            preview.style.borderBottomLeftRadius = 'var(--radius-lg)';
            preview.style.borderBottomRightRadius = 'var(--radius-lg)';
            card.classList.remove('exploration-card--expanded');
            this.activeCard = null;
            this.isAnimating = false;
        }

        // Restaurer le texte du CTA
        if (cta.dataset.originalText) {
            cta.textContent = cta.dataset.originalText;
        }
    }

    /**
     * Scroll vers la carte ouverte
     */
    scrollToCard(card) {
        // Utiliser scrollIntoView si scrollTo n'est pas disponible
        if (typeof ScrollToPlugin !== 'undefined' && gsap.plugins.scrollTo) {
            gsap.to(window, {
                scrollTo: {
                    y: card,
                    offsetY: 100
                },
                duration: 0.8,
                ease: "power2.inOut"
            });
        } else {
            // Fallback avec scrollIntoView natif
            const rect = card.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetY = rect.top + scrollTop - 100;

            window.scrollTo({
                top: targetY,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Animation progressive du contenu révélé
     */
    animateContent(card) {
        if (typeof gsap === 'undefined') return;

        const content = card.querySelector('.exploration-card__content');
        const elements = content.querySelectorAll('h3, p, ul, ol, .workflow-highlight, .call-to-action-box');

        // Animation en cascade des éléments
        gsap.fromTo(elements, {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.3
        });

        // Animation spéciale pour les workflow highlights
        const workflows = content.querySelectorAll('.workflow-highlight');
        workflows.forEach(workflow => {
            const items = workflow.querySelectorAll('ol li');
            gsap.fromTo(items, {
                x: 20,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.8
            });
        });

        // Animation des CTA boxes
        const ctaBoxes = content.querySelectorAll('.call-to-action-box');
        ctaBoxes.forEach(box => {
            gsap.fromTo(box, {
                scale: 0.95,
                rotationX: 10
            }, {
                scale: 1,
                rotationX: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
                delay: 1
            });
        });
    }

    /**
     * Interactions hover sur les cartes
     */
    onCardHover(card) {
        if (typeof gsap === 'undefined') return;
        if (card.classList.contains('exploration-card--expanded')) return;

        const timeline = gsap.timeline();

        timeline
            .to(card, {
                scale: 1.02,
                rotationY: 1,
                z: 20,
                duration: 0.4,
                ease: "power2.out"
            })
            .to(card.querySelector('.exploration-card__badge'), {
                scale: 1.05,
                duration: 0.3,
                ease: "back.out(1.7)"
            }, 0.1)
            .to(card.querySelector('.exploration-card__title'), {
                x: 5,
                duration: 0.3,
                ease: "power2.out"
            }, 0.1);
    }

    /**
     * Fin du hover sur les cartes
     */
    onCardLeave(card) {
        if (typeof gsap === 'undefined') return;
        if (card.classList.contains('exploration-card--expanded')) return;

        const timeline = gsap.timeline();

        timeline
            .to(card, {
                scale: 1,
                rotationY: 0,
                z: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)"
            })
            .to([
                card.querySelector('.exploration-card__badge'),
                card.querySelector('.exploration-card__title')
            ], {
                scale: 1,
                x: 0,
                duration: 0.4,
                ease: "power2.out"
            }, 0);
    }

    /**
     * Micro-interactions et détails
     */
    initMicroInteractions() {
        // Animation des liens CTA dans le contenu
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
                    boxShadow: "0 15px 35px rgba(0, 168, 255, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)",
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

        // Parallax subtil sur le hero dark
        gsap.to('.hero-page--dark .hero-page__title', {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-page--dark",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to('.hero-page--dark .hero-page__subtitle', {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-page--dark",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Animations des éléments strong au hover
        const strongElements = document.querySelectorAll('.article-content strong');
        strongElements.forEach(strong => {
            strong.style.cursor = 'default';
            strong.addEventListener('mouseenter', () => {
                gsap.to(strong, {
                    scale: 1.05,
                    color: 'var(--color-accent)',
                    duration: 0.2,
                    ease: "power2.out"
                });
            });

            strong.addEventListener('mouseleave', () => {
                gsap.to(strong, {
                    scale: 1,
                    color: 'var(--color-primary)',
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
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

        // Fermer toute carte ouverte
        if (this.activeCard) {
            const content = this.activeCard.querySelector('.exploration-card__content');
            content.style.display = 'none';
            this.activeCard.classList.remove('exploration-card--expanded');
            this.activeCard = null;
        }
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    window.explorationsPage = new ExplorationsPage();
});

// Nettoyage à la navigation
window.addEventListener('beforeunload', () => {
    if (window.explorationsPage) {
        window.explorationsPage.cleanup();
    }
});

// Export pour utilisation externe
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExplorationsPage;
}