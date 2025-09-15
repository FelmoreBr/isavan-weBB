class CardSwipe {
  constructor(container, options = {}) {
    this.container = container;
    this.images = options.images || [];
    this.autoplayDelay = options.autoplayDelay || 2000;
    this.slideShadows = options.slideShadows || false;
    this.currentIndex = 0;
    this.autoplayInterval = null;
    
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
    this.startAutoplay();
  }

  render() {
    this.container.innerHTML = `
      <div class="card-swipe-container">
        <div class="card-swipe-stack">
          ${this.images.map((image, index) => this.renderCard(image, index)).join('')}
        </div>
      </div>
    `;
  }

  renderCard(image, index) {
    const isActive = index === this.currentIndex;
    const zIndex = this.images.length - Math.abs(index - this.currentIndex);
    const translateY = Math.abs(index - this.currentIndex) * 8;
    const translateX = Math.abs(index - this.currentIndex) * 4;
    const scale = isActive ? 1 : 0.95 - (Math.abs(index - this.currentIndex) * 0.03);
    const opacity = isActive ? 1 : 0.8 - (Math.abs(index - this.currentIndex) * 0.1);
    const rotateZ = (index - this.currentIndex) * 2;

    return `
      <div class="card-swipe-slide ${isActive ? 'active' : ''}" 
           data-index="${index}"
           style="
             z-index: ${zIndex}; 
             transform: translateY(${translateY}px) translateX(${translateX}px) scale(${scale}) rotateZ(${rotateZ}deg); 
             opacity: ${opacity};
           ">
        <div class="card-image-container">
          <img src="${image.src}" alt="${image.alt}" class="card-image" />
        </div>
      </div>
    `;
  }

  bindEvents() {
    const cards = this.container.querySelectorAll('.card-swipe-slide');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.dataset.index);
        if (index !== this.currentIndex) {
          this.goToSlide(index);
        }
      });
    });

    // Pausar autoplay al hacer hover
    this.container.addEventListener('mouseenter', () => {
      this.stopAutoplay();
    });

    this.container.addEventListener('mouseleave', () => {
      this.startAutoplay();
    });
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCards();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateCards();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateCards();
  }

  updateCards() {
    this.render();
    this.bindEvents();
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, this.autoplayDelay);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  destroy() {
    this.stopAutoplay();
    this.container.innerHTML = '';
  }
}

// Función de inicialización global
function initCardSwipe(containerId, options) {
  const container = document.getElementById(containerId);
  if (container) {
    return new CardSwipe(container, options);
  }
  console.error(`Container with id '${containerId}' not found`);
  return null;
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.CardSwipe = CardSwipe;
  window.initCardSwipe = initCardSwipe;
}