/**
 * ================================================================
 * SCRIPT - Sistema de Recursos Humanos Clínica San Pablo
 * ================================================================
 * Interactividad: Menú hamburguesa, validación de formulario,
 * efectos visuales y más.
 * ================================================================
 */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================================
    // 1. MENÚ HAMBURGUESA (Sesión 11: Responsive)
    // ============================================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }

    // ============================================================
    // 2. VALIDACIÓN Y ENVÍO DEL FORMULARIO DE CONTACTO
    // ============================================================
    const contactForm = document.getElementById('contactForm');
    const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Obtener valores
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            // Validar campos obligatorios
            if (!nombre || !email || !mensaje) {
                mostrarMensaje('⚠️ Por favor, completa todos los campos obligatorios.', 'error');
                return;
            }

            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                mostrarMensaje('⚠️ Ingresa un correo electrónico válido.', 'error');
                return;
            }

            // Validar teléfono (opcional pero con formato)
            if (telefono && !/^[0-9\s\-+()]{7,15}$/.test(telefono)) {
                mostrarMensaje('⚠️ Ingresa un número de teléfono válido (solo dígitos y espacios).', 'error');
                return;
            }

            // Simular envío exitoso
            mostrarMensaje(`✅ ¡Gracias ${nombre}! Tu mensaje ha sido enviado exitosamente. Nos pondremos en contacto contigo a la brevedad.`, 'success');

            // Limpiar formulario
            contactForm.reset();
        });
    }

    /**
     * Función para mostrar mensajes de confirmación o error
     */
    function mostrarMensaje(texto, tipo) {
        if (!mensajeConfirmacion) return;

        mensajeConfirmacion.textContent = texto;
        mensajeConfirmacion.style.color = tipo === 'error' ? '#DC2626' : '#2E8B57';
        mensajeConfirmacion.style.fontWeight = '600';
        mensajeConfirmacion.style.padding = '12px';
        mensajeConfirmacion.style.borderRadius = '8px';
        mensajeConfirmacion.style.background = tipo === 'error' ? '#FEE2E2' : '#E6F7E6';

        // Ocultar mensaje después de 6 segundos
        setTimeout(() => {
            mensajeConfirmacion.textContent = '';
            mensajeConfirmacion.style.background = 'transparent';
            mensajeConfirmacion.style.padding = '0';
        }, 6000);
    }

    // ============================================================
    // 3. EFECTO DE APARICIÓN AL HACER SCROLL (opcional)
    // ============================================================
    const cards = document.querySelectorAll('.empleado-card, .asistencia-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // ============================================================
    // 4. SCROLL SUAVE PARA ENLACES INTERNOS
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

});