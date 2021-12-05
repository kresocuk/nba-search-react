import React from "react";
import { useEffect, useState, useCallback } from "react";
import classes from './Hero.module.css';
import { Link } from "react-router-dom";

const Hero = ({logoutHandler}) =>{

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()-1);
    
    
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchGamesHandler = useCallback(async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`https://www.balldontlie.io//api/v1/games?seasons[]=2021&dates[]=${date}`);
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
    
          const file = await response.json();
    
          const loadedGames = [];
          
          for (const key in file.data) {
            loadedGames.push({
              home_team_name: file.data[key].home_team.full_name,
              visitor_team_name: file.data[key].visitor_team.full_name,
              home_score: file.data[key].home_team_score,
              visitor_score: file.data[key].visitor_team_score
            });
          }
    
          setGames(loadedGames);
        } catch (error) {
          
        }
        setIsLoading(false);
      }, []);
    
      useEffect(() => {
        fetchGamesHandler();
      }, [fetchGamesHandler]);
      
     

    let mappedArray = (games).map((games)=>{
      return(
        <li>{games.home_team_name} {games.home_score} - {games.visitor_score} {games.visitor_team_name} </li>
      )
    })

    return(
        <section className={classes.hero}>
            <nav>
                <h2>NBA Search</h2>
                <Link to="/search">
                    <button>Start searching!</button>
                </Link>
                <button onClick={logoutHandler}>Logout</button>
            </nav>
            <h1>Rezultati</h1>
            <ul>{mappedArray}</ul>
        </section>
    )
};

export default Hero;