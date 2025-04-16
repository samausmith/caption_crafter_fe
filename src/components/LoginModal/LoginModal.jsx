import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const LoginModal = ({
  isLoginIncorrect,
  activeModal,
  closeModal,
  handleOverlayClose,
  handleLogin,
  isModalOpen,
  handleRegisterClick,
}) => {
  // declare state for each input field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isModalOpen]);

  // create onChange handlers corresponding to each state variable
  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  function handleSubmit(evt) {
    // prevent default behavior
    evt.preventDefault();
    // call onAddItem with appropriate arguments
    handleLogin({ email, password });
  }

  return (
    <ModalWithForm
      buttonTextA="Sign Up"
      buttonText="Log In"
      title="Log In"
      activeModal={activeModal}
      closeModal={closeModal}
      handleOverlayClose={handleOverlayClose}
      isOpen={activeModal === "login"}
      onSubmit={handleSubmit}
      buttonClickHandler={handleRegisterClick}
    >
      {isLoginIncorrect ? (
        <div className="modal__login-failure">Incorrect Email or Password</div>
      ) : null}
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="modal__input"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          id="password"
          type="password"
          value={password}
          placeholder="Password"
          className="modal__input"
          onChange={handlePasswordChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
