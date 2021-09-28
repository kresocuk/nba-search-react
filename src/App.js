import { Fragment } from "react";
import "./App.css";
import Search from "./components/Search";
import PlayerData from "./Data.json";

function App() {
 
  return (
    // <Fragment>
    //   <section>
    //     <button onClick={fetchTeamsHandler}>Fetch Teams</button>
    //   </section>
    //   <section>
    //     <TeamsList teams={teams} />
    //   </section>
    // </Fragment>
    <Fragment>
    <div className="App">
      <Search placeholder="Enter a name... " data={PlayerData} />
    </div>
    
    </Fragment>
  );
}

export default App;
