import React from 'react';
import classNames from 'classnames';
import styles from './Controls.module.css';

const DifficultySelector = ({ currentDifficulty, onChange }) => {
    const difficulties = ['easy', 'medium', 'hard'];

    return (
        <div className={styles.selectorContainer}>
            <span className={styles.label}>Difficulty:</span>
            <div className={styles.pills}>
                {difficulties.map((diff) => (
                    <button
                        key={diff}
                        className={classNames(styles.pill, {
                            [styles.active]: currentDifficulty === diff
                        })}
                        onClick={() => onChange(diff)}
                    >
                        {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DifficultySelector;
