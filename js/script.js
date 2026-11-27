const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const brandLink = document.querySelector('nav a[href="#top"]');

function setMenuOpen(open) {
    mobileMenu.classList.toggle('hidden', !open);
    menuToggle.setAttribute('aria-expanded', String(open));
}

menuToggle.addEventListener('click', () => {
    setMenuOpen(mobileMenu.classList.contains('hidden'));
});

brandLink.addEventListener('click', () => setMenuOpen(false));
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        setMenuOpen(false);
        menuToggle.focus();
    }
});

const emailCopyButton = document.getElementById('email-copy');
const toast = document.getElementById('toast');
let toastTimer;

emailCopyButton.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(emailCopyButton.dataset.email);
        toast.textContent = '이메일 주소를 복사했습니다.';
    } catch {
        toast.textContent = '복사에 실패했습니다. 이메일 보내기 링크를 이용해 주세요.';
    }

    clearTimeout(toastTimer);
    toast.classList.replace('opacity-0', 'opacity-100');
    toastTimer = setTimeout(() => {
        toast.classList.replace('opacity-100', 'opacity-0');
        toast.textContent = '';
    }, 2500);
});
