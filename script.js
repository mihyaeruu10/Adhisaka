/**
 * SAKA APPRECIATION WEBSITE - JavaScript
 * Multi-page Logic & Easter Eggs
 */

// =============================================
// DOM ELEMENTS
// =============================================
const elements = {
    // Shared / Entrance
    letsSeeBtn: document.getElementById('lets-see-btn'),
    transitionOverlay: document.getElementById('transition-overlay'),

    // Easter Egg Elements (Might be null depending on page)
    sakaClick: document.getElementById('saka-click'),
    modalOverlay: document.getElementById('modal-overlay'),
    modalText: document.getElementById('modal-text'),
    modalClose: document.getElementById('modal-close'),
    kepitingOverlay: document.getElementById('kepiting-overlay'),
    finalOverlay: document.getElementById('final-overlay'),
    specialQuote: document.getElementById('special-quote'),
    specialQuoteText: document.getElementById('special-quote-text'),
    secretDot: document.getElementById('secret-dot'),
    finalEasterEgg: document.getElementById('final-easter-egg'),
    mainContent: document.getElementById('main-content'),

    finalTexts: [
        document.getElementById('final-text-1'),
        document.getElementById('final-text-2'),
        document.getElementById('final-text-3')
    ].filter(el => el !== null),

    // Flappy Saka (Index Page)
    flappySaka: document.getElementById('flappy-saka'),
    apshText: document.getElementById('apsh-text')
};

// =============================================
// FLAPPY SAKA LOGIC (Index Page)
// =============================================
if (elements.flappySaka && elements.apshText) {
    elements.flappySaka.addEventListener('click', () => {
        elements.apshText.classList.add('visible');

        // Hide after 1.5s
        setTimeout(() => {
            elements.apshText.classList.remove('visible');
        }, 1500);
    });
}

// =============================================
// NAVBAR LOGIC
// =============================================
const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');
const navbarLinks = document.querySelectorAll('.navbar-link');

// Hamburger toggle (Mobile)
if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });

    // Auto-close menu when link is clicked (Mobile)
    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
        });
    });
}

// Scroll Spy - Highlight active section
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100; // Offset for navbar

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navbarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Update active link on scroll
if (navbarLinks.length > 0) {
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

// Flying Food Click Handlers
document.querySelectorAll('.food-item').forEach(food => {
    food.addEventListener('click', (e) => {
        const textElement = e.target.parentElement.querySelector('.food-text');
        if (textElement) {
            textElement.classList.add('visible');

            setTimeout(() => {
                textElement.classList.remove('visible');
            }, 1800);
        }
    });
});

// =============================================
// NAVIGATION LOGIC (Index Page)
// =============================================
if (elements.letsSeeBtn) {
    elements.letsSeeBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // 1. Activate Overlay
        if (elements.transitionOverlay) {
            elements.transitionOverlay.classList.add('active');
        }

        // 2. Redirect after delay
        setTimeout(() => {
            window.location.href = 'saka.html';
        }, 600);
    });
}

// Fade out overlay on page load (if coming from redirect)
window.addEventListener('load', () => {
    if (elements.transitionOverlay) {
        // Ensure it starts visible if we want fade-in effect, 
        // but here we want it to fade OUT if it was there contextually
        // Actually for simple transition, just ensure it's hidden by default on load
        elements.transitionOverlay.classList.remove('active');
    }
});

// =============================================
// EASTER EGG LOGIC
// =============================================

const state = {
    sakaClickCount: 0,
    kepitingTriggered: false,
    reachedBottom: false,
    lastScrollTop: 0,
    hoverTimer: null,
    quoteTransformed: false,
    secretDotClicked: false,
    sectionsViewed: new Set(),
    emptyClickCount: 0,
    finalTriggered: false,
    allSections: ['hero', 'about', 'personality', 'communication', 'funfacts', 'quotes']
};

