import "./adminDriverAddMission.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useUserStore } from "../../store/user-store";

const initialState = {
  date: "",
  customer: "",
  startLocation: "",
  time: "",
  destination: "",
  craneType: "",
  departmentNum: "",
  invitationNum: "",
  contact1: "",
  contact2: "",
  others: "",
};

const AdminDriverAddMission = ({ setIsPopupOpen, addMissionRef }) => {
  const [values, setValues] = useState(initialState);

  const { addNewMission, driver } = useUserStore();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNewMission(values, driver.user._id);
    setIsPopupOpen(false);
    setValues(initialState);
  };

  return (
    <div className="AdminDriverAddMission">
      <AiOutlineClose
        className="AdminDriverAddMission__close"
        onClick={() => setIsPopupOpen(false)}
      />

      <h2 className="AdminDriverAddMission__heading">הוסף משימה חדשה</h2>

      <form className="AdminDriverAddMission__form" onSubmit={handleSubmit}>
        <div className="AdminDriverAddMission__form-container">
          <div className="AdminDriverAddMission__inputBox">
            <label className="AdminDriverAddMission__form-label" htmlFor="date">
              תאריך
            </label>

            <input
              className="AdminDriverAddMission__form-input"
              name="date"
              type="date"
              onChange={handleChange}
            />
          </div>

          <div className="AdminDriverAddMission__inputBox">
            <label className="AdminDriverAddMission__form-label" htmlFor="date">
              שם לקוח
            </label>
            <input
              className="AdminDriverAddMission__form-input"
              name="customer"
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="AdminDriverAddMission__inputBox">
            <label
              className="AdminDriverAddMission__form-label"
              htmlFor="startLocation"
            >
              מוצא
            </label>
            <input
              className="AdminDriverAddMission__form-input"
              name="startLocation"
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="AdminDriverAddMission__inputBox">
            <label className="AdminDriverAddMission__form-label" htmlFor="time">
              שעת התייצבות
            </label>
            <input
              className="AdminDriverAddMission__form-input"
              name="time"
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="AdminDriverAddMission__inputBox">
            <label
              className="AdminDriverAddMission__form-label"
              htmlFor="destination"
            >
              יעד
            </label>
            <input
              className="AdminDriverAddMission__form-input"
              name="destination"
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="AdminDriverAddMission__inputBox">
            <label
              className="AdminDriverAddMission__form-label"
              htmlFor="craneType"
            >
              סוג מנוף
            </label>
            <input
              className="AdminDriverAddMission__form-input"
              name="craneType"
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="AdminDriverAddMission__inputBox">
            <label
              className="AdminDriverAddMission__form-label"
              htmlFor="departmentNum"
            >
              מספר מחלקה
            </label>
            <input
              className="AdminDriverAddMission__form-input"
              name="departmentNum"
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="AdminDriverAddMission__inputBox">
            <label
              className="AdminDriverAddMission__form-label"
              htmlFor="invitationNum"
            >
              מספר הזמנה
            </label>
            <input
              className="AdminDriverAddMission__form-input"
              name="invitationNum"
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="AdminDriverAddMission__inputBox">
            <label
              className="AdminDriverAddMission__form-label"
              htmlFor="contact1"
            >
              איש קשר 1
            </label>
            <input
              className="AdminDriverAddMission__form-input"
              name="contact1"
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="AdminDriverAddMission__inputBox">
            <label
              className="AdminDriverAddMission__form-label"
              htmlFor="contact2"
            >
              איש קשר 2
            </label>
            <input
              className="AdminDriverAddMission__form-input"
              name="contact2"
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="AdminDriverAddMission__inputBox">
            <label
              className="AdminDriverAddMission__form-label"
              htmlFor="others"
            >
              הערות
            </label>
            <input
              className="AdminDriverAddMission__form-input"
              name="others"
              type="textField"
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="AdminDriverAddMission__btn btn">
          הוסף
        </button>
      </form>
    </div>
  );
};
export default AdminDriverAddMission;
