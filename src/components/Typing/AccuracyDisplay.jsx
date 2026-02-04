import React from 'react';
import styles from './Typing.module.css';

const AccuracyDisplay = ({ accuracy }) => {
    return (
        <div className={styles.statBox}>
            <span className={styles.statLabel}>Accuracy:</span>
            <span className={`${styles.statValue} ${styles.accuracyPercent}`}>
                {accuracy}%</span>
        </div>
    );
};

export default AccuracyDisplay;
