import "./adminDriverTaskManager.scss";
import { Link, useParams } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import defaultProfileImage from "../../assets/Demo-profile-picture.png";
import { useEffect, useState } from "react";
import { useUserStore } from "../../store/user-store";
import { AdminDriverAddMission } from "../index";

const AdminDriverTaskManager = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const params = useParams();

  const { getDriver, driver, loading } = useUserStore();

  useEffect(() => {
    getDriver(params.id);
  }, []);

  const onDateChange = (e) => {
    setDate(e.target.value);
  };

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="adminDriverTaskManager">
      {isPopupOpen && <AdminDriverAddMission />}
      <Link className="adminDriverTaskManager__backBtn btn" to="/">
        חזרה
      </Link>
      <input
        type="date"
        className="adminDriverTaskManager__datePicker"
        defaultValue={date}
        onChange={onDateChange}
      />
      <div className="adminDriverTaskManager__info">
        <img
          src={driver.user.image || defaultProfileImage}
          alt={`a profile of ${driver.user.userName}`}
          className="adminDriverTaskManager__info-image"
        />
        <h2 className="adminDriverTaskManager__info-name">
          {driver.user.userName}
        </h2>
        <p className="adminDriverTaskManager__info-truck">
          מספר משאית: {driver.user.truckNum}
        </p>
      </div>
      <div className="adminDriverTaskManager__tasks">
        <button className="adminDriverTaskManager__tasks-addButton btn">
          <IoIosAdd /> הוסף משימה חדשה
        </button>
        <hr />
      </div>
    </div>
  );
};

export default AdminDriverTaskManager;
