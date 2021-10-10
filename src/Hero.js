import React from "react";
import classes from './Hero.module.css';

const Hero = ({logoutHandler}) =>{
    return(
        <section className={classes.hero}>
            <nav>
                <h2>Welcome</h2>
                <button onClick={logoutHandler}>Logout</button>
            </nav>
        </section>
    )
};

export default Hero;