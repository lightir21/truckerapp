import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Register } from "../";
import { useUserStore } from "../../store/user-store";
import "./login.scss";

const Login = ({ setLogin }) => {
  const [registerClicked, setRegisteredClicked] = useState(false);
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });

  const { signIn, checkAuth } = useUserStore((state) => state);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(values);
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
            name="userName"
            placeholder="שם משתמש"
            onChange={handleChange}
          />

          <input
            type="password"
            className="login__form-input"
            name="password"
            placeholder="סיסמא"
            onChange={handleChange}
          />
          <div className="login__form-buttons_container">
            <button type="submit" className="login__form-btn btn">
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
