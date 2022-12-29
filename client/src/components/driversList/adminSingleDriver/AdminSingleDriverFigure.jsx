import { useNavigate } from "react-router-dom";
import "./adminSingleDriver.scss";
import defaultProfileImage from "../../../assets/Demo-profile-picture.png";

const AdminSingleDriverFigure = ({ driver }) => {
  console.log(driver);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/driver/${id}`);
  };

  return (
    <figure
      className="adminSingleDriver"
      onClick={() => handleClick(driver._id)}
    >
      <img
        src={driver.image || defaultProfileImage}
        alt={`a profile of `}
        className="adminSingleDriver__image"
      />
      <p>{driver.userName}</p>
      <p>{`מס משאית: ${driver.truckNum}`}</p>
    </figure>
  );
};

export default AdminSingleDriverFigure;
