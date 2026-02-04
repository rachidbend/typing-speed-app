import React from 'react';
import logo from '../../assets/images/logo-large.svg';
// We don't import styles here directly to avoid conflict, relying on parent class or inline if specific size needed.
// actually Header.module.css targets .logo img maybe? 
// Blueprint said: Icon must be perfectly square 24x24 px on desktop.
// Let's enforce size here or via class.

const Logo = () => {
    return (
        <div>
            <img src={logo} alt="Typing Speed Test" />
        </div>
    );
};

export default Logo;
