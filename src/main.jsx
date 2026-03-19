import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Web Vitals monitoring (dev only)
if (import.meta.env.DEV) {
  const reportVital = (name, value, rating) => {
    console.log(`[Web Vital] ${name}: ${Math.round(value)}ms — ${rating}`);
  };

  // LCP
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const last = entries[entries.length - 1];
    const v = last.startTime;
    reportVital('LCP', v, v < 2500 ? 'good' : v < 4000 ? 'needs-improvement' : 'poor');
  }).observe({ type: 'largest-contentful-paint', buffered: true });

  // FID / INP
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const v = entry.processingStart - entry.startTime;
      reportVital('FID', v, v < 100 ? 'good' : v < 300 ? 'needs-improvement' : 'poor');
    }
  }).observe({ type: 'first-input', buffered: true });

  // CLS
  let clsValue = 0;
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) clsValue += entry.value;
    }
    const rating = clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor';
    console.log(`[Web Vital] CLS: ${clsValue.toFixed(4)} — ${rating}`);
  }).observe({ type: 'layout-shift', buffered: true });
}
