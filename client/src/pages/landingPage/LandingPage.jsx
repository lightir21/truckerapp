import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../../components/";
import { useUserStore } from "../../store/user-store";
import "./landingPage.scss";

const LandingPage = ({ setLogin }) => {
  const [enterClicked, setEnterClicked] = useState(false);

  const { userData } = useUserStore((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    if (userData.user) {
      navigate("/");
    }
  }, [userData, navigate]);

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
