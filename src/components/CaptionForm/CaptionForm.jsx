import "./CaptionForm.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function CaptionForm({ imageUrl, setImageUrl, handleUpload }) {
  const { isLoggedIn } = useContext(CurrentUserContext);
  return (
    <>
      {isLoggedIn ? (
        <div className="page__content page__content_generate">
          <h1 className="modal__header">
            Enter an Image Link to Generate a Caption!!!
          </h1>
          <form className="page__caption-form" onSubmit={handleUpload}>
            <input
              className="modal__input"
              type="text"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              style={{ width: "300px" }}
            />
            <button className="modal__generate-btn">Generate Caption</button>
          </form>
        </div>
      ) : (
        <div className="page__content page__content_generate">
          <h1>Please Log In to Start Crafting Your Captions!!!</h1>
        </div>
      )}
    </>
  );
}

export default CaptionForm;
