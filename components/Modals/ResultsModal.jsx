import React, { useEffect } from 'react';
import styles from './ResultsModal.module.css';
import confetti from 'canvas-confetti';
import iconReset from './../../assets/images/icon-restart-dark.svg';

const ResultsModal = ({ wpm, accuracy, time, isNewBest, onRestart, correctCharCount, errorCount }) => {

    // (Confetti logic removal or refactor can happen here if we are sticking strictly to "Regular" screen for now.
    // The user said "Regular" first, so I will prioritize the "Regular" look without confetti for this specific task, 
    // or keep it minimal if existing logic is there.)
    // User said: "start by implementing the first regular one" (Image 1).
    // Image 1 does NOT show confetti. Image 3 does.
    // So I will likely comment out confetti for now or wrap it in checks.

    // Actually, I'll keep the confetti hook but only trigger if we decide to pass isNewBest.
    // But the user requests specific "Regular" implementation first.
    // I will adhere to the layout structure: Icon -> Title -> Subtitle -> Stats Grid -> Button.

    // Checkmark Icon SVG
    const CheckIcon = () => (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="32" fill="#1C1C1C" />
            <circle cx="32" cy="32" r="24" fill="#2E7D32" fillOpacity="0.2" />
            <circle cx="32" cy="32" r="16" fill="#4CAF50" />
            <path d="M23 32L29 38L41 26" stroke="#121212" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <div className={styles.container}>
            <div className={styles.iconWrapper}>
                <CheckIcon />
            </div>

            {/* Decorative Stars */}
            <div className={styles.starLeft}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#ef4444" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round" />
                </svg>
            </div>
            <div className={styles.starRight}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 2L18 14L30 16L18 18L16 30L14 18L2 16L14 14L16 2Z" fill="#FACC15" />
                </svg>
            </div>

            <h2 className={styles.title}>Test Complete!</h2>
            <p className={styles.subtitle}>Solid run. Keep pushing to beat your high score.</p>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <span className={styles.label}>WPM:</span>
                    <span className={styles.value}>{wpm}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.label}>Accuracy:</span>
                    <span className={styles.valueError}>{accuracy}%</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.label}>Characters</span>
                    <span className={styles.valueChars}>
                        <span className={styles.charCorrect}>{correctCharCount}</span>
                        <span className={styles.charDivider}>/</span>
                        <span className={styles.charError}>{errorCount || 0}</span>
                    </span>
                </div>
            </div>

            <button className={styles.restartButton} onClick={onRestart}>
                Go Again
                <img src={iconReset} alt="Restart" />
            </button>
        </div>
    );
};

export default ResultsModal;
