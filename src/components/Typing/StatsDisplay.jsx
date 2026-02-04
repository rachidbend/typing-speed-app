import React from 'react';
import WPMDisplay from './WPMDisplay';
import AccuracyDisplay from './AccuracyDisplay';
import TimeDisplay from './TimeDisplay';
import styles from './Typing.module.css';

const StatsDisplay = ({ wpm, accuracy, time, mode }) => {
    return (
        <div className={styles.statsContainer}>
            <WPMDisplay wpm={wpm} />
            <span className={styles.sepirationLine}></span>
            <AccuracyDisplay accuracy={accuracy} />
            <span className={styles.sepirationLine}></span>
            <TimeDisplay time={time} mode={mode} />
        </div>
    );
};

export default StatsDisplay;
