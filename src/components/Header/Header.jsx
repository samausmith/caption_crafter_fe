import "./Header.css";
import logo from "../../assets/beach.svg";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleLogOutClick, handleRegisterClick, handleLoginClick }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>
      <h1 className="header__title">Caption Crafter</h1>
      <div className="header__link">
        {isLoggedIn ? (
          <div className="header__link-container">
            {currentUser?.avatar ? (
              <Link to="/profile">
                <div className="header__buttons">
                  <p className="header__username">{currentUser?.name}</p>

                  <img
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    className="header__avatar"
                  />
                </div>
              </Link>
            ) : (
              <div className="header__avatar-placeholder">
                {currentUser?.name && currentUser.name.charAt(0)}
              </div>
            )}
            <button onClick={handleLogOutClick} className="header__sign-out">
              Sign Out
            </button>
          </div>
        ) : (
          <div className="header__user-container">
            <button
              onClick={handleRegisterClick}
              type="button"
              className="header__add-user-btn"
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginClick}
              type="button"
              className="header__login-btn"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
