import { Link } from "react-router-dom";
import "./addNewDriver.scss";

const AddNewDriver = () => {
  return (
    <div className="addNewDriver">
      <Link className="addNewDriver__backBtn btn" to="/">
        חזרה
      </Link>
      <h2 className="addNewDriver__title">הוסף נהג חדש</h2>
      <form className="addNewDriver__form">
        <div className="addNewDriver__form-box">
          <label htmlFor="name">שם מלא</label>
          <input id="name" type="text" placeholder="גידי גוב" />
        </div>

        <div className="addNewDriver__form-box">
          <label htmlFor="password">סיסמא</label>
          <input id="password" type="password" />
        </div>

        <div className="addNewDriver__form-box">
          <label htmlFor="repeat">חזור על הסיסמא</label>
          <input id="repeat" type="password" />
        </div>

        <div className="addNewDriver__form-box">
          <label htmlFor="truck">מספר משאית</label>
          <input id="truck" type="text" placeholder="123-12-123" />
        </div>

        <label className="customFile">
          <input type="file" />
          הוסף תמונה
        </label>
        <button type="submit" className="addNewDriver__addBtn btn">
          שלח
        </button>
      </form>
    </div>
  );
};

export default AddNewDriver;
