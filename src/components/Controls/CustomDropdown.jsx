import React, { useEffect, useRef, useState, useId } from 'react';
import classNames from 'classnames';
import styles from './Controls.module.css';
import iconDown from '../../assets/images/icon-down-arrow.svg';

const CustomDropdown = ({ label, value, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);
    const buttonId = useId();
    const listId = useId();

    const currentOption = options.find((option) => option.value === value) || options[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className={styles.dropdownWrapper} ref={wrapperRef}>
            <button
                type="button"
                className={classNames(styles.dropdownButton, {
                    [styles.dropdownButtonOpen]: isOpen
                })}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={listId}
                aria-label={label}
                id={buttonId}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span className={styles.dropdownValue}>{currentOption?.label}</span>
                <img className={styles.dropdownChevron} src={iconDown} alt="" aria-hidden="true" />
            </button>

            {isOpen && (
                <ul className={styles.dropdownMenu} role="listbox" id={listId} aria-labelledby={buttonId}>
                    {options.map((option) => {
                        const isActive = option.value === value;
                        return (
                            <li key={option.value} className={styles.dropdownItem}>
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={isActive}
                                    className={classNames(styles.dropdownOption, {
                                        [styles.dropdownOptionActive]: isActive
                                    })}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                >
                                    <span
                                        className={classNames(styles.optionIndicator, {
                                            [styles.optionIndicatorActive]: isActive
                                        })}
                                    />
                                    <span
                                        className={classNames(styles.optionText, {
                                            [styles.optionTextActive]: isActive
                                        })}
                                    >
                                        {option.label}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown;
