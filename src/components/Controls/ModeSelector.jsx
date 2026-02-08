import React from 'react';
import classNames from 'classnames';
import styles from './Controls.module.css';
import CustomDropdown from './CustomDropdown';

const ModeSelector = ({ currentMode, onChange }) => {
    // modes: 'timed' | 'passage'
    const options = [
        { value: 'timed', label: 'Timed (60s)' },
        { value: 'passage', label: 'Passage' }
    ];

    return (
        <div className={styles.selectorContainer}>
            <span className={styles.label}>Mode:</span>
            <div className={styles.pills}>
                <button
                    className={classNames(styles.pill, {
                        [styles.active]: currentMode === 'timed'
                    })}
                    onClick={() => onChange('timed')}
                >
                    Timed (60s)
                </button>
                <button
                    className={classNames(styles.pill, {
                        [styles.active]: currentMode === 'passage'
                    })}
                    onClick={() => onChange('passage')}
                >
                    Passage
                </button>
            </div>
            <CustomDropdown
                label="Mode"
                value={currentMode}
                options={options}
                onChange={onChange}
            />
        </div>
    );
};

export default ModeSelector;
