import React from 'react';
import classes from './Header.module.css'
import {NavLink} from "react-router-dom";

console.log(classes);

const Header = (props) => {
    return (
        <header className = { classes.header }>
            <img src="https://forklog.com/wp-content/uploads/social-network1.jpg" alt="emblem"/>
            <div className={classes.loginBlock}>
                {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div> : <NavLink to={'/login'}>
                    Login
                </NavLink>}
            </div>
        </header>
    );
}

export default Header;
