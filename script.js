const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const tabLinks = Array.from(document.querySelectorAll('.nav-link[data-page]'));
const pageSections = Array.from(document.querySelectorAll('.page-section[data-page]'));
const validPages = new Set(pageSections.map(section => section.dataset.page));

function setActivePage(page, updateHash = true) {
    if (!validPages.has(page)) {
        page = 'home';
    }

    pageSections.forEach(section => {
        section.hidden = section.dataset.page !== page;
    });

    tabLinks.forEach(link => {
        const isActive = link.dataset.page === page;
        link.classList.toggle('active', isActive);
        link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });

    if (updateHash) {
        history.replaceState(null, '', `#${page}`);
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
}

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

tabLinks.forEach(link => {
    link.addEventListener('click', event => {
        const page = link.dataset.page;
        if (!page) {
            return;
        }

        event.preventDefault();
        setActivePage(page);

        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

window.addEventListener('hashchange', () => {
    const hashPage = window.location.hash.replace('#', '');
    if (validPages.has(hashPage)) {
        setActivePage(hashPage, false);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const initialPage = window.location.hash.replace('#', '');
    setActivePage(validPages.has(initialPage) ? initialPage : 'home', false);
});
