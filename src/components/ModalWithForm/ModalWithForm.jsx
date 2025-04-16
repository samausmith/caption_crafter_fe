import "./ModalWithForm.css";

function ModalWithForm({
  buttonTextA,
  children,
  buttonText,
  title,
  closeModal,
  handleOverlayClose,
  isOpen,
  onSubmit,
  buttonClickHandler,
}) {
  return (
    <div
      className={`modal ${isOpen && "modal_open"}`}
      onMouseDown={handleOverlayClose}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeModal}
          type="button"
          className="modal__close"
        ></button>
        <form action="" className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__container-btns">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            <button
              onClick={buttonClickHandler}
              type="button"
              className="modal__btn"
            >
              {buttonTextA}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
