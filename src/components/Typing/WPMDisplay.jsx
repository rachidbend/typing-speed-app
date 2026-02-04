import React from 'react';
import styles from './Typing.module.css';

const WPMDisplay = ({ wpm }) => {
    return (
        <div className={styles.statBox}>
            <span className={styles.statLabel}>WPM:</span>
            <span className={styles.statValue}>
                {wpm}

            </span>
        </div>
    );
};

export default WPMDisplay;
