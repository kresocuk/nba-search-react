import React from "react";
import { useEffect, useState, useCallback } from "react";
import classes from './Hero.module.css';
import { Link } from "react-router-dom";
import Spinner from "./components/Spinner";
import { BsLightbulbFill, BsLightbulb } from "react-icons/bs";

const Hero = ({logoutHandler}) =>{

    var date = new Date();

    const [theme, setTheme] = useState("hero");
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [mappedArray, setMappedArray] = useState([]);
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth()+1);
    const [day, setDay] = useState(date.getDate()-1);
 
    var fetchDate = year + '-' + month + '-' + day;

    console.log(theme);

    const dayForwardHandler = (event) => {
      event.preventDefault();
      setDay(day+1);
    }
    
    const dayBackwardHandler = (event) => {
      event.preventDefault();
      setDay(day-1);
    }

    const themeHandler = () => {
      setTheme('hero');
    };

    const fetchGamesHandler = useCallback(async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2021&dates[]=${fetchDate}`);
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
    
          const file = await response.json();
          
       
          const loadedGames = [];
          
          for (const key in file.data) {
            loadedGames.push({
              id: file.data[key].id,
              home_team_name: file.data[key].home_team.full_name,
              visitor_team_name: file.data[key].visitor_team.full_name,
              home_score: file.data[key].home_team_score,
              visitor_score: file.data[key].visitor_team_score,
              status: file.data[key].status,
              game_date: file.data[key].date,
              play_or_reg: file.data[key].postseason,
            });
          }
    
          setGames(loadedGames);

          setMappedArray(loadedGames.map((games)=>{
            return(
            <table>
            <tbody>
            <tr>
              <td>{games.status}</td>
              <td>{games.home_team_name}</td>
              <td><Link to={`stats/${games.id}`} key={games.id}>{games.home_score} - {games.visitor_score}</Link></td>
              <td>{games.visitor_team_name}</td>
              <td>Regular Season</td>
            </tr>
            </tbody>
          </table>
          )}))
        } catch (error) {
          
        }
        setIsLoading(false);
      }, [day,theme]);
    
      useEffect(() => {
        fetchGamesHandler();
      }, [fetchGamesHandler]);
      
     
    
    console.log(mappedArray);
    return(
        <section className={classes.hero}>
            <nav>
                <h2>NBA Search</h2>
                <Link to="/search">
                    <button>Start searching!</button>
                </Link>
                <button onClick={logoutHandler}>Logout</button>
            </nav>
            <div  className={classes.games}>
              <button onClick={dayBackwardHandler} className={classes.button}>{"<<"}</button>
              <h1>{fetchDate}</h1>
              <button onClick={dayForwardHandler}  className={classes.button} >{">>"}</button>
            </div>
            <BsLightbulbFill onClick={themeHandler} />
            <div className={classes.array}>{mappedArray}</div>
            {isLoading && <Spinner />}
        </section>
    )
};

export default Hero;