import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import classes from "./PlayerStats.module.css";
import Spinner from "./Spinner";

const PlayerStats = (props) => {

  useEffect(()=>{
    fetchStatsHandler();
  },[]);

  const params = useParams();
  const [averages, setAverages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredYear, setFilteredYear] = useState("2021");
  const [url, setUrl] = useState(`https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${params.id}`);

  const filterChangeHandler = (event) => {
    setFilteredYear(event.target.value);
    setUrl(`https://www.balldontlie.io/api/v1/season_averages?season=${event.target.value}&player_ids[]=${params.id}`);

  };

  const fetchStatsHandler = useCallback(async () =>{ 
    setIsLoading(true);
    try{
    const response = await fetch(url);
    if(!response.ok){
      throw new Error('Error loading!');
    }
    
    const stats = await response.json();
    

    const loadedStats = [];
    
    for (const key in stats.data){
      loadedStats.push({
        points: stats.data[key].pts,
        rebounds: stats.data[key].reb,
        assists: stats.data[key].ast,
        steals: stats.data[key].stl,
        blocks: stats.data[key].blk,
        turnovers: stats.data[key].turnover,
        fg_per: stats.data[key].fg_pct,
        fg3_per: stats.data[key].fg3_pct,
        ft_per: stats.data[key].ft_pct,


      });
    }

    
    setAverages(loadedStats);
    
  }catch (error){

  }
    setIsLoading(false);
    
  }, [filteredYear]);

  useEffect(() =>{
    fetchStatsHandler();
  }, [fetchStatsHandler]);
  
  let mappedStats = <p>No recent games.</p>

  if(isLoading){
    mappedStats = <p>Loading...</p>
  }

    mappedStats = (averages).map((averages)=>{
    return(
      <table className={classes.table}>
        <tbody>
        <tr className={classes.headers}>
          <th>Season</th>
          <th>Points</th>
          <th>Rebounds</th>
          <th>Assists</th>
          <th>Steals</th>
          <th>Blocks</th>
          <th>Turnovers</th>
          <th>FG Pct</th>
          <th>FG3 Pct</th>
          <th>FT Pct</th>
        </tr>
        <tr>
          <td>{filteredYear}</td>
          <td>{averages.points}</td>
          <td>{averages.rebounds}</td>
          <td>{averages.assists}</td>
          <td>{averages.steals}</td>
          <td>{averages.blocks}</td>
          <td>{averages.turnovers}</td>
          <td>{averages.fg_per}</td>
          <td>{averages.fg3_per}</td>
          <td>{averages.ft_per}</td>
        </tr>
        </tbody>
      </table>
    )
  })
  
  
  return (
    <div  className={classes.back}>
    
    <div className={classes.yearfilter}>
      <div className={classes.yearfiltercont}>
        <select value={filteredYear} onChange={filterChangeHandler}>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
          <option value='2019'>2019</option>
          <option value='2018'>2018</option>
          <option value='2017'>2017</option>
          <option value='2016'>2016</option>
        </select>
      </div>
    </div>
      <div  className={classes.pos}>{!isLoading && mappedStats}</div>
    </div>
  );
};

export default PlayerStats;
