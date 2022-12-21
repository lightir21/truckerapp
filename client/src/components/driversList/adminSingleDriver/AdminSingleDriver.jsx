import { useNavigate } from "react-router-dom";
import "./adminSingleDriver.scss";

const AdminSingleDriver = ({ driver }) => {
  const { fullName, truck, img } = driver;

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/driver/${id}`);
  };

  return (
    <figure
      className="adminSingleDriver"
      onClick={() => handleClick(driver.id)}
    >
      <img
        src={img}
        alt={`a profile of ${fullName}`}
        className="adminSingleDriver__image"
      />
      <p>{fullName}</p>
      <p>{`מס משאית: ${truck}`}</p>
    </figure>
  );
};

export default AdminSingleDriver;
