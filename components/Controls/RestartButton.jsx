import React from 'react';
import restartIcon from '../../assets/images/icon-restart.svg';
import styles from './Controls.module.css';

const RestartButton = ({ onRestart }) => {
    return (
        <button className={styles.restartButton} onClick={onRestart} aria-label="Restart Test">
            <img src={restartIcon} alt="" />
        </button>
    );
};

export default RestartButton;
