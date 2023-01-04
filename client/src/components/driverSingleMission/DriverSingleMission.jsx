import "./driverSingleMission.scss";
const driverSingleMission = ({ mission }) => {
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
  } = mission;

  let newDate = date.split("T")[0].split("-").reverse().join(".");

  return (
    <div className="driverSingleMission">
      <p>
        ל {newDate}, שם לקוח: {customer}, התייצבות ב{startLocation} בשעה -{time}
        , {destination && `העמסה ל: ${destination}`}.
        {craneType && ` סוג מנוף: ${craneType},`}
        {departmentNum && ` מספר מחלקה: ${departmentNum},`}
        {invitationNum && ` מספר הזמנה: ${invitationNum}, `}
        {contact1 &&
          ` איש קשר: ${contact1}` + (contact2 ? ` או ${contact2}` : "")}
        {others && `שונות ${others} `}
      </p>
    </div>
  );
};
export default driverSingleMission;
