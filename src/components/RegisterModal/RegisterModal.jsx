import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const RegisterModal = ({
  activeModal,
  closeModal,
  handleOverlayClose,
  isModalOpen,
  handleRegistration,
  registrationMessage,
  handleLoginClick,
}) => {
  // declare state for each input field
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened
  useEffect(() => {
    setName("");
    setUrl("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, [isModalOpen]);

  // create onChange handlers corresponding to each state variable
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleUrlChange = (evt) => {
    setUrl(evt.target.value);
  };

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleConfirmPasswordChange = (evt) => {
    setConfirmPassword(evt.target.value);
  };

  function handleSubmit(evt) {
    // prevent default behavior
    evt.preventDefault();
    handleRegistration({ name, avatar: url, email, password, confirmPassword });
  }

  return (
    <ModalWithForm
      buttonTextA="or Log In"
      buttonText="Sign Up"
      title="Profile Registration"
      activeModal={activeModal}
      closeModal={closeModal}
      handleOverlayClose={handleOverlayClose}
      isOpen={activeModal === "registration"}
      onSubmit={handleSubmit}
      buttonClickHandler={handleLoginClick}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*{" "}
        <input
          id="register-email"
          type="email"
          value={email}
          placeholder="Email Address"
          className="modal__input"
          onChange={handleEmailChange}
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password*{" "}
        <input
          id="register-password"
          type="password"
          value={password}
          placeholder="Password"
          className="modal__input"
          onChange={handlePasswordChange}
          required
        />
      </label>
      <label htmlFor="confirm-password" className="modal__label">
        Confirm Password*{" "}
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          className="modal__input"
          onChange={handleConfirmPasswordChange}
          required
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name*{" "}
        <input
          id="register-name"
          type="text"
          placeholder="Name"
          className="modal__input"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="register-imgUrl" className="modal__label">
        Avatar URL{" "}
        <input
          id="register-imgUrl"
          type="url"
          value={url}
          placeholder="Avatar URL"
          className="modal__input"
          onChange={handleUrlChange}
          required
        />
      </label>
      <div className="modal__registration-message">{registrationMessage}</div>
    </ModalWithForm>
  );
};

export default RegisterModal;
