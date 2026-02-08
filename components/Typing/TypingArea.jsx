import React, { useRef, useEffect } from 'react';
import styles from './TypingArea.module.css';
import classNames from 'classnames';
import iconReset from './../../assets/images/icon-restart.svg';

const TypingArea = ({ text, cursor, typedHistory, active, status, isFocused, setIsFocused, onRestart, onInputKey }) => {
    // We want to keep the cursor in view if text is long (auto-scroll)
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    // Internal state moved to parent (App.jsx)
    // const [isFocused, setIsFocused] = useState(false);

    // Derived state: Show overlay if idle and not focused
    // Note: If status becomes 'running' (user typed), overlay hides automatically via status check
    const showOverlay = status === 'idle' && !isFocused;

    const focusInput = () => {
        if (inputRef.current) {
            try {
                inputRef.current.focus({ preventScroll: true });
            } catch {
                inputRef.current.focus();
            }
        }
    };

    const shouldHandleVirtualInput = () => {
        if (typeof window === 'undefined' || !window.matchMedia) return false;
        return window.matchMedia('(pointer: coarse)').matches;
    };

    const handleStartClick = () => {
        setIsFocused(true);
        focusInput();
    };

    useEffect(() => {
        if (isFocused && status !== 'finished') {
            focusInput();
        }

        if (status === 'finished') {
            inputRef.current?.blur();
        }
    }, [isFocused, status]);

    const handleBeforeInput = (event) => {
        if (!onInputKey) return;
        if (!shouldHandleVirtualInput()) return;
        const { data, inputType } = event.nativeEvent;

        console.log('[TypingArea] beforeinput', { inputType, data });

        if (inputType === 'deleteContentBackward') {
            onInputKey({ key: 'Backspace' });
        }
    };

    const handleInputKeyDown = (event) => {
        if (!onInputKey) return;
        if (shouldHandleVirtualInput()) return;

        onInputKey(event);
        event.stopPropagation();
    };

    return (
        <>
            <div
                className={styles.typingWrapper}
                onClick={handleStartClick}
                onTouchStart={handleStartClick}
            >
                <input
                    ref={inputRef}
                    className={styles.mobileInput}
                    inputMode="text"
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="Typing input"
                    onBeforeInput={handleBeforeInput}
                    onKeyDown={handleInputKeyDown}
                    onInput={(e) => {
                        if (onInputKey && shouldHandleVirtualInput()) {
                            const value = e.currentTarget.value;
                            if (value) {
                                console.log('[TypingArea] input', { value });
                                [...value].forEach((char) => {
                                    onInputKey({ key: char });
                                });
                            }
                        }

                        e.currentTarget.value = '';
                    }}
                />
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
                        <button
                            className={styles.startButton}
                            onClick={(e) => {
                                e.stopPropagation(); // prevent wrapper click double trigger
                                handleStartClick();
                            }}
                            onTouchStart={(e) => {
                                e.stopPropagation();
                                handleStartClick();
                            }}
                        >
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
