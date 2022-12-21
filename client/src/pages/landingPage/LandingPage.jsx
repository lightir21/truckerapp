import React, { useState } from "react";

import { Login } from "../../components/";
import "./landingPage.scss";

const LandingPage = ({ setLogin }) => {
  const [enterClicked, setEnterClicked] = useState(false);

  return (
    <div className="landingPage">
      {enterClicked ? (
        <Login setLogin={setLogin} />
      ) : (
        <div className="landingPage__intro">
          <h2>
            ברוכים הבאים
            <br />
            למערכת
          </h2>
          <button
            className="landingPage__intro-btn btn"
            onClick={() => setEnterClicked(true)}
          >
            הכנס
          </button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
