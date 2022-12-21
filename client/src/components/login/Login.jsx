import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Register } from "../";
import "./login.scss";

const Login = ({ setLogin }) => {
  const [registerClicked, setRegisteredClicked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="login">
      {registerClicked ? (
        <Register setRegisteredClicked={setRegisteredClicked} />
      ) : (
        <form className="login__form" onSubmit={handleSubmit}>
          <h2>כניסה</h2>
          <input
            type="text"
            className="login__form-input"
            name="name"
            placeholder="שם משתמש"
          />

          <input
            type="password"
            className="login__form-input"
            name="password"
            placeholder="סיסמא"
          />
          <div className="login__form-buttons_container">
            <button
              type="submit"
              className="login__form-btn btn"
              onClick={() => setLogin(true)}
            >
              כנס
            </button>
            <button
              type="button"
              className="login__form-btn btn btn-reverse"
              onClick={() => setRegisteredClicked(true)}
            >
              הרשם
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
