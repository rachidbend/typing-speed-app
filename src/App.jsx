import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard'; // New Component
import TypingArea from './components/Typing/TypingArea';
import ResultsModal from './components/Modals/ResultsModal';
import { getPassage } from './utils/textGenerator';
import useTypingEngine from './hooks/useTypingEngine';
import useTestTimer from './hooks/useTestTimer';
import useGameSettings from './hooks/useGameSettings'; // New Hook
import { calculateWPM, calculateAccuracy } from './utils/scoreHelpers';

function App() {
    // Logic extracted to custom hook -> Clean & Separted
    const {
        difficulty,
        setDifficulty,
        mode,
        setMode,
        personalBest,
        previousBest,
        updatePersonalBest,
        resetNewBestFlag
    } = useGameSettings();

    // Game State
    const [targetText, setTargetText] = useState('');
    const [isNewBest, setIsNewBest] = useState(false);
    // Lifted state for Start Overlay interaction
    const [isFocused, setIsFocused] = useState(false);

    // Hooks
    const {
        cursor,
        typedHistory,
        status: typingStatus,
        setStatus: setTypingStatus,
        correctCharCount,
        totalTypedKeys,
        errorCount,
        handleKeyDown,
        resetEngine
    } = useTypingEngine(targetText);

    const {
        timeLeft,
        isRunning: isTimerRunning,
        startTimer,
        stopTimer,
        resetTimer
    } = useTestTimer(mode, 60);

    // Initial Load & Reset logic
    const startNewTest = useCallback(() => {
        const newText = getPassage(difficulty);
        setTargetText(newText);
        resetNewBestFlag();
        setIsFocused(false); // Reset focus state for overlay
        resetEngine();
        resetTimer();
    }, [difficulty, resetEngine, resetTimer, resetNewBestFlag]);

    // Effect: Load text on mount or difficulty change
    useEffect(() => {
        startNewTest();
    }, [difficulty, startNewTest]);

    // Effect: Sync Timer with Typing Status
    useEffect(() => {
        if (typingStatus === 'running' && !isTimerRunning) {
            startTimer();
        } else if (typingStatus === 'finished') {
            stopTimer();
        }
    }, [typingStatus, isTimerRunning, startTimer, stopTimer]);

    // Effect: Handle Timer Finish (Timed Mode)
    useEffect(() => {
        if (timeLeft === 0 && mode === 'timed' && typingStatus === 'running') {
            setTypingStatus('finished');
        }
    }, [timeLeft, mode, typingStatus, setTypingStatus]);

    // Real-time Stats Calculation
    const timeElapsed = mode === 'timed' ? (60 - timeLeft) : timeLeft;
    const wpm = calculateWPM(correctCharCount, timeElapsed);
    const accuracy = calculateAccuracy(correctCharCount, totalTypedKeys);

    // High Score Logic
    useEffect(() => {
        if (typingStatus === 'finished') {
            updatePersonalBest(wpm);

        }
    }, [typingStatus, wpm, updatePersonalBest]);

    // Global Key Handler Wrapper to intercept first key if not focused
    const handleGlobalKeyDown = useCallback((e) => {
        const targetTag = e.target?.tagName;
        if (targetTag === 'INPUT' || targetTag === 'TEXTAREA') {
            return;
        }

        // If test is finished, ignore
        if (typingStatus === 'finished') return;

        // If overlay is showing (not focused)
        if (!isFocused) {
            // Any key press dismisses overlay/focuses app
            setIsFocused(true);
            return; // SWALLOW this key press so it doesn't type
        }

        // precise logic: If status is idle and we are focused, standard behavior.
        // If status is idle and NOT focused, we focus and return.

        handleKeyDown(e);
    }, [isFocused, typingStatus, handleKeyDown]);

    useEffect(() => {
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [handleGlobalKeyDown]);

    // Handle Restart
    const handleRestart = () => {
        startNewTest();
    };



    return (
        <div className="layout-container">
            {/* Header Section */}
            <Header personalBest={personalBest} />

            {/* Main Content Area: Dashboard + TypingArea OR Results */}
            {typingStatus === 'finished' ? (
                <ResultsModal
                    wpm={wpm}
                    accuracy={accuracy}
                    time={timeElapsed}
                    isNewBest={isNewBest}
                    onRestart={handleRestart}
                    correctCharCount={correctCharCount}
                    errorCount={errorCount}
                />
            ) : (
                <div className="flex flex-col gap-8 w-full">
                    {/* Dashboard (Stats & Controls) */}
                    <Dashboard
                        wpm={wpm}
                        accuracy={accuracy}
                        time={timeLeft}
                        mode={mode}
                        difficulty={difficulty}
                        setDifficulty={setDifficulty}
                        setMode={setMode}
                        onRestart={handleRestart}
                    />

                    {/* Typing Area */}
                    <TypingArea
                        text={targetText}
                        cursor={cursor}
                        typedHistory={typedHistory}
                        active={typingStatus !== 'finished'}
                        status={typingStatus}
                        isFocused={isFocused}
                        setIsFocused={setIsFocused}
                        onRestart={handleRestart}
                        onInputKey={handleKeyDown}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
