import React from 'react';
import styles from './Header.module.css';

const Header = ({ title, elements = [] }) => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1>{title}</h1>
                <nav>
                    {elements.map((element, index) => (
                        <div key={index}>{element}</div>
                    ))}
                </nav>
            </div>
        </header>
    );
};



export default Header;
