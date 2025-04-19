import "./CaptionedModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function CaptionedModal({
  activeModal,
  card,
  closeModal,
  handleOverlayClose,
  handleDeleteBtnClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = card?.owner === currentUser?._id;

  return (
    <div
      className={`modal ${activeModal === "preview" && "modal_open"}`}
      onMouseDown={handleOverlayClose}
    >
      <div className="modal__img-wrapper">
        <button
          onClick={closeModal}
          type="button"
          className="modal__img-close"
        ></button>
        {isOwn && (
          <button
            onClick={handleDeleteBtnClick}
            className="modal__delete-btn"
          ></button>
        )}
        <img src={card.imageUrl} className="modal__img" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.caption}</h2>
        </div>
      </div>
    </div>
  );
}

export default CaptionedModal;
