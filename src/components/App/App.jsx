import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import Main from "../Main/Main";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {
  addCaption,
  getCaptions,
  addCardLike,
  removeCardLike,
  deleteCaption,
} from "../../utils/api";
import CaptionedModal from "../CaptionedModal/CaptionedModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import * as auth from "../../utils/auth";
import { jwtDecode } from "jwt-decode";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [response, setResponse] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [captionedImages, setCaptionedImages] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoginIncorrect, setIsLoginIncorrect] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState("");
  const token = localStorage.getItem("jwt");

  function isTokenInvalid(token) {
    if (!token) return true;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      return false;
    }
  }

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
    addCaption(values, token)
      .then((newCaption) => {
        setCaptionedImages((captions) => [newCaption, ...captions]);
      })
      .catch(console.error);
  };

  const handleUpload = async () => {
    if (!imageUrl) return;

    // const formData = new FormData();
    // formData.append("image", file);

    // try {
    //   const res = await axios.post("http://localhost:3001/", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    //   setResponse(res.data.choices[0].message.content);
    // } catch (error) {
    //   console.error("Error:", error);
    //   setResponse("Error analyzing image");
    // }
    try {
      const res = await axios.post("http://localhost:3001/generate", {
        imageUrl,
      });
      const caption = res.data.choices[0].message.content;
      setResponse(JSON.stringify(res.data.choices[0].message.content, null, 2));
      onAddCaption({ caption, imageUrl });
    } catch (error) {
      console.error("Error:", error);
    }
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
        <div className="page__content">
          <Header
            handleRegisterClick={handleRegisterClick}
            handleLoginClick={handleLoginClick}
          />
          <div className="page__content page__content_generate">
            <h1>Enter an Image Link to Generate a Caption!!!</h1>
            <input
              className="modal__input"
              type="text"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              style={{ width: "300px" }}
            />
            <button className="modal__generate-btn" onClick={handleUpload}>
              Generate Caption
            </button>
            {/* <pre>{JSON.stringify(response, null, 2)}</pre> */}
            <pre>{response}</pre>
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  handleCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  captionedImages={captionedImages}
                />
              }
            />
            {/* <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile
                  onCardLike={handleCardLike}
                  handleAddClick={handleAddClick}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleChangeProfileClick={handleChangeProfileClick}
                  handleLogOutClick={handleLogOutClick}
                />
              </ProtectedRoute>
            }
          /> */}
          </Routes>
        </div>

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