// --- EE1: Click Rage (Entrance Page) ---
if (elements.sakaClick) {
    elements.sakaClick.addEventListener('click', () => {
        state.sakaClickCount++;
        elements.sakaClick.style.transform = 'scale(0.95)';
        setTimeout(() => elements.sakaClick.style.transform = 'scale(1)', 100);

        if (state.sakaClickCount === 3) {
            // Check if function exists (modal functions might need to be defined safely)
            if (typeof showModal === 'function') {
                setTimeout(() => showModal("Dry text boleh.\nTapi peduli jalan terus."), 200);
            } else {
                alert("Dry text boleh.\nTapi peduli jalan terus.");
            }
            state.sakaClickCount = 0;
        }
    });
}

// --- EE-New: Final Scroll Reading (Saka Page) ---
if (elements.finalEasterEgg) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // User reached bottom
                setTimeout(() => {
                    // Check if still intersecting after 1.5s
                    if (entry.target.getBoundingClientRect().top < window.innerHeight) {
                        entry.target.classList.add('visible');
                    }
                }, 1500);
            }
        });
    }, { threshold: 1.0 });

    observer.observe(elements.finalEasterEgg);
}

// --- EE2: Kepiting Mode (Saka Page) ---
if (elements.kepitingOverlay) {
    let lastScrollTime = Date.now();

    window.addEventListener('scroll', () => {
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentTime = Date.now();
        const timeDelta = currentTime - lastScrollTime;

        if (currentScrollTop >= maxScroll - 50) state.reachedBottom = true;

        let scrollVelocity = 0;
        if (timeDelta > 0) {
            scrollVelocity = (state.lastScrollTop - currentScrollTop) / timeDelta;
        }

        if (state.reachedBottom && !state.kepitingTriggered && scrollVelocity > 1.5 && currentScrollTop < maxScroll - 200) {
            triggerKepitingMode();
        }

        state.lastScrollTop = currentScrollTop;
        lastScrollTime = currentTime;
    });
}

// --- MUSIC SECTION TRACKING ---
const musicState = {
    clickedSongs: new Set(),
    whiteFerrariId: 'y9YsIuODGvg',
    lastAddedId: null
};

document.querySelectorAll('.song-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const id = card.getAttribute('data-id');
        if (!musicState.clickedSongs.has(id)) {
            musicState.clickedSongs.add(id);
            musicState.lastAddedId = id;
            checkMusicEasterEgg();
        }
    });
});

