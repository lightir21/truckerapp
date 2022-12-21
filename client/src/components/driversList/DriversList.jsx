import "./driversList.scss";
import data from "../../assets/drivers.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSingleDriver } from "../index";
import { IoIosAdd } from "react-icons/io";

const DriversList = () => {
  const [drivers, setDrivers] = useState(data);

  const navigate = useNavigate();

  return (
    <>
      <div className="driverListTop">
        <div className="driversListTop__input-container">
          <input
            type="text"
            className="driversListTop__input"
            placeholder="חפש נהג"
          />
        </div>
        <button
          className="driversListTop__addButton btn"
          type="button"
          onClick={() => navigate("/addNewDriver")}
        >
          הוסף נהג <IoIosAdd className="dashboard__plus" />
        </button>
      </div>
      <div className="driversList">
        {drivers.map((driver) => (
          <AdminSingleDriver driver={driver} key={driver.id} />
        ))}
      </div>
    </>
  );
};

export default DriversList;
