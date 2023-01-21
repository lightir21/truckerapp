import "./driverSingleMission.scss";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useUserStore } from "../../store/user-store";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";

const DriverSingleMission = ({ mission, setIsPopupOpen, text, isDriver }) => {
  const { deleteMission, setIsEditing, setEditMission } = useUserStore();

  const { _id } = mission;

  const handleUpdateMission = async () => {
    await setEditMission({ jobId: _id });
    setIsEditing(true);
    setIsPopupOpen(true);
  };

  return (
    <div className="driverSingleMission">
      <p>{text}</p>
      {!isDriver && (
        <div className="driverSingleMission__iconsBox">
          <FaEdit
            className="driverSingleMission__icon"
            onClick={handleUpdateMission}
          />
          <FaTrashAlt
            className="driverSingleMission__icon"
            onClick={() => deleteMission({ jobId: _id })}
          />
        </div>
      )}
    </div>
  );
};

export default DriverSingleMission;
