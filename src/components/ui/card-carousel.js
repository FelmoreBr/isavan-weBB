/**
 * CardCarousel - Un componente de carrusel de tarjetas
 * Basado en la documentación de skiper-ui
 */
class CardCarousel {
    /**
     * Constructor del componente CardCarousel
     * @param {HTMLElement} container - El contenedor donde se inicializará el carrusel
     * @param {Object} options - Opciones de configuración
     */
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            images: options.images || [],
            autoplayDelay: options.autoplayDelay || 3000,
            autoplay: options.autoplay !== undefined ? options.autoplay : false,
            showPagination: options.showPagination !== undefined ? options.showPagination : true,
            showNavigation: options.showNavigation !== undefined ? options.showNavigation : true
        };

        this.currentSlide = 0;
        this.slides = [];
        this.paginationDots = [];
        this.autoplayInterval = null;

        this.init();
    }

    /**
     * Inicializa el componente
     */
    init() {
        this.createStructure();
        this.setupEventListeners();
        
        if (this.options.autoplay) {
            this.startAutoplay();
        }
    }

    /**
     * Crea la estructura HTML del carrusel
     */
    createStructure() {
        // Limpiar el contenedor
        this.container.innerHTML = '';
        
        // Crear el contenedor principal del carrusel
        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'card-carousel-container';
        
        // Crear el contenedor de slides
        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'card-carousel-slides';
        
        // Crear slides basados en las imágenes proporcionadas
        this.options.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'card-carousel-slide';
            slide.dataset.index = index;
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt || '';
            
            // Añadir el nombre de la comuna debajo de la imagen
            const caption = document.createElement('span');
            caption.className = 'card-carousel-caption';
            caption.textContent = image.alt || '';
            
            slide.appendChild(img);
            slide.appendChild(caption);
            slidesContainer.appendChild(slide);
            this.slides.push(slide);
        });
        
        carouselContainer.appendChild(slidesContainer);
        
        // Crear navegación si está habilitada
        if (this.options.showNavigation) {
            const prevButton = document.createElement('button');
            prevButton.className = 'card-carousel-prev';
            prevButton.innerHTML = '&#10094;';
            prevButton.setAttribute('aria-label', 'Anterior');
            
            const nextButton = document.createElement('button');
            nextButton.className = 'card-carousel-next';
            nextButton.innerHTML = '&#10095;';
            nextButton.setAttribute('aria-label', 'Siguiente');
            
            carouselContainer.appendChild(prevButton);
            carouselContainer.appendChild(nextButton);
        }
        
        // Crear paginación si está habilitada
        if (this.options.showPagination) {
            const pagination = document.createElement('div');
            pagination.className = 'card-carousel-pagination';
            
            for (let i = 0; i < this.options.images.length; i++) {
                const dot = document.createElement('span');
                dot.className = 'card-carousel-dot';
                dot.dataset.index = i;
                
                if (i === 0) {
                    dot.classList.add('active');
                }
                
                pagination.appendChild(dot);
                this.paginationDots.push(dot);
            }
            
            carouselContainer.appendChild(pagination);
        }
        
        this.container.appendChild(carouselContainer);
        
        // Mostrar el primer slide
        this.goToSlide(0);
    }

    /**
     * Configura los event listeners para la navegación
     */
    setupEventListeners() {
        // Event listeners para los botones de navegación
        if (this.options.showNavigation) {
            const prevButton = this.container.querySelector('.card-carousel-prev');
            const nextButton = this.container.querySelector('.card-carousel-next');
            
            prevButton.addEventListener('click', () => this.prevSlide());
            nextButton.addEventListener('click', () => this.nextSlide());
        }
        
        // Event listeners para los puntos de paginación
        if (this.options.showPagination) {
            const dots = this.container.querySelectorAll('.card-carousel-dot');
            
            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    const index = parseInt(dot.dataset.index);
                    this.goToSlide(index);
                });
            });
        }
        
        // Pausar autoplay al pasar el mouse por encima
        this.container.addEventListener('mouseenter', () => {
            if (this.autoplayInterval) {
                this.stopAutoplay();
            }
        });
        
        // Reanudar autoplay al quitar el mouse
        this.container.addEventListener('mouseleave', () => {
            if (this.options.autoplay) {
                this.startAutoplay();
            }
        });
    }

    /**
     * Navega al slide anterior
     */
    prevSlide() {
        let index = this.currentSlide - 1;
        if (index < 0) {
            index = this.slides.length - 1;
        }
        this.goToSlide(index);
    }

    /**
     * Navega al siguiente slide
     */
    nextSlide() {
        let index = this.currentSlide + 1;
        if (index >= this.slides.length) {
            index = 0;
        }
        this.goToSlide(index);
    }

    /**
     * Navega a un slide específico
     * @param {number} index - Índice del slide al que navegar
     */
    goToSlide(index) {
        console.log('Navegando al slide:', index, 'de', this.slides.length, 'slides');
        // Actualizar el slide actual
        this.currentSlide = index;
        
        // Actualizar la posición de los slides
        this.slides.forEach((slide, i) => {
            // Calcular la posición relativa al slide activo
            const offset = i - index;
            
            // Aplicar transformaciones según la posición
            if (offset === 0) {
                // Slide activo (centrado)
                slide.style.transform = 'translateX(0) scale(1.3)';
                slide.style.opacity = '1';
                slide.style.zIndex = '10';
            } else if (offset === -1 || (offset === this.slides.length - 1 && index === 0)) {
                // Slide a la izquierda
                slide.style.transform = 'translateX(-150%) scale(0.9)';
                slide.style.opacity = '0.8';
                slide.style.zIndex = '5';
            } else if (offset === 1 || (offset === -(this.slides.length - 1) && index === this.slides.length - 1)) {
                // Slide a la derecha
                slide.style.transform = 'translateX(150%) scale(0.9)';
                slide.style.opacity = '0.8';
                slide.style.zIndex = '5';
            } else {
                // Slides fuera de vista
                slide.style.transform = `translateX(${offset > 0 ? '300%' : '-300%'}) scale(0.7)`;
                slide.style.opacity = '0';
                slide.style.zIndex = '1';
            }
        });
        
        // Actualizar la paginación
        if (this.options.showPagination) {
            this.paginationDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }

    /**
     * Inicia el autoplay del carrusel
     */
    startAutoplay() {
        console.log('Iniciando autoplay con delay:', this.options.autoplayDelay);
        this.stopAutoplay(); // Detener cualquier autoplay existente
        
        this.autoplayInterval = setInterval(() => {
            console.log('Autoplay ejecutándose - slide actual:', this.currentSlide);
            this.nextSlide();
        }, this.options.autoplayDelay);
        
        console.log('Autoplay iniciado con ID:', this.autoplayInterval);
    }

    /**
     * Detiene el autoplay del carrusel
     */
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    /**
     * Actualiza las imágenes del carrusel
     * @param {Array} images - Nuevas imágenes para el carrusel
     */
    updateImages(images) {
        this.options.images = images;
        this.createStructure();
    }

    /**
     * Destruye el componente y limpia los recursos
     */
    destroy() {
        this.stopAutoplay();
        this.container.innerHTML = '';
    }
}

// Exponer la clase al ámbito global
window.CardCarousel = CardCarousel;