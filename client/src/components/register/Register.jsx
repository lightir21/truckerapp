import "../login//login.scss";
import { useState } from "react";
import axios from "axios";

const Register = ({ setRegisteredClicked }) => {
  const [values, setValues] = useState({
    userName: "",
    password: "",
    repeatPassword: "",
    adminPassword: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { userName, password, repeatPassword, adminPassword } = values;
    if (password !== repeatPassword) return;
    const { data } = await axios.post("/api/v1/auth/register", {
      userName,
      password,
      adminPassword,
    });
    console.log(data);
  };

  return (
    <>
      <form className="login__form">
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
            onClick={onSubmit}
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
      </form>
    </>
  );
};

export default Register;
