import "./adminDriverAddMission.scss";

const AdminDriverAddMission = () => {
  return (
    <div className="AdminDriverAddMission">
      <h2>הוסף משימה חדשה</h2>
      <form>
        <div className="AdminDriverAddMission__inputBox">
          <label htmlFor="date">תאריך</label>
          <input name="date" type="date" />
        </div>

        <div className="AdminDriverAddMission__inputBox">
          <label htmlFor="date">שם לקוח</label>
          <input name="customer" type="text" />
        </div>

        <div className="AdminDriverAddMission__inputBox">
          <label htmlFor="startLocation">מוצא</label>
          <input name="startLocation" type="text" />
        </div>

        <div className="AdminDriverAddMission__inputBox">
          <label htmlFor="time">שעת התייצבות</label>
          <input name="time" type="text" />
        </div>

        <div className="AdminDriverAddMission__inputBox">
          <label htmlFor="destination">יעד</label>
          <input name="destination" type="text" />
        </div>

        <div className="AdminDriverAddMission__inputBox">
          <label htmlFor="craneType">סוג מנוף</label>
          <input name="craneType" type="text" />
        </div>

        <div className="AdminDriverAddMission__inputBox">
          <label htmlFor="craneType">סוג מנוף</label>
          <input name="craneType" type="text" />
        </div>

        <div className="AdminDriverAddMission__inputBox">
          <label htmlFor="craneType">סוג מנוף</label>
          <input name="craneType" type="text" />
        </div>

        <div className="AdminDriverAddMission__inputBox">
          <label htmlFor="craneType">סוג מנוף</label>
          <input name="craneType" type="text" />
        </div>

        <div className="AdminDriverAddMission__inputBox">
          <label htmlFor="craneType">סוג מנוף</label>
          <input name="craneType" type="text" />
        </div>
      </form>
    </div>
  );
};
export default AdminDriverAddMission;
