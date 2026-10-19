export class DynamicScrollSentinel {
  constructor(options = {}) {
    this.rootMargin = options.rootMargin || '0px';
    this.threshold = options.threshold || 0.1;
    this.observer = null;
    this.callbacks = new Map();
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const callback = this.callbacks.get(target);
          
          if (callback) {
            callback(target, entry);
          }

          // If it's a single-reveal animation, stop observing immediately to save memory
          if (target.hasAttribute('data-sentinel-once')) {
            this.unwatch(target);
          }
        }
      });
    }, {
      rootMargin: this.rootMargin,
      threshold: this.threshold
    });
  }

  /**
   * Bind an element to a trigger action when entering viewport
   * @param {HTMLElement} element 
   * @param {Function} callback 
   */
  watch(element, callback) {
    if (!element) return;
    this.callbacks.set(element, callback);
    this.observer.observe(element);
  }

  unwatch(element) {
    if (!element) return;
    this.observer.unobserve(element);
    this.callbacks.delete(element);
  }

  destroy() {
    this.observer.disconnect();
    this.callbacks.clear();
  }
}
