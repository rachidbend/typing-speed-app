import { useState, useCallback, useEffect } from 'react';
import { calculateWPM, calculateAccuracy } from '../utils/scoreHelpers';

/**
 * Hook to manage the typing state.
 * @param {string} text - The target text to type.
 */
const useTypingEngine = (text) => {
    const [cursor, setCursor] = useState(0);
    const [typedHistory, setTypedHistory] = useState({}); // Map index -> char typed
    // typedHistory stores the character user typed at that index. 
    // If undefined, not typed yet.

    const [status, setStatus] = useState('idle'); // idle, running, finished

    // Stats tracking
    const [errorCount, setErrorCount] = useState(0); // "original errors still count"
    const [totalTypedKeys, setTotalTypedKeys] = useState(0); // For strict accuracy calc

    // Derived stats
    const [correctCharCount, setCorrectCharCount] = useState(0);

    const resetEngine = useCallback(() => {
        setCursor(0);
        setTypedHistory({});
        setStatus('idle');
        setErrorCount(0);
        setTotalTypedKeys(0);
        setCorrectCharCount(0);
        console.log("Typing Engine Reset");
    }, []);

    const handleKeyDown = useCallback((e) => {
        // If finished, ignore
        if (status === 'finished') return;

        const { key } = e;

        // Ignore modifier keys, etc.
        if (key === 'Shift' || key === 'Control' || key === 'Alt' || key === 'Meta') return;

        // Start on first valid key (if not modifier)
        if (status === 'idle' && key.length === 1) {
            setStatus('running');
            console.log("Typing Started");
        }

        if (key === 'Backspace') {
            if (cursor > 0) {
                setCursor((prev) => prev - 1);
                // "original errors still count", so we don't decrement errorCount
                // But we update visual history to remove the char at previous index
                setTypedHistory((prev) => {
                    const newHistory = { ...prev };
                    delete newHistory[cursor - 1];
                    return newHistory;
                });
                // Update correct count if we just deleted a correct char
                // (visual only, strict stats might vary based on requirement interpretation)
                // Let's re-calculate correctCharCount based on current History state?
                // Actually, easier to track incrementally.
                // If we backspace, we lose a potentially correct char.
            }
            return;
        }

        // Handle regular characters
        if (key.length === 1) {
            const expectedChar = text[cursor];

            // Log key press for debugging as requested
            // console.log(`Typed: '${key}', Expected: '${expectedChar}' at ${cursor}`);

            setTypedHistory((prev) => ({ ...prev, [cursor]: key }));
            setTotalTypedKeys((prev) => prev + 1);

            if (key === expectedChar) {
                // Correct
                // setCorrectCharCount is derived or updated?
            } else {
                // Formatting error
                setErrorCount((prev) => prev + 1);
            }

            // Move cursor
            const nextCursor = cursor + 1;
            setCursor(nextCursor);

            // Check completion
            if (nextCursor >= text.length) {
                setStatus('finished');
                console.log("Test Finished via Completion");
            }
        }
    }, [cursor, status, text]);

    // Recalculate correct chars based on current history and text
    // This handles the "Backspacing a correct char removes it from correct count" automatically
    useEffect(() => {
        let correct = 0;
        Object.keys(typedHistory).forEach((index) => {
            if (typedHistory[index] === text[parseInt(index)]) {
                correct++;
            }
        });
        setCorrectCharCount(correct);
    }, [typedHistory, text]);

    return {
        cursor,
        typedHistory,
        status,
        setStatus,
        correctCharCount,
        totalTypedKeys,
        errorCount, // Exposed for final stats if needed
        handleKeyDown,
        resetEngine
    };
};

export default useTypingEngine;
