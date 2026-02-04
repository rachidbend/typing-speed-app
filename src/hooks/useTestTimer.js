import { useState, useEffect, useRef, useCallback } from 'react';

const useTestTimer = (mode = 'timed', duration = 60) => {
    // Mode: 'timed' (countdown) or 'passage' (count up)
    const [timeLeft, setTimeLeft] = useState(mode === 'timed' ? duration : 0);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const intervalRef = useRef(null);

    const startTimer = useCallback(() => {
        if (isRunning) return;
        setIsRunning(true);
        setIsFinished(false);
    }, [isRunning]);

    const stopTimer = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsRunning(false);
    }, []);

    const resetTimer = useCallback(() => {
        stopTimer();
        setIsFinished(false);
        setTimeLeft(mode === 'timed' ? duration : 0);
    }, [mode, duration, stopTimer]);

    useEffect(() => {
        if (isRunning && !isFinished) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (mode === 'timed') {
                        if (prev <= 1) {
                            stopTimer();
                            setIsFinished(true);
                            return 0;
                        }
                        return prev - 1;
                    } else {
                        // Passage mode: Count up
                        return prev + 1;
                    }
                });
            }, 1000);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning, isFinished, mode, stopTimer]);

    // Initial reset if mode changes
    useEffect(() => {
        resetTimer();
    }, [mode, duration, resetTimer]);

    return {
        timeLeft,
        isRunning,
        isFinished,
        startTimer,
        stopTimer,
        resetTimer
    };
};

export default useTestTimer;
