import React from "react";
import {useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

const Button = ({ to, text, fontSize, action }) => {
    const customStyle = {fontSize : fontSize || '1em'};
    const navigate = useNavigate();

    const handleClick = (e) => {
        if (to.startsWith("#")) {
            e.preventDefault();
            const elementId = to.substring(1);
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                if(action){
                    action();
                }
            }
        } else {
            navigate(to);
            if(action){
                action();
            }
        }
    };

    return (
        <button className={styles.button} to={to} onClick={handleClick} style={customStyle}>
            {text}
        </button>
    );
};

export default Button;
