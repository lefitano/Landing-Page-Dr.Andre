// ========== MENU TOGGLE PARA MOBILE ==========
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu ul');

if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// ========== HEADER SCROLL EFFECT ==========
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== ANIMAÇÃO DE ENTRADA (INTERSECTION OBSERVER) ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ========== CLASSE GENÉRICA DE CARROSSEL ==========
class Carrossel {
    constructor(config) {
        this.track = document.querySelector(config.trackSelector);
        this.slides = Array.from(document.querySelectorAll(config.slideSelector));
        this.btnPrev = document.querySelector(config.btnPrevSelector);
        this.btnNext = document.querySelector(config.btnNextSelector);
        this.indicadoresContainer = document.querySelector(config.indicadoresSelector);
        this.indicadorClass = config.indicadorClass;
        this.keyboardEnabled = config.keyboardEnabled || false;

        if (!this.track || this.slides.length === 0) return;

        this.currentIndex = 0;
        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;

        this.init();
    }

    init() {
        this.criarIndicadores();

        this.btnPrev?.addEventListener('click', () => this.prev());
        this.btnNext?.addEventListener('click', () => this.next());

        // Touch (mobile)
        this.track.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX;
            this.isDragging = true;
        }, { passive: true });

        this.track.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            this.currentX = e.touches[0].clientX;
        }, { passive: true });

        this.track.addEventListener('touchend', () => this.handleSwipeEnd());

        // Drag (desktop)
        this.track.addEventListener('mousedown', (e) => {
            this.startX = e.clientX;
            this.isDragging = true;
            this.track.style.cursor = 'grabbing';
        });

        this.track.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            this.currentX = e.clientX;
        });

        this.track.addEventListener('mouseup', () => this.handleDragEnd());
        this.track.addEventListener('mouseleave', () => this.handleDragEnd());

        // Teclado (apenas no carrossel principal, se habilitado)
        if (this.keyboardEnabled) {
            document.addEventListener('keydown', (e) => {
                // Só navega se nenhum input/textarea estiver em foco
                if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
                if (e.key === 'ArrowLeft') this.prev();
                if (e.key === 'ArrowRight') this.next();
            });
        }
    }

    criarIndicadores() {
        if (!this.indicadoresContainer) return;
        this.indicadoresContainer.innerHTML = '';

        this.slides.forEach((_, index) => {
            const indicador = document.createElement('button');
            indicador.classList.add(this.indicadorClass);
            indicador.setAttribute('aria-label', `Slide ${index + 1}`);
            if (index === 0) indicador.classList.add('active');
            indicador.addEventListener('click', () => this.goToSlide(index));
            this.indicadoresContainer.appendChild(indicador);
        });

        this.indicadores = Array.from(this.indicadoresContainer.children);
    }

    updateCarrossel() {
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;

        this.indicadores?.forEach((ind, index) => {
            ind.classList.toggle('active', index === this.currentIndex);
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateCarrossel();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateCarrossel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarrossel();
    }

    handleSwipeEnd() {
        if (!this.isDragging) return;
        const diff = this.startX - this.currentX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? this.next() : this.prev();
        }
        this.isDragging = false;
    }

    handleDragEnd() {
        if (!this.isDragging) return;
        const diff = this.startX - this.currentX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? this.next() : this.prev();
        }
        this.isDragging = false;
        this.track.style.cursor = 'grab';
    }

    autoPlay(interval = 5000) {
        this.autoPlayInterval = setInterval(() => this.next(), interval);
    }

    pauseAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    // Carrossel de Resultados
    new Carrossel({
        trackSelector: '.carrossel-track',
        slideSelector: '.carrossel-slide',
        btnPrevSelector: '.carrossel-btn-prev',
        btnNextSelector: '.carrossel-btn-next',
        indicadoresSelector: '.carrossel-indicadores',
        indicadorClass: 'carrossel-indicador',
        keyboardEnabled: true
    });

    // Carrossel do Curso
    new Carrossel({
        trackSelector: '.curso-carrossel-track',
        slideSelector: '.curso-carrossel-slide',
        btnPrevSelector: '.curso-carrossel-btn-prev',
        btnNextSelector: '.curso-carrossel-btn-next',
        indicadoresSelector: '.curso-carrossel-indicadores',
        indicadorClass: 'curso-carrossel-indicador',
        keyboardEnabled: false
    });
});