import "./adminDriverTaskManager.scss";
import { Link, useParams } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import defaultProfileImage from "../../assets/Demo-profile-picture.png";
import { useEffect } from "react";
import { useUserStore } from "../../store/user-store";

const AdminDriverTaskManager = () => {
  const params = useParams();

  const { getDriver, driver } = useUserStore();

  useEffect(() => {
    getDriver(params.id);
  }, []);

  const { userName, truckNum, image } = driver.user;

  return (
    <div className="adminDriverTaskManager">
      <Link className="adminDriverTaskManager__backBtn btn" to="/">
        חזרה
      </Link>
      <div className="adminDriverTaskManager__info">
        <img
          src={image || defaultProfileImage}
          alt={`a profile of ${userName}`}
          className="adminDriverTaskManager__info-image"
        />
        <h2 className="adminDriverTaskManager__info-name">{userName}</h2>
        <p className="adminDriverTaskManager__info-truck">
          מספר משאית: {truckNum}
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
