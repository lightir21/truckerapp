import { useEffect, useState } from "react";
import { useUserStore } from "../../store/user-store";
import DriverSingleMission from "../driverSingleMission/DriverSingleMission";
import "./driverTaskManager.scss";

const DriverTaskManager = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const { userData, getMissionByDate, missions } = useUserStore();

  useEffect(() => {
    getMissionByDate(date, userData?.user?._id);
  }, [date, userData, getMissionByDate]);

  return (
    <div className="driverTaskManager">
      <input
        type="date"
        className="driverTaskManager__datePicker"
        defaultValue={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <p className="driverTaskManager__truckNum">
        מספר משאית: {userData.user.truckNum}
      </p>
      <div className="driverTaskManager__missionsList">
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

          return (
            <DriverSingleMission
              key={mission._id}
              mission={mission}
              text={text}
              isDriver
            />
          );
        })}
      </div>
    </div>
  );
};
export default DriverTaskManager;
