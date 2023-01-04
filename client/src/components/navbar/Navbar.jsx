import "./navbar.scss";
import { useState } from "react";

import profile from "../../assets/Demo-profile-picture.png";
import { GiTruck } from "react-icons/gi";
import { RiArrowDownSFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/user-store";
import { useRef } from "react";
import { useEffect } from "react";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { logoutUser, userData } = useUserStore();
  const { user } = userData;

  const profileRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const closeProfile = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.body.addEventListener("click", closeProfile);

    return () => document.body.removeEventListener("click", closeProfile);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__right">
          <Link to="/">
            <GiTruck className="navbar__logo" />
          </Link>
        </div>
        <div className="navbar__left">
          <div className="navbar__profile">
            <div className="navbar__profile-button">
              <div
                ref={profileRef}
                className="navbar__button-container"
                onClick={() => setIsProfileOpen((prev) => !prev)}
              >
                <RiArrowDownSFill />
                <p className="navbar__profile-button-text">{user.userName}</p>
              </div>
              <div>
                <div className={`profileDropdown ${isProfileOpen && "active"}`}>
                  <ul>
                    <li onClick={() => navigate("/profile")}>פרופיל</li>
                    <li onClick={logoutUser}>התנתק</li>
                  </ul>
                </div>
              </div>
            </div>
            {(user.image && (
              <img
                src={user.image}
                alt="profile of"
                className="navbar__profile-image"
              />
            )) || (
              <img
                src={profile}
                alt="profile of"
                className="navbar__profile-image"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
