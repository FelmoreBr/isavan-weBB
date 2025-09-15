/**
 * @author: @dorian_baffier (adaptado para JavaScript vanilla)
 * @description: Typewriter - Versión JavaScript vanilla
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

class TypewriterTitle {
  /**
   * @typedef {Object} TypewriterSequence
   * @property {string} text - The text to type
   * @property {boolean} [deleteAfter] - Whether to delete the text after typing
   * @property {number} [pauseAfter] - How long to pause after typing (ms)
   */

  /**
   * @param {HTMLElement} container - The container element
   * @param {Object} options - Configuration options
   * @param {TypewriterSequence[]} [options.sequences] - Array of text sequences to type
   * @param {number} [options.typingSpeed] - Speed of typing in ms
   * @param {number} [options.startDelay] - Delay before starting to type in ms
   * @param {boolean} [options.autoLoop] - Whether to loop through sequences
   * @param {number} [options.loopDelay] - Delay between loops in ms
   */
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      sequences: options.sequences || [
        { text: "Typewriter", deleteAfter: true },
        { text: "Multiple Words", deleteAfter: true },
        { text: "Auto Loop", deleteAfter: false },
      ],
      typingSpeed: options.typingSpeed || 50,
      startDelay: options.startDelay || 500,
      autoLoop: options.autoLoop !== undefined ? options.autoLoop : true,
      loopDelay: options.loopDelay || 2000,
    };
    
    this.isActive = true;
    this.init();
  }

  /**
   * Initialize the typewriter
   */
  init() {
    // Create the HTML structure
    this.container.classList.add('typewriter-container');
    
    const content = document.createElement('div');
    content.classList.add('typewriter-content');
    
    const textElement = document.createElement('div');
    textElement.classList.add('typewriter-text');
    
    const typewriterSpan = document.createElement('span');
    typewriterSpan.classList.add('typewriter-cursor', 'animate-cursor');
    typewriterSpan.setAttribute('data-typewriter', '');
    typewriterSpan.textContent = this.options.sequences[0].text;
    
    textElement.appendChild(typewriterSpan);
    content.appendChild(textElement);
    this.container.appendChild(content);
    
    // Store reference to the typewriter element
    this.typewriterElement = typewriterSpan;
    
    // Start the animation with a slight delay
    setTimeout(() => this.typeText(), 100);
  }

  /**
   * Type the text sequences
   */
  async typeText() {
    if (!this.typewriterElement) return;

    while (this.isActive) {
      // Reset the text content
      this.typewriterElement.textContent = "";

      // Wait for initial delay on first run
      await this.wait(this.options.startDelay);

      // Process each sequence
      for (const sequence of this.options.sequences) {
        if (!this.isActive) break;

        // Type out the sequence text
        for (let i = 0; i < sequence.text.length; i++) {
          if (!this.isActive) break;
          this.typewriterElement.textContent = sequence.text.slice(0, i + 1);
          await this.wait(this.options.typingSpeed);
        }

        // Pause after typing if specified
        if (sequence.pauseAfter) {
          await this.wait(sequence.pauseAfter);
        }

        // Delete the text if specified
        if (sequence.deleteAfter) {
          // Small pause before deleting
          await this.wait(500);

          for (let i = sequence.text.length; i > 0; i--) {
            if (!this.isActive) break;
            this.typewriterElement.textContent = sequence.text.slice(0, i);
            await this.wait(this.options.typingSpeed / 2);
          }
        }
      }

      if (!this.options.autoLoop || !this.isActive) break;

      // Wait before starting next loop
      await this.wait(this.options.loopDelay);
    }
  }

  /**
   * Helper method to create a promise that resolves after a delay
   * @param {number} ms - Delay in milliseconds
   * @returns {Promise}
   */
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Stop the typewriter animation
   */
  destroy() {
    this.isActive = false;
  }
}

// Make it available globally
window.TypewriterTitle = TypewriterTitle;