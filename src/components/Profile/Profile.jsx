import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import CaptionsSection from "../CaptionsSection/CaptionsSection";

const Profile = ({
  onCardLike,
  handleCardClick,
  captionedImages,
  handleAddClick,
  handleChangeProfileClick,
  handleLogOutClick,
}) => {
  return (
    <div className="profile">
      <section className="profile__sideBar">
        <SideBar
          handleChangeProfileClick={handleChangeProfileClick}
          handleLogOutClick={handleLogOutClick}
        />
      </section>
      <section className="profile__clothes">
        <CaptionsSection
          onCardLike={onCardLike}
          handleAddClick={handleAddClick}
          handleCardClick={handleCardClick}
          captionedImages={captionedImages}
        />
      </section>
    </div>
  );
};

export default Profile;
