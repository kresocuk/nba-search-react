import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";


const GameStats = () => {

  useEffect(()=>{
    fetchStatsHandler();
  },[]);

  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  

  const fetchStatsHandler = useCallback(async () =>{ 
    setIsLoading(true);
    const response = await fetch(`https://www.balldontlie.io/api/v1/stats?game_ids[]=${params.id}`);
    const stats = await response.json();
    console.log(stats);

    const statistics = [];

    for(const key in stats.data){
      statistics.push({
        first_name: stats.data[key].player.first_name,
        last_name: stats.data[key].player.last_name,
        points: stats.data[key].pts
      });
    }
    setStats(statistics);
    
     });

     console.log(stats);

     let mappedArray = (stats).map((stats)=>{
      return(
        <p> {stats.first_name} {stats.last_name} {stats.points}</p>
        
      )
    })

    return (
        <div>
            <p>{mappedArray}</p>
        </div>
    )
    
}
    export default GameStats;