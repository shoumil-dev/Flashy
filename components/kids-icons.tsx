import React from "react";

/* ─── Small inline SVG icons to replace emojis throughout the app ─── */

export const IconGradCap = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="#FFAA4C" />
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" fill="#FFD93D" />
  </svg>
);

export const IconSparkles = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#FFD93D" />
    <path d="M19 14L19.75 16.25L22 17L19.75 17.75L19 20L18.25 17.75L16 17L18.25 16.25L19 14Z" fill="#FFAA4C" />
    <path d="M5 2L5.5 3.5L7 4L5.5 4.5L5 6L4.5 4.5L3 4L4.5 3.5L5 2Z" fill="#FF8FAB" />
  </svg>
);

export const IconSearch = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10.5" cy="10.5" r="6.5" stroke="#7DD8F0" strokeWidth="2.5" fill="none" />
    <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="#7DD8F0" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const IconStar = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="#FFD93D" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l7.1-1.01L12 2z" />
  </svg>
);

export const IconBrain = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.5 2 6 4.5 6 7c0 1.5.5 2.5 1 3.5C5.5 11.5 4 13 4 15c0 2.5 2 4.5 4.5 4.8.3.1.5.2.5.2h6s.2-.1.5-.2C18 19.5 20 17.5 20 15c0-2-1.5-3.5-3-4.5.5-1 1-2 1-3.5 0-2.5-2.5-5-6-5z" fill="#FF8FAB" opacity="0.85" />
    <path d="M12 2v20" stroke="#FFFBE6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <path d="M9 7c-1 1-1 3 0 4" stroke="#FFFBE6" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    <path d="M15 7c1 1 1 3 0 4" stroke="#FFFBE6" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

export const IconFlask = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3h6v5l4 8c.6 1.2-.2 2.7-1.6 2.7H6.6C5.2 18.7 4.4 17.2 5 16L9 8V3z" fill="#7DD8F0" opacity="0.8" />
    <rect x="9" y="2" width="6" height="2" rx="1" fill="#5BA8C0" />
    <path d="M7 14h10" stroke="#FFFBE6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <circle cx="10" cy="16" r="1" fill="#6DC87A" />
    <circle cx="14" cy="15" r="0.8" fill="#FFAA4C" />
  </svg>
);

export const IconMicroscope = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="2" width="4" height="10" rx="2" fill="#6DC87A" />
    <circle cx="12" cy="14" r="4" stroke="#6DC87A" strokeWidth="2" fill="none" />
    <line x1="8" y1="20" x2="16" y2="20" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <line x1="12" y1="18" x2="12" y2="20" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

export const IconLightbulb = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" fill="#FFD93D" />
    <rect x="9" y="19" width="6" height="2" rx="1" fill="#FFAA4C" />
    <line x1="12" y1="2" x2="12" y2="0" stroke="#FFD93D" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="19" y1="5" x2="20.5" y2="3.5" stroke="#FFD93D" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="5" y1="5" x2="3.5" y2="3.5" stroke="#FFD93D" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export const IconGlobe = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" fill="#7DD8F0" opacity="0.8" />
    <ellipse cx="12" cy="12" rx="4" ry="9" stroke="#6DC87A" strokeWidth="1.5" fill="none" opacity="0.7" />
    <line x1="3" y1="12" x2="21" y2="12" stroke="#6DC87A" strokeWidth="1.5" opacity="0.5" />
    <line x1="5" y1="7" x2="19" y2="7" stroke="#6DC87A" strokeWidth="1" opacity="0.3" />
    <line x1="5" y1="17" x2="19" y2="17" stroke="#6DC87A" strokeWidth="1" opacity="0.3" />
  </svg>
);

