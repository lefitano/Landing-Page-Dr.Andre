// ========== MENU TOGGLE PARA MOBILE ==========
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu ul');

if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// ========== SCROLL SUAVE ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== CARROSSEL DE RESULTADOS ==========
class Carrossel {
    constructor() {
        this.track = document.querySelector('.carrossel-track');
        this.slides = Array.from(document.querySelectorAll('.carrossel-slide'));
        this.btnPrev = document.querySelector('.carrossel-btn-prev');
        this.btnNext = document.querySelector('.carrossel-btn-next');
        this.indicadoresContainer = document.querySelector('.carrossel-indicadores');
        
        if (!this.track || this.slides.length === 0) return;
        
        this.currentIndex = 0;
        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;
        
        this.init();
    }
    
    init() {
        // Criar indicadores
        this.criarIndicadores();
        
        // Event listeners dos botões
        this.btnPrev.addEventListener('click', () => this.prev());
        this.btnNext.addEventListener('click', () => this.next());
        
        // Swipe no mobile
        this.track.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.track.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.track.addEventListener('touchend', () => this.handleTouchEnd());
        
        // Drag no desktop
        this.track.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.track.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.track.addEventListener('mouseup', () => this.handleMouseUp());
        this.track.addEventListener('mouseleave', () => this.handleMouseUp());
        
        // Teclado (setas)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Auto-play (opcional - descomente se quiser)
        // this.autoPlay();
    }
    
    criarIndicadores() {
        this.slides.forEach((_, index) => {
            const indicador = document.createElement('div');
            indicador.classList.add('carrossel-indicador');
            if (index === 0) indicador.classList.add('active');
            indicador.addEventListener('click', () => this.goToSlide(index));
            this.indicadoresContainer.appendChild(indicador);
        });
        this.indicadores = Array.from(this.indicadoresContainer.children);
        this.indicadoresContainer.innerHTML = '';
    
        this.slides.forEach((_, index) => {
            const indicador = document.createElement('div');
            indicador.classList.add('carrossel-indicador');
            if (index === 0) indicador.classList.add('active');
            indicador.addEventListener('click', () => this.goToSlide(index));
            this.indicadoresContainer.appendChild(indicador);
        });
        this.indicadores = Array.from(this.indicadoresContainer.children);
    }
    
    updateCarrossel() {
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        
        // Atualizar indicadores
        this.indicadores.forEach((ind, index) => {
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
    
    // Touch events (mobile)
    handleTouchStart(e) {
        this.startX = e.touches[0].clientX;
        this.isDragging = true;
    }
    
    handleTouchMove(e) {
        if (!this.isDragging) return;
        this.currentX = e.touches[0].clientX;
    }
    
    handleTouchEnd() {
        if (!this.isDragging) return;
        
        const diff = this.startX - this.currentX;
        
        // Se arrastou mais de 50px
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
        
        this.isDragging = false;
    }
    
    // Mouse events (desktop)
    handleMouseDown(e) {
        this.startX = e.clientX;
        this.isDragging = true;
        this.track.style.cursor = 'grabbing';
    }
    
    handleMouseMove(e) {
        if (!this.isDragging) return;
        this.currentX = e.clientX;
    }
    
    handleMouseUp() {
        if (!this.isDragging) return;
        
        const diff = this.startX - this.currentX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
        
        this.isDragging = false;
        this.track.style.cursor = 'grab';
    }
    
    // Auto-play (opcional)
    autoPlay() {
        setInterval(() => {
            this.next();
        }, 5000); // Muda a cada 5 segundos
    }
}

// Inicializar carrossel quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    new Carrossel();
});
// ========== CARROSSEL DO CURSO ==========
class CarrosselCurso {
    constructor() {
        this.track = document.querySelector('.curso-carrossel-track');
        this.slides = Array.from(document.querySelectorAll('.curso-carrossel-slide'));
        this.btnPrev = document.querySelector('.curso-carrossel-btn-prev');
        this.btnNext = document.querySelector('.curso-carrossel-btn-next');
        this.indicadoresContainer = document.querySelector('.curso-carrossel-indicadores');
        
        if (!this.track || this.slides.length === 0) return;
        
        this.currentIndex = 0;
        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;
        
        this.init();
    }
    
    init() {
        // Criar indicadores
        this.criarIndicadores();
        
        // Event listeners dos botões
        this.btnPrev.addEventListener('click', () => this.prev());
        this.btnNext.addEventListener('click', () => this.next());
        
        // Swipe no mobile
        this.track.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.track.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.track.addEventListener('touchend', () => this.handleTouchEnd());
        
        // Drag no desktop
        this.track.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.track.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.track.addEventListener('mouseup', () => this.handleMouseUp());
        this.track.addEventListener('mouseleave', () => this.handleMouseUp());
    }
    
    criarIndicadores() {
        this.slides.forEach((_, index) => {
            const indicador = document.createElement('div');
            indicador.classList.add('curso-carrossel-indicador');
            if (index === 0) indicador.classList.add('active');
            indicador.addEventListener('click', () => this.goToSlide(index));
            this.indicadoresContainer.appendChild(indicador);
        });
        this.indicadores = Array.from(this.indicadoresContainer.children);
    }
    
    updateCarrossel() {
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        
        // Atualizar indicadores
        this.indicadores.forEach((ind, index) => {
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
    
    // Touch events (mobile)
    handleTouchStart(e) {
        this.startX = e.touches[0].clientX;
        this.isDragging = true;
    }
    
    handleTouchMove(e) {
        if (!this.isDragging) return;
        this.currentX = e.touches[0].clientX;
    }
    
    handleTouchEnd() {
        if (!this.isDragging) return;
        
        const diff = this.startX - this.currentX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
        
        this.isDragging = false;
    }
    
    // Mouse events (desktop)
    handleMouseDown(e) {
        this.startX = e.clientX;
        this.isDragging = true;
        this.track.style.cursor = 'grabbing';
    }
    
    handleMouseMove(e) {
        if (!this.isDragging) return;
        this.currentX = e.clientX;
    }
    
    handleMouseUp() {
        if (!this.isDragging) return;
        
        const diff = this.startX - this.currentX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
        
        this.isDragging = false;
        this.track.style.cursor = 'grab';
    }
}

// Inicializar ambos os carrosséis quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    new Carrossel(); // Carrossel de resultados
    new CarrosselCurso(); // Carrossel do curso
});