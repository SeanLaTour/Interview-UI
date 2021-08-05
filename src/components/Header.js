/*
  Header.js displays the name of the app "Interview UI" as well as a conditionally rendered
  logout button. When user is logged in Header.js will display the user's UUID.
 */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

function Header({ loggedIn, setLoggedIn }) {
  const history = useHistory();
  const [user, setUser] = useState("Interview UI");

  // signOut function logs user out and returns to login page.
  const signOut = () => {
    window.localStorage.setItem("user", '');
    setLoggedIn(false);
    history.push("/");
  };

  // useEffect() checks if user is logged in and renders "user" conditionally.
  useEffect(() => {
    if (loggedIn) {
      setUser(`UUID: ${window.localStorage.getItem("user")}`);
    } else {
      setUser("Interview UI");
    }
  }, [loggedIn]);

  return (
    <header>
      <div style={{ marginLeft: "30px" }}>
        {loggedIn ? <h4>{user}</h4> : <h2>{user}</h2>}
      </div>
      <nav style={{ marginRight: "30px" }}>
          {loggedIn ? <button onClick={() => signOut()}>Log Out</button> : null}
      </nav>
    </header>
  );
}

export default Header;
