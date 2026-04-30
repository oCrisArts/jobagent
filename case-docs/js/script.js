// Navbar burger toggle
document.addEventListener('DOMContentLoaded', () => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                const target = el.dataset.target;
                const $target = document.getElementById(target);
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
});

// Scroll spy with IntersectionObserver
const menuLinks = document.querySelectorAll('.menu-list a');
const contentSections = document.querySelectorAll('.content-section');

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');

            // Remove active class from all links
            menuLinks.forEach(link => {
                link.classList.remove('is-active');
                link.removeAttribute('aria-current');
            });

            // Add active class to current link
            const activeLink = document.querySelector(`.menu-list a[data-section="${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('is-active');
                activeLink.setAttribute('aria-current', 'true');
            }
        }
    });
}, observerOptions);

// Observe all content sections
contentSections.forEach(section => {
    observer.observe(section);
});

// Smooth scroll for menu links
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Search functionality
const searchInput = document.querySelector('.input[type="search"]');
if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        contentSections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (searchTerm === '') {
                section.style.opacity = '';
                section.style.display = '';
            } else {
                section.style.opacity = text.includes(searchTerm) ? '1' : '0.3';
                section.style.display = text.includes(searchTerm) ? '' : 'none';
            }
        });
    });
}
