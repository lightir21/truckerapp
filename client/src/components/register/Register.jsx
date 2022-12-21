import "../login//login.scss";
import { useState } from "react";
import axios from "axios";
import { useUserStore } from "../../store/user-store";

const Register = ({ setRegisteredClicked }) => {
  const { signIn, signUp, userData, setUser } = useUserStore((state) => state);
  console.log(userData);
  const [values, setValues] = useState({
    userName: "",
    password: "",
    repeatPassword: "",
    adminPassword: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="login__form">
        <h2>הרשמה</h2>
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

        <input
          type="password"
          className="login__form-input"
          name="repeatPassword"
          placeholder="ודא סיסמא"
          onChange={handleChange}
        />

        <input
          type="password"
          className="login__form-input"
          name="adminPassword"
          placeholder="סיסמת מנהל"
          onChange={handleChange}
        />

        <div className="login__form-buttons_container">
          <button
            type="submit"
            className="login__form-btn btn"
            onClick={() => signUp(values)}
          >
            שלח
          </button>
          <button
            type="button"
            className="login__form-btn btn btn-reverse"
            onClick={() => setRegisteredClicked(false)}
          >
            חזרה
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
