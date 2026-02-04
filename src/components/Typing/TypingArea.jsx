import React, { useRef, useState, useEffect } from 'react';
import styles from './TypingArea.module.css';
import classNames from 'classnames';
import iconReset from './../../assets/images/icon-restart.svg';

const TypingArea = ({ text, cursor, typedHistory, active, status, isFocused, setIsFocused, onRestart }) => {
    // We want to keep the cursor in view if text is long (auto-scroll)
    const containerRef = useRef(null);

    // Internal state moved to parent (App.jsx)
    // const [isFocused, setIsFocused] = useState(false);

    // Derived state: Show overlay if idle and not focused
    // Note: If status becomes 'running' (user typed), overlay hides automatically via status check
    const showOverlay = status === 'idle' && !isFocused;

    const handleStartClick = () => {
        setIsFocused(true);
    };

    return (
        <>
            <div className={styles.typingWrapper} onClick={handleStartClick}>
                <div className={styles.textContainer} ref={containerRef}>
                    <p className={classNames(styles.passageText, { [styles.blurred]: showOverlay })}>
                        {text.split('').map((char, index) => {
                            // Determine state of this character
                            let charClass = styles.char;

                            if (index < cursor) {
                                const typed = typedHistory[index];
                                if (typed === char) {
                                    charClass = classNames(styles.char, styles.correct);
                                } else {
                                    charClass = classNames(styles.char, styles.incorrect);
                                }
                            } else if (index === cursor && active && !showOverlay) {
                                // Only show active cursor if overlay is gone
                                charClass = classNames(styles.char, styles.active);
                            }

                            return (
                                <span key={index} className={charClass}>
                                    {char}
                                </span>
                            );
                        })}
                    </p>
                </div>

                {/* Start Overlay */}
                {showOverlay && (
                    <div className={styles.startOverlay}>
                        <button className={styles.startButton} onClick={(e) => {
                            e.stopPropagation(); // prevent wrapper click double trigger
                            handleStartClick();
                        }}>
                            Start Typing Test
                        </button>
                        <p className={styles.startInstructions}>Or click the text and start typing</p>
                    </div>
                )}

                {!active && status === 'finished' && (
                    <div className={styles.overlay}>
                        <p>Test Finished! Check your results.</p>
                    </div>
                )}

            </div>
            {/* Active Restart Button (Only when running) */}
            {status === 'running' && (
                <div className={styles.activeRestartContainer}>
                    <button className={styles.activeRestartButton} onClick={(e) => {
                        e.stopPropagation();
                        onRestart();
                    }}>
                        Restart Test
                        <img src={iconReset} alt="Restart" />
                    </button>
                </div>
            )} </>
    );
};

export default TypingArea;
