import React from 'react';
import classNames from 'classnames';
import styles from './Controls.module.css';
import CustomDropdown from './CustomDropdown';

const DifficultySelector = ({ currentDifficulty, onChange }) => {
    const difficulties = ['easy', 'medium', 'hard'];
    const options = difficulties.map((diff) => ({
        value: diff,
        label: diff.charAt(0).toUpperCase() + diff.slice(1)
    }));

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
            <CustomDropdown
                label="Difficulty"
                value={currentDifficulty}
                options={options}
                onChange={onChange}
            />
        </div>
    );
};

export default DifficultySelector;