function checkMusicEasterEgg() {
    if (musicState.clickedSongs.size === 5) {
        // All 5 songs clicked
        setTimeout(() => {
            const isWhiteFerrariLast = musicState.lastAddedId === musicState.whiteFerrariId;
            const msgId = isWhiteFerrariLast ? 'music-msg-ferrari' : 'music-msg-general';
            const msgEl = document.getElementById(msgId);

            if (msgEl) {
                msgEl.classList.add('visible');
                // Smooth scroll to message
                msgEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 1000); // 1s delay as requested for dramatic effect
    }
}

function triggerKepitingMode() {
    state.kepitingTriggered = true;
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 500);

    if (elements.kepitingOverlay) {
        setTimeout(() => {
            elements.kepitingOverlay.classList.add('active');
            setTimeout(() => {
                elements.kepitingOverlay.classList.remove('active');
                setTimeout(() => {
                    state.kepitingTriggered = false;
                    state.reachedBottom = false;
                }, 1000);
            }, 3000);
        }, 300);
    }
}

// ***********************************************
// MUSIC CAROUSEL LOGIC
// ***********************************************
const musicTrack = document.getElementById('music-track');
const musicPrevBtn = document.getElementById('music-prev');
const musicNextBtn = document.getElementById('music-next');

if (musicTrack && musicPrevBtn && musicNextBtn) {
    const scrollAmount = 300; // Width of card + gap approx

    musicPrevBtn.addEventListener('click', () => {
        musicTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    musicNextBtn.addEventListener('click', () => {
        musicTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

// =============================================
// EE3: Hover Lama (Saka Page)
// =============================================
if (elements.specialQuote) {
    elements.specialQuote.addEventListener('mouseenter', () => {
        if (state.quoteTransformed) return;
        state.hoverTimer = setTimeout(() => {
            elements.specialQuoteText.textContent = "Biasa aja, tapi selalu ada.";
            elements.specialQuote.classList.add('transformed');
            state.quoteTransformed = true;
        }, 4000);
    });

    elements.specialQuote.addEventListener('mouseleave', () => {
        if (state.hoverTimer) {
            clearTimeout(state.hoverTimer);
            state.hoverTimer = null;
        }
    });
}

// --- EE4: Secret Dot (Saka Page) ---
if (elements.secretDot) {
    elements.secretDot.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!state.secretDotClicked) {
            if (typeof showModal === 'function') showModal("Kalau lo nemu ini,\nberarti lo cukup peduli buat nyari.");
            state.secretDotClicked = true;
        }
    });
}

// --- EE5: Final Troll (Saka Page) ---
// Only active if mainContent exists and finalOverlay exists
if (elements.mainContent && elements.finalOverlay) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) state.sectionsViewed.add(entry.target.id);
        });
    }, { threshold: 0.3 });

    state.allSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) sectionObserver.observe(section);
    });

    document.addEventListener('click', (e) => {
        // Filter sections that actually exist on this page
        const existingSections = state.allSections.filter(id => document.getElementById(id));
        const allViewed = existingSections.every(s => state.sectionsViewed.has(s));

        if (!allViewed || state.finalTriggered) return;

        const isEmptyArea = e.target === document.body ||
            e.target.classList.contains('section') ||
            e.target.classList.contains('container') ||
            e.target === elements.mainContent;

        if (isEmptyArea) {
            state.emptyClickCount++;
            if (state.emptyClickCount >= 5) triggerFinalTroll();
        }
    });
}

function triggerFinalTroll() {
    state.finalTriggered = true;
    if (elements.finalOverlay) {
        elements.finalOverlay.classList.add('active');
        if (elements.finalTexts.length > 0) {
            setTimeout(() => elements.finalTexts[0]?.classList.add('visible'), 500);
            setTimeout(() => elements.finalTexts[1]?.classList.add('visible'), 2000);
            setTimeout(() => elements.finalTexts[2]?.classList.add('visible'), 3500);
        }
        setTimeout(() => {
            elements.finalOverlay.classList.remove('active');
            elements.finalTexts.forEach(t => t?.classList.remove('visible'));
        }, 6000);
    }
}

// =============================================
// UTILS: MODAL & ANIMATION
// =============================================
function showModal(text) {
    if (elements.modalText && elements.modalOverlay) {
        elements.modalText.textContent = text;
        elements.modalOverlay.classList.add('active');
    }
}

if (elements.modalClose) {
    elements.modalClose.addEventListener('click', () => {
        elements.modalOverlay.classList.remove('active');
    });
}

if (elements.modalOverlay) {
    elements.modalOverlay.addEventListener('click', (e) => {
        if (e.target === elements.modalOverlay) elements.modalOverlay.classList.remove('active');
    });
}

if (elements.kepitingOverlay) {
    elements.kepitingOverlay.addEventListener('click', () => elements.kepitingOverlay.classList.remove('active'));
}

if (elements.finalOverlay) {
    elements.finalOverlay.addEventListener('click', () => {
        elements.finalOverlay.classList.remove('active');
        elements.finalTexts.forEach(t => t?.classList.remove('visible'));
    });
}

// Scroll Animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => animateOnScroll.observe(el));

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (elements.modalOverlay) elements.modalOverlay.classList.remove('active');
        if (elements.kepitingOverlay) elements.kepitingOverlay.classList.remove('active');
        if (elements.finalOverlay) elements.finalOverlay.classList.remove('active');
    }
});

// Console Easter Egg
console.log('%c🦀 Hai. ', 'font-size: 20px; color: #7c5cff;');
console.log('%cKlik "Let\'s See" buat masuk.', 'color: #9090a0;');
