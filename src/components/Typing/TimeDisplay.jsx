import React from 'react';
import styles from './Typing.module.css';

const TimeDisplay = ({ time, mode }) => {
    // Format time? If seconds: 0:60
    // Time is likely passed as seconds integer.
    const formatTime = (seconds) => {
        // Basic formatting
        return `0:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className={styles.statBox}>
            <span className={styles.statLabel}>Time:</span>
            <span className={`${styles.statValue} ${styles.highlightTime}`}>
                {formatTime(time)}
            </span>
        </div>
    );
};

export default TimeDisplay;
