import "./adminDriverTaskManager.scss";
import drivers from "../../assets/drivers.json";
import { Link, useParams } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";

const AdminDriverTaskManager = () => {
  const params = useParams();

  const { id, fullName, truck, img } = drivers[params.id - 1];

  return (
    <div className="adminDriverTaskManager">
      <Link className="adminDriverTaskManager__backBtn btn" to="/">
        חזרה
      </Link>
      <div className="adminDriverTaskManager__info">
        <img
          src={img}
          alt={`a profile of ${fullName}`}
          className="adminDriverTaskManager__info-image"
        />
        <h2 className="adminDriverTaskManager__info-name">{fullName}</h2>
        <p className="adminDriverTaskManager__info-truck">
          מספר משאית: {truck}
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
