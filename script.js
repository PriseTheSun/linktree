// js/script.js - JavaScript compartilhado

// Função para inicializar componentes comuns
function initializeCommonComponents() {
    // Atualizar ano no footer (se houver)
    if ($('#current-year').length) {
        $('#current-year').text(new Date().getFullYear());
    }

    // Inicializar tooltips (se usar)
    $('[data-tooltip]').hover(
        function () {
            const tooltip = $(this).data('tooltip');
            $('body').append(`<div class="fixed bg-gray-900 text-white px-3 py-2 rounded-lg text-sm z-50">${tooltip}</div>`);
            const $tooltip = $('body').children().last();
            const pos = $(this).offset();
            $tooltip.css({
                top: pos.top - $tooltip.outerHeight() - 10,
                left: pos.left + ($(this).outerWidth() - $tooltip.outerWidth()) / 2
            });
        },
        function () {
            $('body').children().last().remove();
        }
    );

    // Smooth scroll para links internos
    $('a[href^="#"]').on('click', function (e) {
        const href = $(this).attr('href');
        if (href !== '#') {
            e.preventDefault();
            const target = $(href);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 600);
            }
        }
    });

    // Adicionar classe active ao link atual
    const currentPage = window.location.pathname.split('/').pop();
    $('nav a').each(function () {
        const linkPage = $(this).attr('href').split('/').pop();
        if (linkPage === currentPage) {
            $(this).addClass('active');
        }
    });
}

// Função para formatar data
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Função para criar estrelas (usada em games.html)
function createStars(rating, size = 'text-xl') {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += `<i class="fas fa-star filled ${size}"></i>`;
        } else {
            starsHtml += `<i class="far fa-star ${size}"></i>`;
        }
    }
    return starsHtml;
}

// Função para obter ícone de tecnologia (usada em projetos.html)
function getTechIcon(techName) {
    const icons = {
        // Front-end
        "HTML5": { icon: "devicon-html5-plain", color: "text-orange-500" },
        "CSS3": { icon: "devicon-css3-plain", color: "text-blue-500" },
        "JavaScript": { icon: "devicon-javascript-plain", color: "text-yellow-500" },
        "jQuery": { icon: "devicon-jquery-plain", color: "text-blue-500" },
        "Tailwind CSS": { icon: "devicon-tailwindcss-plain", color: "text-teal-500" },
        "Bootstrap": { icon: "devicon-bootstrap-plain", color: "text-purple-500" },
        "Vue.js": { icon: "devicon-vuejs-plain", color: "text-green-500" },
        "Vuetify": { icon: "devicon-vuetify-line", color: "text-blue-400" },

        // Back-end & CMS
        "WordPress": { icon: "devicon-wordpress-plain", color: "text-blue-500" },
        "PHP": { icon: "devicon-php-plain", color: "text-purple-500" },
        "MySQL": { icon: "devicon-mysql-plain", color: "text-blue-600" },
        "Node.js": { icon: "devicon-nodejs-plain", color: "text-green-600" },

        // Design
        "Figma": { icon: "devicon-figma-plain", color: "text-pink-500" },
        "Photoshop": { icon: "devicon-photoshop-plain", color: "text-blue-500" },
        "Illustrator": { icon: "devicon-illustrator-plain", color: "text-orange-500" },
        "Adobe XD": { icon: "devicon-xd-plain", color: "text-pink-600" },

        // Outros
        "API REST": { icon: "fas fa-server", color: "text-gray-600" },
        "Git": { icon: "devicon-git-plain", color: "text-orange-600" },
        "SEO": { icon: "fas fa-search", color: "text-blue-600" },
        "Elementor": { icon: "fas fa-th", color: "text-orange-500" },
        "Gutenberg": { icon: "fas fa-cubes", color: "text-blue-500" },
        "ACF": { icon: "fas fa-wrench", color: "text-gray-600" },
        "WooCommerce": { icon: "fas fa-shopping-cart", color: "text-purple-500" }
    };

    const tech = icons[techName] || { icon: "fas fa-code", color: "text-gray-600" };
    return `<i class="${tech.icon} ${tech.color}"></i>`;
}

// Função para abrir modal genérico
function openModal(modalId) {
    $(modalId).addClass('active');
    $('body').css('overflow', 'hidden');
}

// Função para fechar modal
function closeModal(modalId) {
    $(modalId).removeClass('active');
    $('body').css('overflow', 'auto');
}

// Inicializar quando o documento estiver pronto
$(document).ready(function () {
    initializeCommonComponents();

    // Fechar modal com ESC
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
            $('.modal.active').removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });

    // Fechar modal ao clicar fora
    $(document).on('click', '.modal', function (e) {
        if (e.target === this) {
            $(this).removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });
});

// Função para lazy loading de imagens
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Chamar lazy loading quando disponível
if ('IntersectionObserver' in window) {
    $(document).ready(lazyLoadImages);
}