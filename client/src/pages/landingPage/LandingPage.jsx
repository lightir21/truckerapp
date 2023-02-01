import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../../components/";
import { useUserStore } from "../../store/user-store";
import "./landingPage.scss";

const LandingPage = ({ setLogin, userStatus }) => {
  const [enterClicked, setEnterClicked] = useState(false);

  const { userData } = useUserStore((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.user) {
      navigate(userStatus === 200 ? "/" : "/driver");
    }
  }, [userData, navigate]);

  return (
    <div className="landingPage">
      <p>It might take 30 seconds to load the server before logging in</p>
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