export const IconRocket = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 8 6 8 14l4 4 4-4c0-8-4-12-4-12z" fill="#FFAA4C" />
    <circle cx="12" cy="11" r="2" fill="#FFFBE6" />
    <path d="M8 14l-3 2 1-4" fill="#FF8FAB" opacity="0.8" />
    <path d="M16 14l3 2-1-4" fill="#FF8FAB" opacity="0.8" />
    <path d="M10 18l2 4 2-4" fill="#FFD93D" opacity="0.9" />
  </svg>
);

export const IconBolt = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="#FFAA4C" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
  </svg>
);

export const IconTarget = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#FF8FAB" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="5.5" stroke="#FFAA4C" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="2" fill="#FF6B6B" />
  </svg>
);

export const IconCompass = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#7DD8F0" strokeWidth="2" fill="none" />
    <polygon points="12,4 14,10 12,12 10,10" fill="#FF6B6B" />
    <polygon points="12,20 10,14 12,12 14,14" fill="#7DD8F0" />
  </svg>
);

export const IconTelescope = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 6L10 13" stroke="#B49AFF" strokeWidth="3" strokeLinecap="round" />
    <circle cx="22" cy="5" r="2" fill="#B49AFF" opacity="0.6" />
    <line x1="10" y1="13" x2="7" y2="21" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <line x1="10" y1="13" x2="15" y2="21" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

export const IconTrophy = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 4h10v6c0 2.76-2.24 5-5 5s-5-2.24-5-5V4z" fill="#FFD93D" />
    <path d="M7 4H4v4c0 1.66 1.34 3 3 3V4z" fill="#FFAA4C" opacity="0.7" />
    <path d="M17 4h3v4c0 1.66-1.34 3-3 3V4z" fill="#FFAA4C" opacity="0.7" />
    <rect x="10" y="15" width="4" height="3" fill="#FFAA4C" />
    <rect x="8" y="18" width="8" height="2" rx="1" fill="#FFAA4C" />
  </svg>
);

export const IconMedal = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2l4 6 4-6" stroke="#7DD8F0" strokeWidth="2" fill="none" />
    <circle cx="12" cy="14" r="6" fill="#FFD93D" />
    <path d="M12 10l1.3 2.8 3 .4-2.2 2.1.5 3-2.6-1.4-2.6 1.4.5-3-2.2-2.1 3-.4L12 10z" fill="#FFAA4C" />
  </svg>
);

export const IconBook = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4C4 4 7 2 12 5C17 2 20 4 20 4V20C20 20 17 18 12 21C7 18 4 20 4 20V4Z" fill="#7DD8F0" opacity="0.3" />
    <path d="M4 4C4 4 7 2 12 5V21C7 18 4 20 4 20V4Z" fill="#6DC87A" opacity="0.6" />
    <path d="M20 4C20 4 17 2 12 5V21C17 18 20 20 20 20V4Z" fill="#7DD8F0" opacity="0.6" />
  </svg>
);

export const IconConfetti = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="14" width="3" height="7" rx="1" fill="#6DC87A" transform="rotate(-15 4.5 17.5)" />
    <circle cx="8" cy="6" r="1.5" fill="#FFD93D" />
    <circle cx="16" cy="4" r="1" fill="#FF8FAB" />
    <circle cx="19" cy="8" r="1.3" fill="#7DD8F0" />
    <rect x="13" y="6" width="2" height="2" rx="0.5" fill="#FFAA4C" transform="rotate(20 14 7)" />
    <rect x="5" y="10" width="1.5" height="1.5" rx="0.3" fill="#B49AFF" transform="rotate(-10 5.75 10.75)" />
    <path d="M18 12l1 3" stroke="#6DC87A" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 14l-2 1" stroke="#FFD93D" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconFlexBicep = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 16C6 16 5 12 6 9C7 6 10 4 12 6C14 8 15 6 16 7C17 8 18 10 17 14C16 18 12 19 10 18C8 17 6 16 6 16Z" fill="#FFAA4C" />
    <path d="M11 8C13 7 14.5 8 15 10C15.5 12 14 13 12 13" stroke="#E8993F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);
