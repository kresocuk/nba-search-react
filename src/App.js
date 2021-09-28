import { Fragment } from "react";
import "./App.css";
import Search from "./components/Search";
import PlayerData from "./Data.json";

function App() {
 
  return (
    <Fragment>
    <div className="App">
      <Search placeholder="Enter a name... " data={PlayerData} />
    </div>
    
    </Fragment>
  );
}

export default App;
