// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 60;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Section Intersection Observer - Fade In Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0');
            entry.target.style.animation = 'fadeIn 0.8s ease-in-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all section content
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Email Copy Functionality
const emailCopyBtn = document.getElementById('email-copy');
if (emailCopyBtn) {
    emailCopyBtn.addEventListener('click', () => {
        const email = emailCopyBtn.getAttribute('data-email');

        navigator.clipboard.writeText(email).then(() => {
            const toast = document.getElementById('toast');
            toast.classList.remove('opacity-0');
            toast.classList.add('opacity-100');

            const originalText = emailCopyBtn.textContent;
            emailCopyBtn.textContent = '✓ 복사됨!';

            setTimeout(() => {
                toast.classList.add('opacity-0');
                toast.classList.remove('opacity-100');
                emailCopyBtn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email:', err);
        });
    });
}

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
});

// Prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
}
