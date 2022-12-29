import "./driversList.scss";

import { useNavigate } from "react-router-dom";
import { AdminSingleDriverFigure } from "../index";
import { IoIosAdd } from "react-icons/io";
import { useUserStore } from "../../store/user-store";
import { useEffect } from "react";
import { getAllDrivers } from "../../service";
import { useState } from "react";

const DriversList = () => {
  const [filterInput, setFilterInput] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState("");

  const { drivers, getAllDrivers } = useUserStore();

  useEffect(() => {
    const filtered = drivers?.filter((driver) =>
      driver.userName.includes(filterInput)
    );
    setFilteredDrivers([...filtered]);
  }, [filterInput]);

  useEffect(() => {
    getAllDrivers();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="driverListTop">
        <div className="driversListTop__input-container">
          <input
            type="text"
            className="driversListTop__input"
            placeholder="חפש נהג"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
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
        {filteredDrivers?.map((driver) => (
          <AdminSingleDriverFigure driver={driver} key={driver._id} />
        ))}
      </div>
    </>
  );
};

export default DriversList;
