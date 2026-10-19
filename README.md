# 📡 Dynamic Scroll Sentinel

> A highly performant, lightweight micro-engine for monitoring viewport scrolling tracking events using raw `IntersectionObserver` instead of memory-heavy scroll listeners.

## Features
*   **Zero Repaint Stress:** Avoids heavy rendering cycle pipelines by bypassing standard browser scroll-events completely.
*   **One-Time Execution Nodes:** Use attributes like `data-sentinel-once` to decouple layout animations right after the initial viewport entry.
*   **Batched Processing:** Maps structural tracking matrices without lagging memory allocations.

## Implementation Script
```javascript
import { DynamicScrollSentinel } from './sentinel.js';

const system = new DynamicScrollSentinel({ rootMargin: '-20px' });
const element = document.querySelector('#target-box');

system.watch(element, (target) => {
  target.classList.add('visible');
});
```
