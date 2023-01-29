import { useUserStore } from "../../store/user-store";
import "./adminProfile.scss";
import defaultProfileImage from "../../assets/Demo-profile-picture.png";
import { useState } from "react";

const AdminProfile = () => {
  const {
    userData: { user },
    uploadProfileImg,
    updateAdminInfo,
  } = useUserStore();

  const [previewSource, setPreviewSource] = useState("");
  const [values, setValues] = useState(user);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    createFilePreview(file);
  };

  const createFilePreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (previewSource) {
      uploadImage(previewSource);
    }

    updateAdminInfo(values);
  };

  const uploadImage = (base64EncodedImage) => {
    uploadProfileImg(base64EncodedImage);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="adminProfile">
      <div className="adminProfile__container">
        <form className="adminProfile__formContainer" onSubmit={handleSubmit}>
          <div className="adminProfile__imageUpload">
            <label htmlFor="file-input">
              <img
                className="adminProfile__img"
                src={previewSource || user?.image || defaultProfileImage}
                alt={`profile of ${user?.name}`}
              />
            </label>
            <input
              id="file-input"
              type="file"
              name="image"
              onChange={handleFileInputChange}
            />
          </div>

          <div className="adminProfile__info">
            <div className="adminProfile__inputContainer">
              <label htmlFor="name">שם: </label>
              <input
                id="name"
                className="adminProfile__input"
                name="name"
                type="text"
                value={values?.name}
                onChange={handleChange}
              />
            </div>
            <div className="adminProfile__inputContainer">
              <label htmlFor="lastName">שם משפחה: </label>
              <input
                id="lastName"
                className="adminProfile__input"
                name="lastName"
                type="text"
                value={values?.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="adminProfile__btn btn">
            עדכן שינויים
          </button>
        </form>
      </div>
    </div>
  );
};
export default AdminProfile;
