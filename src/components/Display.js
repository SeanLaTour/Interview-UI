/*
  Display.js displays a list of interviews returned from the API that match the UUID that is set in state.
  It uses axios to send a get request with a header that includes the user's UUID and will display any errors
  it recieves from the API. Display.js also conditionally renders whether the request is loading or if
  there are zero interviews scheduled for this user.
 */

import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
const axios = require("axios");
const moment = require("moment");

function Display({ update }) {
  const [interviews, setInterviews] = useState([]);
  const [errorElement, setErrorElement] = useState("");
  const [lengthIsZero, setLengthIsZero] = useState(false);
  const user = window.localStorage.getItem("user");

  // useEffect sends a request to the API any time the page is loaded or updated via Form.js
  useEffect(() => {
    function loadInterviews() {
      axios
        .get("http://example-api.winningwithchase.com/interview", {
          headers: {
            "account-id": user,
          },
        })
        .then((response) => {
          setInterviews(response.data);
          setErrorElement("");
          if (response.data.length === 0) {
            setLengthIsZero(true);
          } else {
            setLengthIsZero(false);
          }
        })
        .catch((error) => setErrorElement(error.message));
    }
    loadInterviews();
  }, [user, update]);

  // listOfInterviews contains <li> elements propogated by what is returned from the API in "interviews".
  const listOfInterviews = interviews.map((interview, index) => {
    return (
      <li
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderStyle: "solid",
          borderRadius: "5px",
          alignItems: "center",
        }}
        key={index}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            width: "100%",
            borderBottomStyle: "solid",
            backgroundColor: "#176087",
          }}
        >
          <p
            style={{
              padding: "3px",
              margin: "0",
              marginRight: "4px",
              color: "#132e32",
              paddingLeft: "5px",
            }}
          >
            <b>Email:</b>
          </p>{" "}
          <p
            style={{
              padding: "3px",
              margin: "0",
              color: "#132e32",
              paddingLeft: "5px",
            }}
          >
            <b>{interview.invite_email}</b>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            width: "100%",
            backgroundColor: "#2982A9",
          }}
        >
          {" "}
          <p
            style={{
              padding: "3px",
              margin: "0",
              marginRight: "12px",
              color: "#132e32",
              paddingLeft: "5px",
            }}
          >
            Date:
          </p>{" "}
          <p
            style={{
              padding: "3px",
              margin: "0",
              color: "#132e32",
              paddingLeft: "5px",
            }}
          >
            {moment(`${interview.scheduled_at} -0000 `).format("LLLL")}
          </p>
        </div>
      </li>
    );
  });

  return (
    <div className="display-div">
      <h2>Interviews</h2>
      <ul>
        {!listOfInterviews.length && !lengthIsZero ? (
          <ClipLoader color="#176087" />
        ) : null}
        {listOfInterviews.length && !lengthIsZero ? listOfInterviews : null}
        {!listOfInterviews.length && lengthIsZero ? (
          <p>No interviews scheduled</p>
        ) : null}
      </ul>
      <div>
        {" "}
        <div>
          {errorElement.length ? (
            <p style={{ color: "#F47174" }}>{errorElement}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Display;
