/*
  App.js contains all routing information using the "react-router-dom" as well as 
  the "loggedIn" state that maintains the user's state through the entirety of the app. 
 */

import "./App.css";
import Login from "./components/Login";
import Home from "./pages/Home";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  // Maintains user's logged in status as long as there exists a 'user' in localStorage.
  let active = window.localStorage.getItem("user");
  active === null || !active.length ? (active = false) : (active = true);
  const [loggedIn, setLoggedIn] = useState(active);
  console.log(loggedIn)

  return (
    <div className="App">
      <Router>
        <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Login setLoggedIn={setLoggedIn} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
