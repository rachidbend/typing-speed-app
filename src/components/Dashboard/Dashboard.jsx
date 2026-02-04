import React from 'react';
import StatsDisplay from '../Typing/StatsDisplay';
import TestControls from '../Controls/TestControls';
import styles from './../Typing/Typing.module.css';

/**
 * Dashboard Component
 * Renders the primary game status indicators and controls.
 */
const Dashboard = ({
    wpm,
    accuracy,
    time,
    mode,
    difficulty,
    setDifficulty,
    setMode,
    onRestart
}) => {
    return (
        <div className={styles.dashboard}>
            {/* Stats Section */}
            <StatsDisplay
                wpm={wpm}
                accuracy={accuracy}
                time={time}
                mode={mode}
            />

            {/* Controls Section */}
            <TestControls
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                mode={mode}
                setMode={setMode}
                onRestart={onRestart}
            />
        </div>
    );
};

export default Dashboard;
