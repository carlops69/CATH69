/**
 * Portfolio JavaScript
 * carlops69 - Web, FiveM & Discord Bots
 */

(function() {
    'use strict';

    /* ===== PRELOADER ===== */
    const preloader = document.getElementById('preloader');
    const progressBar = document.querySelector('.preloader-progress');

    if (preloader && progressBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            if (progress >= 100) {
                progress = 100;
                progressBar.style.width = '100%';
                clearInterval(interval);
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }, 300);
            }
            progressBar.style.width = progress + '%';
        }, 30);
    }

    /* ===== TYPING EFFECT ===== */
    const typingText = document.getElementById('typingText');
    const typingWords = ['desarrollador', 'programador', 'creador', 'innovador'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 500;

    function type() {
        if (!typingText) return;
        const currentWord = typingWords[wordIndex];
        let displayText = '';

        if (isDeleting) {
            displayText = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            displayText = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 150;
        }

        typingText.textContent = displayText;
        typingText.classList.add('typing-cursor');

        if (!isDeleting && charIndex === currentWord.length) {
            typingDelay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % typingWords.length;
            typingDelay = 500;
        }

        setTimeout(type, typingDelay);
    }

    /* ===== COUNTER ANIMATION ===== */
    const statNums = document.querySelectorAll('.stat-num');

    function animateCounter(el, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const hasPlus = el.textContent.includes('+');

        function update() {
            start += increment;
            if (start >= target) {
                el.textContent = hasPlus ? target + '+' : target;
            } else {
                el.textContent = hasPlus ? Math.floor(start) + '+' : Math.floor(start);
                requestAnimationFrame(update);
            }
        }
        update();
    }

    function startCounterAnimation() {
        statNums.forEach(el => {
            const target = parseInt(el.dataset.target);
            if (!isNaN(target)) {
                animateCounter(el, target);
            }
        });
    }

    /* ===== NAVBAR SCROLL ===== */
    let lastScrollY = window.scrollY;
    const navbar = document.getElementById('navbar');

    function handleScrollNav() {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    /* ===== BACK TO TOP ===== */
    const backToTop = document.getElementById('backToTop');

    function toggleBackToTop() {
        if (!backToTop) return;
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /* ===== FILTER BUTTONS ===== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    function filterProjects(filter) {
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.classList.add('hidden');
            }
        });
    }

    function initFilters() {
        if (!filterBtns.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                filterProjects(filter);

                window.dispatchEvent(new CustomEvent('projectsFiltered', { detail: { filter } }));
            });
        });
    }

    /* ===== SCROLL ANIMATIONS ===== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeElements = [];
    const elementsToObserve = document.querySelectorAll(
        '.service-card, .project-card, .skill-category, .contact-method, .contact-btn, .section-header'
    );

    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeElements.push(el);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    /* ===== NAVBAR MOBILE TOGGLE ===== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    function toggleMobileMenu() {
        if (!navToggle || !navMenu) return;
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    /* ===== NAV LINK ACTIVE ===== */
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!sections.length || !navLinks.length) return;

        let currentSection = 'inicio';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    /* ===== CONTACT BUTTONS ANIMATION ===== */
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ===== CUSTOM CURSOR ===== */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const cursorHoverable = 'a, button, .btn, .filter-btn, .project-link, .social-link, .back-to-top, .nav-link, .contact-btn-link, .project-card, .service-card, .skill-category, input, textarea, [tabindex]';

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    const dotLerp = 0.2;
    const ringLerp = 0.1;

    function handleMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const target = e.target;
        if (target.closest(cursorHoverable)) {
            cursorRing.classList.add('hover');
        } else {
            cursorRing.classList.remove('hover');
        }

        if (target.tagName === 'A' || target.closest('a')) {
            cursorRing.classList.add('link');
        } else {
            cursorRing.classList.remove('link');
        }
    }

    function animateCursor() {
        if (!cursorDot || !cursorRing) return;

        dotX += (mouseX - dotX) * dotLerp;
        dotY += (mouseY - dotY) * dotLerp;

        ringX += (dotX - ringX) * ringLerp;
        ringY += (dotY - ringY) * ringLerp;

        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';

        requestAnimationFrame(animateCursor);
    }

    function initCursor() {
        if (!cursorDot || !cursorRing) return;
        document.addEventListener('mousemove', handleMouseMove);
        animateCursor();
    }

    /* ===== INIT ===== */
    function init() {
        /* Start typing effect */
        if (typingText) {
            setTimeout(type, 1000);
        }

        /* Start counter animation when hero is visible */
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounterAnimation();
                    heroObserver.unobserve(entry.target);
                }
            });
        });
        if (document.getElementById('inicio')) {
            heroObserver.observe(document.getElementById('inicio'));
        }

        /* Scroll events */
        window.addEventListener('scroll', () => {
            handleScrollNav();
            toggleBackToTop();
            setActiveNavLink();
        });

        /* Mobile menu toggle */
        if (navToggle) {
            navToggle.addEventListener('click', toggleMobileMenu);
        }

        /* Back to top click */
        if (backToTop) {
            backToTop.addEventListener('click', scrollToTop);
        }

        /* Filter buttons */
        initFilters();

        /* Custom cursor */
        initCursor();

        /* Close mobile menu on link click */
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ===== EXPORTS FOR DEBUGGING ===== */
    window.portfolio = {
        filterProjects,
        scrollToTop,
        toggleMobileMenu
    };
})();
