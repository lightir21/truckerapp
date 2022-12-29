import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../store/user-store";
import "./addNewDriver.scss";

const initialState = {
  name: "",
  lastName: "",
  password: "",
  repeatPassword: "",
  truckNum: "",
};

const AddNewDriver = () => {
  const [values, setValues] = useState({
    ...initialState,
  });

  const { addNewDriver } = useUserStore((state) => state);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await addNewDriver(values);
    setValues({
      ...initialState,
    });
  };

  return (
    <div className="addNewDriver">
      <Link className="addNewDriver__backBtn btn" to="/">
        חזרה
      </Link>
      <h2 className="addNewDriver__title">הוסף נהג חדש</h2>
      <form className="addNewDriver__form" onSubmit={onSubmit}>
        <div className="addNewDriver__form-box">
          <label htmlFor="name">שם</label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="גידי"
            onChange={handleChange}
            value={values.name}
          />
        </div>

        <div className="addNewDriver__form-box">
          <label htmlFor="name">שם משפחה</label>
          <input
            name="lastName"
            id="lastName"
            type="text"
            placeholder="גוב"
            onChange={handleChange}
            value={values.lastName}
          />
        </div>

        <div className="addNewDriver__form-box">
          <label htmlFor="password">סיסמא</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
        </div>

        <div className="addNewDriver__form-box">
          <label htmlFor="repeatPassword">חזור על הסיסמא</label>
          <input
            id="repeatPassword"
            type="password"
            onChange={handleChange}
            name="repeatPassword"
            value={values.repeatPassword}
          />
        </div>

        <div className="addNewDriver__form-box">
          <label htmlFor="truckNum">מספר משאית</label>
          <input
            name="truckNum"
            id="truckNum"
            type="text"
            placeholder="123-12-123"
            onChange={handleChange}
            value={values.truckNum}
          />
        </div>

        <button type="submit" className="addNewDriver__addBtn btn">
          שלח
        </button>
      </form>
    </div>
  );
};

export default AddNewDriver;
