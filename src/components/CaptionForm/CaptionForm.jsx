import "./CaptionForm.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext, useState } from "react";

function CaptionForm({
  imageUrl,
  setImageUrl,
  handleGenerateCaption,
  captionError,
}) {
  const { isLoggedIn } = useContext(CurrentUserContext);

  return (
    <>
      {isLoggedIn ? (
        <div className="caption-form">
          <h2 className="caption-form__header">
            Enter an Image Link to Generate a Caption!!!
          </h2>
          <form className="caption-form__form" onSubmit={handleGenerateCaption}>
            <input
              className="caption-form__input"
              type="text"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button className="caption-form__button">Generate Caption</button>
          </form>
          {captionError && (
            <p className="caption-form__error">{captionError}</p>
          )}
        </div>
      ) : (
        <div className="caption-form">
          <h2 className="caption-form__header">
            Please Log In to Start Crafting Your Captions!!!
          </h2>
        </div>
      )}
    </>
  );
}

export default CaptionForm;
