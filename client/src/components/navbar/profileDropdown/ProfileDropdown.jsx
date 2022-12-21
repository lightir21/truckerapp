import "./profileDropdown.scss";

const ProfileDropdown = ({ isProfileOpen }) => {
  return (
    <div className={`profileDropdown ${isProfileOpen && "active"}`}>
      <ul>
        <li>פרופיל</li>
        <li>התנתק</li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
