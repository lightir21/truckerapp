import { useUserStore } from "../../store/user-store";
import "./adminProfile.scss";
import defaultProfileImage from "../../assets/Demo-profile-picture.png";
import { useState } from "react";

const AdminProfile = () => {
  const {
    userData: { user },
    uploadProfileImg,
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

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = (base64EncodedImage) => {
    uploadProfileImg(base64EncodedImage);
  };

  return (
    <div className="adminProfile">
      <div className="adminProfile__container">
        <form
          className="adminProfile__formContainer"
          onSubmit={handleSubmitFile}
        >
          <div className="adminProfile__imageUpload">
            <label htmlFor="file-input">
              <img
                className="adminProfile__img"
                src={previewSource || user?.image || defaultProfileImage}
                alt={`profile of ${user.name}`}
              />
            </label>
            <input
              id="file-input"
              type="file"
              name="image"
              onChange={handleFileInputChange}
            />
          </div>

          <div className="adminProfile__inputContainer">
            <label htmlFor="name">שם: </label>
            <input
              id="name"
              className="adminProfile__input"
              name="name"
              type="text"
              //   value={user.name}
            />
          </div>
          <div className="adminProfile__inputContainer">
            <label htmlFor="lastName">שם משפחה: </label>
            <input
              id="lastName"
              className="adminProfile__input"
              name="lastName"
              type="text"
              //   value={user.lastName}
            />
          </div>
          <button type="submit">עדכן שינויים</button>
        </form>
      </div>
    </div>
  );
};
export default AdminProfile;
