// script.js - Restored Dark Teal Version

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate Hamburger
            const bars = document.querySelectorAll('.menu-bar');
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
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 58, 58, 0.95)';
            navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(26, 58, 58, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 3. Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-section');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden-section').forEach((el) => observer.observe(el));

    // 4. Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        }
    });

    // 5. Category Tabs (for Price List and Gallery)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const categoryLinks = document.querySelectorAll('.category-link');

    // Handle specific page interactions if elements exist
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Show content (Mock functionality since content structure depends on HTML)
                const target = btn.textContent.toLowerCase().includes('video') ? 'video' : 'foto';
                showPackageCategory(target);
            });
        });
    }

    function showPackageCategory(type) {
        const photoSection = document.getElementById('paket-foto');
        const videoSection = document.getElementById('paket-video');

        if (photoSection && videoSection) {
            if (type === 'video') {
                photoSection.style.display = 'none';
                videoSection.style.display = 'grid';
            } else {
                photoSection.style.display = 'grid';
                videoSection.style.display = 'none';
            }
        }
    }
});
