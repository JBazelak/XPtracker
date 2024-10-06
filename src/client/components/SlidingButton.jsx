import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SlidingButton.module.css';


const SlidingButton = ({to, text, sliderText}) => {
    const dynamicSliderText = {'--text': `"${sliderText}"`};
    return <Link className={styles.SlidingButton} to={to} style={dynamicSliderText}>{text}</Link>
    
};

export default SlidingButton;