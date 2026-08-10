const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const backToTop = document.getElementById('back-to-top');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const galleryItems = document.querySelectorAll('.gallery-item');
const cursorPaw = document.getElementById('cursor-paw');
const cursorRing = document.getElementById('cursor-ring');

document.addEventListener('DOMContentLoaded', function() {
    /* Custom cat paw cursor */
    if (cursorPaw && cursorRing) {
        let mouseX = 0, mouseY = 0;
        let pawX = 0, pawY = 0;
        let ringX = 0, ringY = 0;
        const pawLerp = 0.2;
        const ringLerp = 0.1;
        const hoverable = 'a, button, .cta-button, .gallery-item, .social-link, .back-to-top, .lightbox-close, .contact-value, .contact-item, input, textarea, .nav-link, [tabindex]';

        function handleMouseMove(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            const target = e.target;
            if (target.closest(hoverable)) {
                cursorRing.classList.add('hover');
                cursorPaw.classList.add('hover');
            } else {
                cursorRing.classList.remove('hover');
                cursorPaw.classList.remove('hover');
            }

            if (target.tagName === 'A' || target.closest('a')) {
                cursorPaw.classList.add('link');
                cursorRing.classList.add('hover');
            } else {
                cursorPaw.classList.remove('link');
            }
        }

        function animateCursor() {
            pawX += (mouseX - pawX) * pawLerp;
            pawY += (mouseY - pawY) * pawLerp;

            ringX += (pawX - ringX) * ringLerp;
            ringY += (pawY - ringY) * ringLerp;

            cursorPaw.style.left = pawX + 'px';
            cursorPaw.style.top = pawY + 'px';
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';

            requestAnimationFrame(animateCursor);
        }

        document.addEventListener('mousemove', handleMouseMove);
        animateCursor();
    }
    /* Navbar scroll effect */
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
    });

    /* Smooth scrolling for anchor links */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    /* Mobile menu toggle */
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    /* Back to top button */
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* Gallery lightbox */
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            lightboxImg.src = imgSrc;
            lightboxImg.alt = imgAlt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    /* Gallery items fade in on scroll */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const galleryObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                galleryObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const gallerySections = document.querySelectorAll('.gallery-section');
    gallerySections.forEach(section => {
        galleryObserver.observe(section);
    });

    galleryItems.forEach(item => {
        galleryObserver.observe(item);
    });
});

