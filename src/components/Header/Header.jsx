import React from 'react';
import Logo from './Logo';
import PersonalBest from './PersonalBest';
import styles from './Header.module.css';

const Header = ({ personalBest = 0 }) => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.brandInfo}>
                <Logo />
            </div>
            <PersonalBest wpm={personalBest} />
        </header>
    );
};

export default Header;
