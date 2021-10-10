import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const PlayerStats = (props) => {

  useEffect(()=>{
    fetchStatsHandler();
  },[]);

  const [averages, setAverages] = useState({});

  const params = useParams();
  console.log(params);

  async function fetchStatsHandler() {
    const response = await fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${params.id}`);
    const stats = await response.json();
    
    const transformedStats = stats.data.map((statsData) =>{
      return {
        points: statsData.pts,
        rebounds: statsData.reb,
        assists: statsData.ast,
      };
    });
    setAverages(transformedStats);
    console.log(transformedStats);
    console.log(averages);
  }
  return (
    <div>
      {/* <p>Stats: {averages[0].pts} {averages[0].reb} {averages[0].ast}</p> */}
    </div>
  );
};

export default PlayerStats;
