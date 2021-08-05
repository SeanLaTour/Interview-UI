/*
  Form.js serves as the input form for scheduling new interviews. It uses axios to send a post request to
  the API with a header property containing the UUID from localStorage element 'user'. It also includes very
  simple validation and displays errors accordingly.
 */

import React, { useState } from "react";
const axios = require("axios");

function Form({ toggleUpdate }) {
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errorElement, setErrorElement] = useState("");
  const user = window.localStorage.getItem("user");
  const abortController = new AbortController();

  // submit sends post request to API after simple validation.
  function submit(e) {
    e.preventDefault();
    if (!email.includes("@")) {
      setErrorElement("Must include a valid email.");
    } else if (!date.length || !time.length) {
      setErrorElement("Must include a valid date and time.");
    }
    else {
      setErrorElement("");
      const interviewDateTime = new Date(`${date} ${time}`).toISOString();
      const data = {
        invite_email: email,
        scheduled_at: interviewDateTime,
      };
      axios
        .post("http://example-api.winningwithchase.com/interview", data, {
          headers: {
            "account-id": user,
          },
          signal: abortController.signal,
        })
        .then(toggleUpdate((update) => !update))
        .catch((error) => setErrorElement(error));
    }
    return () => {
      abortController.abort();
    };
  }

  return (
    <form>
      <h2>Schedule Interview</h2>
      <div className="form-div">
        <label style={{ marginRight: "5px" }}>Email</label>
        <input style={{width: '100%'}} onChange={(e) => setEmail(e.target.value)} type="text"></input>
      </div>
      <div className="form-div">
        <label style={{ marginRight: "12px" }}>Date</label>
        <input style={{width: '100%'}} onChange={(e) => setDate(e.target.value)} type="date"></input>
      </div>
      <div className="form-div">
        <label style={{ marginRight: "10px" }}>Time</label>
        <input style={{width: '100%'}} onChange={(e) => setTime(e.target.value)} type="time"></input>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}} className="form-div">
        <button onClick={(e) => submit(e)} type="submit">
          Schedule
        </button>
      </div>
      <div>
        {errorElement.length ? (
          <p style={{ color: "#F47174" }}>Error: {errorElement}</p>
        ) : null}
      </div>
    </form>
  );
}

export default Form;
