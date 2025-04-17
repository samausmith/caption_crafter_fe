import "./DeleteModal.css";

function DeleteModal({
  activeModal,
  card,
  closeModal,
  handleOverlayClose,
  handleDeleteCaption,
}) {
  return (
    <div
      onMouseDown={handleOverlayClose}
      className={`modal ${activeModal === "delete-modal" && "modal_open"}`}
    >
      <div className="modal__content modal__content_delete-modal">
        <button
          onClick={closeModal}
          type="button"
          className="modal__close"
        ></button>
        <div className="modal__delete-text">
          <p className="modal__title modal__title_delete">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__title modal__title_delete">
            This action is irreversible.
          </p>
        </div>
        <div className="modal__delete-btns">
          <button
            onClick={() => handleDeleteCaption(card)}
            className="modal__confirm-delete-btn"
          >
            Yes, delete item
          </button>
          <button onClick={closeModal} className="modal__cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
