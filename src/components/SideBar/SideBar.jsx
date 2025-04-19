import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const SideBar = ({ handleChangeProfileClick, handleLogOutClick }) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sideBar">
      <div className="sideBar__profile">
        <img
          className="sideBar__avatar"
          src={currentUser.avatar}
          alt="User Avatar"
        />
        <p className="sideBar__username">{currentUser.name}</p>
      </div>

      <div className="sideBar__btns">
        <button onClick={handleChangeProfileClick} className="sideBar__btn">
          Change Profile Data
        </button>
        <button onClick={handleLogOutClick} className="sideBar__btn">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
