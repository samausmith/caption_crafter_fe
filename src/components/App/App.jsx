import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import Main from "../Main/Main";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {
  generateCaption,
  addCaption,
  addCaptionAsUser,
  getCaptions,
  addCardLike,
  removeCardLike,
  deleteCaption,
} from "../../utils/api";
import CaptionForm from "../CaptionForm/CaptionForm";
import CaptionedModal from "../CaptionedModal/CaptionedModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Preloader from "../Preloader/Preloader";
import * as auth from "../../utils/auth";
import { jwtDecode } from "jwt-decode";
import { BASEURL } from "../../utils/constants";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [captionedImages, setCaptionedImages] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoginIncorrect, setIsLoginIncorrect] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [captionError, setCaptionError] = useState("");
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  function isTokenInvalid(token) {
    if (!token) return true;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      return false;
    }
  }

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    auth
      .editProfile({ token, name, avatar })
      .then((user) => {
        setCurrentUser(user);
      })
      .then(closeModal)
      .catch(console.error);
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("jwt");
    navigate("/");
    setIsLoggedIn(false);
  };

  const handleChangeProfileClick = () => {
    setActiveModal("edit-profile");
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
    setIsModalOpen(true);
  };

  const handleRegistration = ({
    name,
    avatar,
    email,
    password,
    confirmPassword,
  }) => {
    if (password === confirmPassword) {
      auth
        .registerUser({ name, avatar, email, password })
        .then(() => {
          handleLogin({ email, password });
        })
        .catch(console.error);
    } else {
      setRegistrationMessage("Passwords do not match");
    }
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .loginUser({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        if (data.token) {
          auth
            .getToken(data.token)
            .then((user) => {
              setCurrentUser(user);
              setIsLoggedIn(true);
            })
            .then(closeModal)
            .catch((err) => {
              console.error(err);
            });
        } else {
          throw new Error("No token received or is invalid");
        }
      })
      .catch((error) => {
        setIsLoggedIn(false);
        setIsLoginIncorrect(true);
        console.error(error);
      });
  };

  const handleDeleteCaption = (card) => {
    deleteCaption(card._id, token)
      .then(() => {
        setCaptionedImages((captions) =>
          captions.filter((caption) => caption._id !== card._id)
        );
      })
      .then(closeModal)
      .catch(console.error);
  };

  const handleOverlayClose = (evt) => {
    if (evt.target.classList.contains("modal_open")) {
      closeModal();
    }
  };

  const handleDeleteBtnClick = () => {
    setActiveModal("delete-modal");
  };

  const handleRegisterClick = () => {
    setActiveModal("registration");
    setIsModalOpen(true);
  };

  const handleLoginClick = () => {
    setActiveModal("login");
    setIsModalOpen(true);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCardLike = (card, isLiked) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array

        // the first argument is the card's id
        addCardLike(card._id, token)
          .then((updatedCard) => {
            setCaptionedImages((cards) =>
              cards.map((caption) =>
                caption._id === card._id ? updatedCard : caption
              )
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array

        // the first argument is the card's id
        removeCardLike(card._id, token)
          .then((updatedCard) => {
            setCaptionedImages((cards) =>
              cards.map((caption) =>
                caption._id === card._id ? updatedCard : caption
              )
            );
          })
          .catch((err) => console.log(err));
  };

  const closeModal = () => {
    setActiveModal("");
    setIsModalOpen(false);
  };

  const onAddCaption = (values) => {
    if (token && !isTokenInvalid(token)) {
      addCaptionAsUser(values, token)
        .then((newCaption) => {
          setCaptionedImages((captions) => [newCaption, ...captions]);
        })
        .catch(console.error);
    } else {
      addCaption(values)
        .then((newCaption) => {
          setCaptionedImages((captions) => [newCaption, ...captions]);
        })
        .catch(console.error);
    }
  };

  const handleGenerateCaption = async (e) => {
    e.preventDefault();
    if (!imageUrl) return;

    setIsLoading(true);
    setActiveModal("preloader");

    generateCaption(imageUrl)
      .then((data) => {
        const caption = data.choices[0].message.content;
        onAddCaption({ caption, imageUrl });
        setImageUrl("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setCaptionError(error);
      })
      .finally(() => {
        setIsLoading(false);
        setActiveModal("");
      });
  };

  useEffect(() => {
    if (token && !isTokenInvalid(token)) {
      auth
        .getToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem("jwt");
    }
  }, []);

  useEffect(() => {
    getCaptions()
      .then((data) => {
        setCaptionedImages(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={{ isLoggedIn, currentUser }}>
      <div className="page">
        <Header
          handleLogOutClick={handleLogOutClick}
          handleRegisterClick={handleRegisterClick}
          handleLoginClick={handleLoginClick}
        />
        <div className="page__content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="page__main">
                  <CaptionForm
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    handleGenerateCaption={handleGenerateCaption}
                    captionError={captionError}
                  />
                  <Main
                    handleCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    captionedImages={captionedImages}
                  />
                </div>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile
                    handleAddClick={handleAddClick}
                    onCardLike={handleCardLike}
                    handleCardClick={handleCardClick}
                    captionedImages={captionedImages}
                    handleChangeProfileClick={handleChangeProfileClick}
                    handleLogOutClick={handleLogOutClick}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Preloader isLoading={isLoading} activeModal={activeModal} />
        <EditProfileModal
          handleEditProfile={handleEditProfile}
          activeModal={activeModal}
          closeModal={closeModal}
          handleOverlayClose={handleOverlayClose}
          isModalOpen={isModalOpen}
        />
        <CaptionedModal
          activeModal={activeModal}
          card={selectedCard}
          closeModal={closeModal}
          handleOverlayClose={handleOverlayClose}
          handleDeleteBtnClick={handleDeleteBtnClick}
        />
        <DeleteModal
          activeModal={activeModal}
          card={selectedCard}
          closeModal={closeModal}
          handleOverlayClose={handleOverlayClose}
          handleDeleteCaption={handleDeleteCaption}
        />
        <LoginModal
          isLoginIncorrect={isLoginIncorrect}
          handleLogin={handleLogin}
          activeModal={activeModal}
          closeModal={closeModal}
          handleOverlayClose={handleOverlayClose}
          isModalOpen={isModalOpen}
          handleRegisterClick={handleRegisterClick}
        />
        <RegisterModal
          handleLoginClick={handleLoginClick}
          registrationMessage={registrationMessage}
          handleRegistration={handleRegistration}
          activeModal={activeModal}
          closeModal={closeModal}
          handleOverlayClose={handleOverlayClose}
          isModalOpen={isModalOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
