import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";


const PlayerStats = () => {

  useEffect(()=>{
    fetchStatsHandler();
  },[]);

  const [averages, setAverages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  

  const fetchStatsHandler = useCallback(async () =>{ 
    setIsLoading(true);
    try{
    const response = await fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${params.id}`);
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
      });
    }

    
    setAverages(loadedStats);
    
  }catch (error){

  }
    setIsLoading(false);
    
  }, []);

  useEffect(() =>{
    fetchStatsHandler();
  }, [fetchStatsHandler]);
  
  let mappedStats = (averages).map((averages)=>{
    return(
      <li> Points: {averages.points} Rebounds: {averages.rebounds} Assists: {averages.assists}</li>
    )
  })
  
  return (
    <div>
      <p>{mappedStats}</p>
    </div>
  );
};

export default PlayerStats;
