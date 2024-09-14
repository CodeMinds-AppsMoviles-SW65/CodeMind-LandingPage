const menuToggle = document.querySelector('.menu-toggle');
const mobileNavDropdown = document.querySelector('.mobile-nav-dropdown');

// Abrir y cerrar el menú desplegable
menuToggle.addEventListener('click', () => {
    mobileNavDropdown.style.display =
        mobileNavDropdown.style.display === 'block' ? 'none' : 'block';
});

// Cerrar el menú al hacer clic fuera
window.addEventListener('click', function (e) {
    if (!mobileNavDropdown.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileNavDropdown.style.display = 'none';
    }
});


function loadLanguage(lang) {
    fetch(`assets/lang/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll("[data-i18n]").forEach(el => {
                const key = el.getAttribute("data-i18n");
                if (data[key]) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = data[key]; // Update placeholder if applicable
                    } else {
                        el.innerHTML = data[key]; // Update text
                    }
                }
            });

            // Update images
            document.querySelectorAll("[data-i18n-img]").forEach(img => {
                const key = img.getAttribute("data-i18n-img");
                if (data[key]) {
                    img.src = data[key]; // Update image source
                }
            });

            // Update button styles
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.getElementById(`lang-${lang}`).classList.add('active');
        }).catch(error => console.error('Error loading the language file:', error));
}
