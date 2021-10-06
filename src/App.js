import axios from "axios";
import { Route, Switch } from 'react-router-dom';
import { Fragment, useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import PlayerStats from "./components/PlayerStats";

function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://www.balldontlie.io/api/v1/players`)
      .then((player) => {
        setPlayers(player.data.data);
        
      });
  }, []);
  console.log(players);

  const transformedPlayers = players.map(playerData =>{
    return {
      id: playerData.id,
      firstName: playerData.first_name,
      lastName: playerData.last_name,
    }
  });

  console.log(transformedPlayers);

  return (
    <Fragment>
      <Switch>
      <Route path="/search">
      <div className="App">
        <Search placeholder="Enter a name... " data={transformedPlayers} />
      </div>
      </Route>
      <Route path="/stats">
        <PlayerStats />
      </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
