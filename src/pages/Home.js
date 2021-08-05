/*
    Home.js holds the Form and Display components and passes information between the two.
*/

import React, { useState } from "react";
import Form from "../components/Form";
import Display from "../components/Display";

function Home() {
    const [update, toggleUpdate] = useState(false);
    return(
        <div className="Home">
            <Form toggleUpdate={toggleUpdate} />
            <Display update={update} />
        </div>
    )
}

export default Home;