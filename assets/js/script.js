/**
 * Nineetiestudio - Amazing Creative JavaScript
 * Custom Cursor, Magnetic Effects, Tilt, Parallax, Smooth Animations
 */

document.addEventListener('DOMContentLoaded', () => {

    // === 1. CUSTOM CURSOR ===
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth cursor follow
    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Cursor hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, .service-card, .package-card, .masonry-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    // === 2. NAVBAR SCROLL EFFECT ===
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
        if (window.scrollY > 80) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // === 3. MOBILE MENU ===
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const bars = menuToggle.querySelectorAll('.menu-bar');
        if (navLinks.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // === 4. SCROLL REVEAL ANIMATIONS ===
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // === 5. IMAGE REVEAL EFFECT ===
    const imgRevealElements = document.querySelectorAll('.img-reveal');

    const imgRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, 200);
            }
        });
    }, { threshold: 0.3 });

    imgRevealElements.forEach(el => imgRevealObserver.observe(el));

    // === 6. MAGNETIC BUTTON EFFECT ===
    const magneticButtons = document.querySelectorAll('.btn, .social-link');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // === 7. 3D TILT CARD EFFECT ===
    const tiltCards = document.querySelectorAll('.service-card, .package-card, .card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // === 8. PARALLAX HERO BACKGROUND ===
    const heroBg = document.querySelector('.hero-bg');

    window.addEventListener('scroll', () => {
        if (heroBg && window.innerWidth > 768) {
            const scrolled = window.pageYOffset;
            heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
        }
    });

    // Mouse parallax on hero
    const hero = document.querySelector('.hero');
    hero?.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768 && heroBg) {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            heroBg.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
        }
    });

    // === 9. COUNTER ANIMATION ===
    const counters = document.querySelectorAll('.stat-number');
    let counterAnimated = false;

    const animateCounter = (el) => {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                el.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target + '+';
            }
        };
        updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                counterAnimated = true;
                counters.forEach(counter => animateCounter(counter));
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // === 10. TEXT SCRAMBLE EFFECT ===
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }

        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise(resolve => this.resolve = resolve);
            this.queue = [];

            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 20);
                const end = start + Math.floor(Math.random() * 20);
                this.queue.push({ from, to, start, end });
            }

            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }

        update() {
            let output = '';
            let complete = 0;

            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];

                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.chars[Math.floor(Math.random() * this.chars.length)];
                        this.queue[i].char = char;
                    }
                    output += `<span style="color: var(--gold)">${char}</span>`;
                } else {
                    output += from;
                }
            }

            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
    }

    // Apply to elements with data-scramble
    document.querySelectorAll('[data-scramble]').forEach(el => {
        const fx = new TextScramble(el);
        const originalText = el.textContent;

        el.addEventListener('mouseenter', () => fx.setText(originalText));
    });

    // === 11. SMOOTH SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // === 12. PORTFOLIO FILTER ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.masonry-item, .gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            portfolioItems.forEach((item, index) => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.transition = `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`;
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                    item.style.display = 'block';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // === 13. LIGHTBOX ===
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    document.querySelectorAll('.masonry-item, .gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img')?.src;
            if (imgSrc && lightbox && lightboxImg) {
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeLightbox = () => {
        lightbox?.classList.remove('active');
        document.body.style.overflow = '';
    };

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // === 14. TAB SWITCHING (Pricelist) ===
    window.showTab = function (type) {
        const fotoSection = document.getElementById('paket-foto');
        const videoSection = document.getElementById('paket-video');
        const tabs = document.querySelectorAll('.tab-btn');

        tabs.forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');

        if (type === 'video') {
            if (fotoSection) fotoSection.style.display = 'none';
            if (videoSection) videoSection.style.display = 'grid';
        } else {
            if (fotoSection) fotoSection.style.display = 'grid';
            if (videoSection) videoSection.style.display = 'none';
        }
    };

    // === 15. GALLERY FILTER ===
    window.filterGallery = function (category) {
        const items = document.querySelectorAll('.gallery-item');
        const tabs = document.querySelectorAll('.filter-btn');

        tabs.forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');

        items.forEach((item, index) => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.transition = `opacity 0.3s ease ${index * 0.05}s`;
                item.style.opacity = '1';
                item.style.display = 'block';
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    };

    // === 16. FORM SUBMISSION (Contact) ===
    const bookingForm = document.getElementById('booking-form');
    bookingForm?.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        let message = `Halo Nineetiestudio! 📸%0A%0A`;
        message += `Saya ingin melakukan booking jasa fotografi.%0A%0A`;
        message += `*=== DATA BOOKING ===%0A`;

        formData.forEach((value, key) => {
            if (value) message += `*${key}:* ${value}%0A`;
        });

        message += `%0AMohon informasi ketersediaan jadwal dan detail lebih lanjut.%0ATerima kasih! 🙏`;

        window.open(`https://wa.me/6285175200452?text=${message}`, '_blank');
    });

    // === 17. LOADING ANIMATION ===
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');

        // Trigger reveal animations after load
        setTimeout(() => {
            document.querySelectorAll('.reveal').forEach((el, index) => {
                setTimeout(() => el.classList.add('active'), index * 100);
            });
        }, 300);
    });

});
