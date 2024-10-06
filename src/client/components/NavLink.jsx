import React from "react";
import { Link } from "react-router-dom";
import styles from './Link.module.css';

const NavLink = ({text, to}) => {
    return <Link className={styles.link} to={to}>{text}</Link>
}

export default NavLink;