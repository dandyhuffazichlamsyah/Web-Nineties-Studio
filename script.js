document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }));

    // Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-section');
    // Add hidden classes initially via JS to ensure graceful degradation if JS fails
    hiddenElements.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });
});
