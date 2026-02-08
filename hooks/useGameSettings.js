import { useState, useEffect, useCallback } from 'react';

const useGameSettings = () => {
    // Configuration State
    const [difficulty, setDifficulty] = useState('medium');
    const [mode, setMode] = useState('timed'); // 'timed' or 'passage'

    // Persistence State
    const [personalBest, setPersonalBest] = useState(() => {
        try {
            return parseInt(localStorage.getItem('typing_pb') || '0', 10);
        } catch (error) {
            console.error("Failed to read personal best from localStorage:", error);
            return 0;
        }
    });

    const [isNewBest, setIsNewBest] = useState(false);
    const [previousBest, setPreviousBest] = useState(0);

    // Update Personal Best
    const updatePersonalBest = useCallback((wpm) => {
        if (wpm > personalBest) {
            setPreviousBest(personalBest); // Store what it was before update
            setPersonalBest(wpm);
            setIsNewBest(true);
            try {
                localStorage.setItem('typing_pb', wpm.toString());
            } catch (error) {
                console.error("Failed to save personal best to localStorage:", error);
            }
            return true; // Indicates a new record
        }
        return false;
    }, [personalBest]);

    // Reset "New Best" flag (e.g., on restart)
    const resetNewBestFlag = useCallback(() => {
        setIsNewBest(false);
        // We can keep previousBest until next update
    }, []);

    return {
        difficulty,
        setDifficulty,
        mode,
        setMode,
        personalBest,
        isNewBest,
        previousBest, // Export this
        updatePersonalBest,
        resetNewBestFlag
    };
};

export default useGameSettings;
