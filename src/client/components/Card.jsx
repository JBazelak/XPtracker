import React from 'react';
import styles from './Card.module.css'

const Features = ({ title, text, elements = [] }) => {
    return (
        <section className={styles.section}>
            <h2>{title}</h2>
            <p>{text}</p>
            <div>
                {elements.map((element, index) => (
                    <div key={index}>{element}</div>
                ))}
            </div>
        </section>
    );
};



export default Features;
