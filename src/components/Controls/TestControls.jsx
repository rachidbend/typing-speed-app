import React from 'react';
import DifficultySelector from './DifficultySelector';
import ModeSelector from './ModeSelector';
import RestartButton from './RestartButton';
import styles from './Controls.module.css';

const TestControls = ({
    difficulty,
    setDifficulty,
    mode,
    setMode,
    onRestart
}) => {
    return (
        <div className={styles.controlsBar}>

            <DifficultySelector currentDifficulty={difficulty} onChange={setDifficulty} />
            <span className={styles.sepirationLine}></span>
            <ModeSelector currentMode={mode} onChange={setMode} />

        </div>
    );
};

export default TestControls;
