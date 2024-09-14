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

// Listeners para los botones de idioma
document.getElementById('lang-en').addEventListener('click', () => loadLanguage('en'));
document.getElementById('lang-es').addEventListener('click', () => loadLanguage('es'));
document.getElementById('lang-en-mobile').addEventListener('click', () => loadLanguage('en'));
document.getElementById('lang-es-mobile').addEventListener('click', () => loadLanguage('es'));

// Inicializa el idioma por defecto al cargar la página (Inglés)
document.addEventListener('DOMContentLoaded', function() {
    loadLanguage('en');
});

// Función para generar un correo temporal aleatorio
function generateTempEmail() {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let randomString = '';
    for (let i = 0; i < 10; i++) {
        randomString += chars[Math.floor(Math.random() * chars.length)];
    }
    return randomString + '@temporaly.com';
}

// Colocar el correo temporal generado en el input
document.getElementById('email').value = generateTempEmail();

// Función para copiar el correo temporal al portapapeles
document.getElementById('copy-btn').addEventListener('click', function() {
    const emailField = document.getElementById('email');
    emailField.select();
    document.execCommand('copy');
    alert('Correo temporal copiado: ' + emailField.value);
});

const checkbox = document.getElementById("checkbox");
const professional = document.getElementById("professional");
const master = document.getElementById("master");
const basic = document.getElementById("basic");

// Configurar los precios mensuales al cargar la página
if (checkbox.checked) {
    basic.textContent = "$0.00";
    professional.textContent = "$15.00";
    master.textContent = "$25.00";
}

checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
        // Precios anuales (con descuento)
        basic.textContent = "$0.00";
        professional.textContent = "$180.00";
        master.textContent = "$375.00";

    } else {
        // Precios mensuales
        basic.textContent = "$0.00";
        professional.textContent = "$15.00";
        master.textContent = "$25.00";
    }
});
