import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PlayerStats = (props) => {
  const [averages, setAverages] = useState([]);

  const params = useParams();
  console.log(params);

  useEffect(() => {
    axios
      .get(
        `https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${params.id}`
      )
      .then((stats) => {
        setAverages(stats.data.data);
      });
  }, [params.id]);

  console.log(averages);

  return (
    <div>
      <li>Points: {averages[0].pts}</li>
      <li>Rebounds: {averages[0].reb}</li>
      <li>Assists: {averages[0].ast}</li>
    </div>
  );
};

export default PlayerStats;
