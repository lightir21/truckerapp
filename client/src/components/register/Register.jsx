import "../login//login.scss";

const Register = ({ setRegisteredClicked }) => {
  return (
    <>
      <form className="login__form">
        <h2>הרשמה</h2>
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

        <input
          type="password"
          className="login__form-input"
          name="repeat_password"
          placeholder="ודא סיסמא"
        />

        <input
          type="password"
          className="login__form-input"
          name="admin_password"
          placeholder="סיסמת מנהל"
        />

        <div className="login__form-buttons_container">
          <button type="submit" className="login__form-btn btn">
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
