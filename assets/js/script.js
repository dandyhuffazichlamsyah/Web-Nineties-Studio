/**
 * Nineetiestudio — Deterministic Client Engine
 * Handles Navigation, Price Calculator, Gallery Lightbox, and WhatsApp Dispatcher
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================================================
    // 1. NAVBAR SCROLL EFFECT
    // ==========================================================================
    const navbar = document.querySelector('.navbar');
    const updateNavbar = () => {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    // ==========================================================================
    // 2. MOBILE MENU DRAWER
    // ==========================================================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // ==========================================================================
    // 3. INTERACTIVE PRICING TABS & CALCULATOR (pricelist.html)
    // ==========================================================================
    const tabButtons = document.querySelectorAll('.pricing-tab-btn');
    const tabContents = document.querySelectorAll('.pricing-group');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetGroup = btn.getAttribute('data-tab');
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabContents.forEach(group => {
                if (group.id === targetGroup) {
                    group.style.display = 'grid';
                } else {
                    group.style.display = 'none';
                }
            });
        });
    });

    // --- Dynamic Price Calculator ---
    const calcPackageSelect = document.getElementById('calc-package');
    const calcAddonCheckboxes = document.querySelectorAll('.calc-checkbox');
    const calcTotalDisplay = document.getElementById('calc-total-val');
    const calcWhatsappBtn = document.getElementById('calc-wa-btn');

    const updateCalculator = () => {
        if (!calcPackageSelect || !calcTotalDisplay) return;

        const selectedOption = calcPackageSelect.options[calcPackageSelect.selectedIndex];
        const basePrice = parseInt(selectedOption.getAttribute('data-price') || '0', 10);
        const packageName = selectedOption.text;

        let addonsTotal = 0;
        const selectedAddonNames = [];

        calcAddonCheckboxes.forEach(cb => {
            const parentItem = cb.closest('.calc-addon-item');
            if (cb.checked) {
                if (parentItem) parentItem.classList.add('selected');
                const price = parseInt(cb.getAttribute('data-price') || '0', 10);
                addonsTotal += price;
                selectedAddonNames.push(cb.getAttribute('data-name'));
            } else {
                if (parentItem) parentItem.classList.remove('selected');
            }
        });

        const grandTotal = basePrice + addonsTotal;
        calcTotalDisplay.textContent = 'Rp' + grandTotal.toLocaleString('id-ID');

        // Formulate WhatsApp Deep Link
        if (calcWhatsappBtn) {
            const addonsText = selectedAddonNames.length > 0 ? selectedAddonNames.join(', ') : 'Tanpa Add-on';
            const message = `Halo Nineetiestudio! ✨\n\nSaya ingin konsultasi estimasi paket custom berikut:\n• *Paket Dasar:* ${packageName}\n• *Add-on Pilihan:* ${addonsText}\n• *Estimasi Total:* Rp${grandTotal.toLocaleString('id-ID')}\n\nMohon info ketersediaan jadwal dan booking detail. Terima kasih!`;
            calcWhatsappBtn.href = `https://wa.me/6285175200452?text=${encodeURIComponent(message)}`;
        }
    };

    if (calcPackageSelect) {
        calcPackageSelect.addEventListener('change', updateCalculator);
        calcAddonCheckboxes.forEach(cb => cb.addEventListener('change', updateCalculator));
        updateCalculator();
    }

    // ==========================================================================
    // 4. FILTERABLE PORTFOLIO GALLERY & LIGHTBOX (gallery.html & index.html)
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- Fullscreen Lightbox Modal ---
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentGalleryIndex = 0;
    const activeGalleryList = [];

    const openLightbox = (index) => {
        if (!lightbox || !lightboxImg) return;
        currentGalleryIndex = index;
        const item = activeGalleryList[currentGalleryIndex];
        if (!item) return;

        const imgEl = item.querySelector('img');
        const titleEl = item.querySelector('.gallery-card-title');
        const tagEl = item.querySelector('.gallery-tag');

        lightboxImg.src = imgEl.src;
        lightboxImg.alt = imgEl.alt;
        if (lightboxCaption) {
            lightboxCaption.innerHTML = `<strong>${titleEl ? titleEl.textContent : ''}</strong> ${tagEl ? `— ${tagEl.textContent}` : ''}`;
        }

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    galleryItems.forEach(item => {
        activeGalleryList.push(item);
        const index = activeGalleryList.length - 1;
        item.addEventListener('click', () => openLightbox(index));
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            currentGalleryIndex = (currentGalleryIndex - 1 + activeGalleryList.length) % activeGalleryList.length;
            openLightbox(currentGalleryIndex);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            currentGalleryIndex = (currentGalleryIndex + 1) % activeGalleryList.length;
            openLightbox(currentGalleryIndex);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
        if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
    });

    // ==========================================================================
    // 5. DETERMINISTIC BOOKING FORM DISPATCHER (contact.html)
    // ==========================================================================
    const bookingForm = document.getElementById('booking-inquiry-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('client-name');
            const phoneInput = document.getElementById('client-phone');
            const eventTypeSelect = document.getElementById('event-type');
            const dateInput = document.getElementById('event-date');
            const venueInput = document.getElementById('event-venue');
            const packageSelect = document.getElementById('selected-package');
            const notesInput = document.getElementById('client-notes');

            // Fail-fast field validation
            if (!nameInput.value.trim() || !phoneInput.value.trim()) {
                alert('Silakan isi Nama dan Nomor WhatsApp Anda.');
                return;
            }

            const clientName = nameInput.value.trim();
            const clientPhone = phoneInput.value.trim();
            const eventType = eventTypeSelect ? eventTypeSelect.value : 'Dokumentasi';
            const eventDate = dateInput && dateInput.value ? dateInput.value : 'Akan dikonfirmasi';
            const eventVenue = venueInput && venueInput.value.trim() ? venueInput.value.trim() : 'Akan dikonfirmasi';
            const packageName = packageSelect ? packageSelect.options[packageSelect.selectedIndex].text : 'Konsultasi';
            const notes = notesInput && notesInput.value.trim() ? notesInput.value.trim() : '-';

            const message = `Halo Nineetiestudio! ✨\n\nSaya ingin melakukan reservasi sesi dokumentasi dengan rincian berikut:\n\n• *Nama:* ${clientName}\n• *Nomor WhatsApp:* ${clientPhone}\n• *Jenis Acara:* ${eventType}\n• *Tanggal Acara:* ${eventDate}\n• *Lokasi/Venue:* ${eventVenue}\n• *Paket Pilihan:* ${packageName}\n• *Catatan Tambahan:* ${notes}\n\nMohon konfirmasi ketersediaan jadwal pada tanggal tersebut. Terima kasih!`;

            const waUrl = `https://wa.me/6285175200452?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank', 'noopener,noreferrer');
        });
    }

    // ==========================================================================
    // 6. ACCORDION (terms.html & FAQ)
    // ==========================================================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            if (item) {
                const isActive = item.classList.contains('active');
                // Close siblings if desired or toggle
                item.classList.toggle('active', !isActive);
            }
        });
    });
});
