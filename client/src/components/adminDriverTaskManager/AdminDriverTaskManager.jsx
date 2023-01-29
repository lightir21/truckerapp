import "./adminDriverTaskManager.scss";
import { Link, useParams } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaCheck } from "react-icons/fa";
import defaultProfileImage from "../../assets/Demo-profile-picture.png";
import { useEffect, useState } from "react";
import { useUserStore } from "../../store/user-store";
import { AdminDriverAddMission, DriverSingleMission } from "../index";

const AdminDriverTaskManager = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isTruckNumEditing, setIsTruckNumEditing] = useState(false);

  const params = useParams();

  const {
    getDriver,
    driver,
    loading,
    missions,
    getMissionByDate,
    updateTruckNum,
    copyText,
  } = useUserStore();

  const [truckNum, setTruckNum] = useState(driver?.user?.truckNum);

  useEffect(() => {
    getDriver(params.id);
  }, []);

  useEffect(() => {
    if (!date || !params.id) return;
    !isPopupOpen && getMissionByDate(date, driver?.user?._id);
  }, [date, driver, getMissionByDate, isPopupOpen]);

  const onDateChange = (e) => {
    setDate(e.target.value);
  };

  if (loading) {
    return <h1>loading...</h1>;
  }

  let listToCopy = [];

  return (
    <div className="adminDriverTaskManager">
      {isPopupOpen && <AdminDriverAddMission setIsPopupOpen={setIsPopupOpen} />}
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
          src={driver?.user?.image || defaultProfileImage}
          alt={`a profile of ${driver?.user?.userName}`}
          className="adminDriverTaskManager__info-image"
        />

        <h2 className="adminDriverTaskManager__info-name">
          {driver?.user?.userName}
        </h2>

        {/* Edit Truck Number */}
        {isTruckNumEditing ? (
          <div className="adminDriverTaskManager__info-truck">
            <label htmlFor="truckNum">מספר משאית</label>
            <input
              type="text"
              name="truckNum"
              id="truckNum"
              className="adminDriverTaskManager__input"
              value={truckNum}
              onChange={(e) => setTruckNum(e.target.value)}
            />
            <FaCheck
              onClick={async () => {
                await updateTruckNum(params.id, truckNum);
                setIsTruckNumEditing(false);
              }}
            />
          </div>
        ) : (
          <p className="adminDriverTaskManager__info-truck">
            מספר משאית: {driver?.user?.truckNum}
            <FaEdit
              className="adminDriverTaskManager__info-truck-edit"
              onClick={() => setIsTruckNumEditing(true)}
            />
          </p>
        )}
      </div>
      <div className="adminDriverTaskManager__tasks">
        <div className="adminDriverTaskManager__tasks-buttons">
          <button
            className="adminDriverTaskManager__tasks-addButton btn"
            onClick={() => setIsPopupOpen(true)}
          >
            <IoIosAdd /> הוסף משימה חדשה
          </button>
          <button
            className="adminDriverTaskManager__tasks-copyButton btn btn-reverse"
            onClick={() => copyText(listToCopy)}
          >
            העתק
          </button>
        </div>
        <hr />
        <div className="adminDriverTaskManager__tasksList">
          {missions?.map((mission) => {
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

            const text = `ל- ${newDate}, שם לקוח: ${customer}, התייצבות ב${startLocation} בשעה - ${time},${
              destination && ` העמסה ל: ${destination}`
            }. ${craneType && ` סוג מנוף: ${craneType},`} ${
              departmentNum && ` מספר מחלקה: ${departmentNum},`
            } ${invitationNum && ` מספר הזמנה: ${invitationNum}, `} ${
              contact1 &&
              ` איש קשר: ${contact1}` + (contact2 ? ` או ${contact2}` : "")
            } ${others && `שונות ${others} `}`;

            listToCopy.push(text);

            return (
              <DriverSingleMission
                key={mission._id}
                mission={mission}
                setIsPopupOpen={setIsPopupOpen}
                text={text}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDriverTaskManager;
