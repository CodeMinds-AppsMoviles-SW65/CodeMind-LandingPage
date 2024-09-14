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


let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;
const carouselInner = document.querySelector('.carousel-inner');
const paginationDots = document.querySelector('.carousel-pagination');

// Crear puntos de paginación
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    paginationDots.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');


// Ajustar la altura de todas las tarjetas para que coincidan con la tarjeta más alta
function adjustCardHeight() {
    let maxHeight = 0;
    slides.forEach(slide => {
        let card = slide.querySelector('.testimonial-card');
        card.style.height = 'auto'; // Reseteamos el valor antes de calcular
        let height = card.offsetHeight;
        if (height > maxHeight) maxHeight = height;
    });
    slides.forEach(slide => {
        slide.querySelector('.testimonial-card').style.height = `${maxHeight}px`;
    });
}

// Función para actualizar el carrusel
function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    const totalSlideWidth = slideWidth + 5; // Ajuste de separación entre tarjetas
    const visibleArea = window.innerWidth;

    // En pantallas pequeñas, mostrar solo una tarjeta
    if (window.innerWidth <= 430) {
        carouselInner.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
    } else {
        const offset = (visibleArea - slideWidth) / 2; // Calcular el offset para centrar la tarjeta visible
        carouselInner.style.transform = `translateX(${offset - (currentSlide * totalSlideWidth)}px)`;
    }

    updateDots();
    adjustCardHeight();
}

// Función para actualizar los puntos de paginación
function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

// Mover al siguiente slide
function moveToNextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
    } else {
        currentSlide = 0;
    }
    updateCarousel();
}

// Mover al slide anterior
function moveToPrevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = totalSlides - 1;
    }
    updateCarousel();
}

// Inicializar el carrusel en la primera posición
updateCarousel();

// Ajustar el carrusel cuando se redimensiona la ventana
window.addEventListener('resize', updateCarousel);

// Configuración de auto-slide
let slideInterval = setInterval(moveToNextSlide, 5000); // Cambiar de slide cada 5 segundos

// Reiniciar el auto-slide cuando el usuario interactúe
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval); // Detener el auto-slide
        currentSlide = index;
        updateCarousel();
        slideInterval = setInterval(moveToNextSlide, 5000); // Reiniciar el auto-slide
    });
});




document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible'); // Añade la clase cuando la sección es visible
            }
        });
    }, {
        threshold: 0.90 // Activa la animación cuando el 20% de la sección es visible
    });

    const elementsToAnimate = document.querySelectorAll('.js-animate');

    elementsToAnimate.forEach(element => {
        observer.observe(element); // Observa cada elemento que debe animarse
    });
});