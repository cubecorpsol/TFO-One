import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@tabler/icons-webfont/dist/tabler-icons.min.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// ── Service Worker Management ──────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  if (import.meta.env.DEV) {
    // In development: unregister all SWs and clear all caches ONCE.
    // Use sessionStorage to prevent an infinite reload loop.
    const SW_CLEARED_KEY = 'tfo_sw_cleared';
    if (!sessionStorage.getItem(SW_CLEARED_KEY)) {
      sessionStorage.setItem(SW_CLEARED_KEY, '1');

      Promise.all([
        // 1. Unregister all service workers
        navigator.serviceWorker.getRegistrations().then((registrations) =>
          Promise.all(registrations.map((r) => r.unregister()))
        ),
        // 2. Delete ALL caches
        caches.keys().then((keys) =>
          Promise.all(keys.map((key) => caches.delete(key)))
        )
      ]).then(([swResults]) => {
        const anyUnregistered = swResults.flat().some(Boolean);
        if (anyUnregistered) {
          console.log('[TFO Dev] Service Workers cleared & caches wiped. Reloading once...');
          window.location.reload();
        }
      });
    }
  } else {
    // In production: register the service worker for PWA caching
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('Service Worker registered:', reg.scope))
        .catch((err) => console.error('Service worker registration failed:', err));
    });
  }
}


