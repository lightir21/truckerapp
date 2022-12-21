import { useUserStore } from "../../../store/user-store";
import "./profileDropdown.scss";

const ProfileDropdown = ({ isProfileOpen }) => {
  const { logoutUser } = useUserStore();

  return (
    <div className={`profileDropdown ${isProfileOpen && "active"}`}>
      <ul>
        <li>פרופיל</li>
        <li onClick={() => logoutUser()}>התנתק</li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
