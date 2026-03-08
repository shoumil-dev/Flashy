"use client";

let hoverAudio: HTMLAudioElement | null = null;
let clickAudio: HTMLAudioElement | null = null;

if (typeof window !== "undefined") {
    hoverAudio = new Audio("/soft_bubble_hover.mp3");
    hoverAudio.volume = 0.2; // keep it subtle

    clickAudio = new Audio("/soft_click.mp3");
    clickAudio.volume = 0.3; // keep it subtle
}

export function playHoverSound() {
    if (hoverAudio) {
        hoverAudio.currentTime = 0;
        hoverAudio.play().catch(() => { });
    }
}

export function playClickSound() {
    if (clickAudio) {
        clickAudio.currentTime = 0;
        clickAudio.play().catch(() => { });
    }
}
