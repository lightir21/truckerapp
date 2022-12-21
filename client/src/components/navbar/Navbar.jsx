import "./navbar.scss";
import { useState } from "react";
import { ProfileDropdown } from "../index";
import profile from "../../assets/NOF078.jpg";
import { GiTruck } from "react-icons/gi";
import { RiArrowDownSFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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
                className="navbar__button-container"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <RiArrowDownSFill />
                <p className="navbar__profile-button-text">Meir Meir</p>
              </div>
              <div>
                <ProfileDropdown isProfileOpen={isProfileOpen} />
              </div>
            </div>

            <img
              src={profile}
              alt="profile of"
              className="navbar__profile-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
