import React from 'react';
import logoLarge from '../../assets/images/logo-large.svg';
import logoSmall from '../../assets/images/logo-small.svg';
import styles from './Logo.module.css';

const Logo = () => {
    return (
        <div className={styles.logoWrapper}>
            <picture>
                <source media="(max-width: 640px)" srcSet={logoSmall} />
                <img className={styles.logoImage} src={logoLarge} alt="Typing Speed Test" />
            </picture>
        </div>
    );
};

export default Logo;
