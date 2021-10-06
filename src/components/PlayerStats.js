import { useState, useEffect } from "react";
import axios from "axios";
const PlayerStats = (props) => {
  
  const [averages, setAverages] = useState([]);

  useEffect(() => {
    axios
      .get(`https://www.balldontlie.io/api/v1/season_averages`)
      .then((average) => {
        setAverages(average.data.data);
        
      });
  }, []);
  console.log(averages);
  
  
  return (
    <div>
      <p>Stats</p>
    </div>
  );
};

export default PlayerStats;
