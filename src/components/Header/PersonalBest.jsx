import React from 'react';
import styles from './Header.module.css';
import iconTrophy from './../../assets/images/icon-personal-best.svg'

const PersonalBest = ({ wpm }) => {
    return (
        <div className={styles.personalBest}>
            <img src={iconTrophy} alt="Trophy icon" />
            <div>
                <span className={styles.pbTitle}>
                    <span className={styles.pbPersonal}>Personal </span>
                    <span className={styles.pbBestLabel}>best:</span>
                </span>
                <span className={styles.pbValue}>{wpm} WPM</span>
            </div>
        </div>
    );
};

export default PersonalBest;
