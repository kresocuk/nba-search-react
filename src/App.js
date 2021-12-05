import axios from "axios";
import { Route, Switch } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import "./App.css";
import fire from "./fire";
import Search from "./components/Search";
import PlayerStats from "./components/PlayerStats";
import Login from "./Login";
import Hero from "./Hero";

function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const loginHandler = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const signupHandler = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const logoutHandler = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios
      .get(`https://www.balldontlie.io/api/v1/players?per_page=100&page=30`)
      .then((player) => {
        setPlayers(player.data.data);
      });
  }, []);
  

  const transformedPlayers = players.map((playerData) => {
    return {
      id: playerData.id,
      firstName: playerData.first_name,
      lastName: playerData.last_name,
    };
  });
  console.log(transformedPlayers);
  

  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          {user ? (
            <Hero logoutHandler={logoutHandler}/>
          ) : (
          <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loginHandler={loginHandler}
            signupHandler={signupHandler}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
            
          />
          )}
        
        </Route>
        <Route path="/search">
          <div className="App">
            <Search placeholder="Enter a name... " data={transformedPlayers} />
          </div>
        </Route>
        <Route path="/stats/:id">
          <PlayerStats />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
