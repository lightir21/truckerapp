import "./driverSingleMission.scss";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useUserStore } from "../../store/user-store";

const DriverSingleMission = ({ mission, setIsPopupOpen }) => {
  const [continueReading, setContinueReading] = useState(true);

  const { deleteMission, setIsEditing, setEditMission } = useUserStore();

  const {
    date,
    customer,
    startLocation,
    time,
    destination,
    craneType,
    departmentNum,
    invitationNum,
    contact1,
    contact2,
    others,
    _id,
  } = mission;

  let newDate = date.split("T")[0].split("-").reverse().join(".");

  const handleUpdateMission = async () => {
    await setEditMission({ jobId: _id });
    setIsEditing(true);
    setIsPopupOpen(true);
  };

  return (
    <div className="driverSingleMission">
      <p>
        ל- {newDate}, שם לקוח: {customer}, התייצבות ב{startLocation} בשעה -
        {time}
        {continueReading ? (
          <span
            className="driverSingleMission__continueReading"
            onClick={() => setContinueReading(false)}
          >
            המשך...
          </span>
        ) : (
          <span>
            ,{destination && ` העמסה ל: ${destination}`}.
            {craneType && ` סוג מנוף: ${craneType},`}
            {departmentNum && ` מספר מחלקה: ${departmentNum},`}
            {invitationNum && ` מספר הזמנה: ${invitationNum}, `}
            {contact1 &&
              ` איש קשר: ${contact1}` + (contact2 ? ` או ${contact2}` : "")}
            {others && `שונות ${others} `}
            <AiOutlineClose
              className="driverSingleMission__exitIcon"
              onClick={() => setContinueReading(true)}
            />
          </span>
        )}
      </p>
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
    </div>
  );
};

export default DriverSingleMission;
