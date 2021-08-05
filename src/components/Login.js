/*
  Login.js allows user to login with a UUID, if they do not have a UUID they are able to generate 
  their own by selecting the "generate" button. After a successful login, Login.js will also toggle the
  loggin state throughout the app. Validation for proper amount of characters in UUID input is present.
 */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Login({ setLoggedIn }) {
  const [UUID, setUUID] = useState("");
  const [errorElement, setErrorElement] = useState("");
  const history = useHistory();
  const localStorage = window.localStorage;

  // generateUUID will generate a new, unique UUID upon call. (Not my code, just works too well to replace with my own! *honesty policy*)
  function generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  // login validates for proper character length and then logs user in by setting a localStorage element 'user' to UUID.
  const login = (e) => {
    e.preventDefault();
    if (UUID.length < 35) {
      setErrorElement("UUID must be 36 characters long.");
    } else {
      localStorage.setItem("user", UUID);
      setLoggedIn(true);
      history.push("/home");
    }
  };

  // generate uses the generateUUID function to create a UUID for the user and the set localStorage element 'user to UUID.
  const generate = (e) => {
    e.preventDefault();
    localStorage.setItem("user", generateUUID());
    setLoggedIn(true);
    history.push("/home");
  };

  return (
    <form className="login">
      <h2>Log In</h2>
      <div className="form-div">
        <label style={{ marginRight: "5px" }}>UUID:</label>
        <input
          onChange={(e) => setUUID(e.target.value)}
          className="form-input"
          type="text"
        ></input>
        <button type="submit" onClick={(e) => login(e)}>
          Log In
        </button>
      </div>
      <div className="form-div">
        <label className="form-label">Don't have a UUID?</label>
        <button onClick={(e) => generate(e)}>Generate UUID</button>
      </div>
      <div>
        {errorElement.length ? (
          <p style={{ color: "#F47174" }}>Error: {errorElement}</p>
        ) : null}
      </div>
    </form>
  );
}

export default Login;
