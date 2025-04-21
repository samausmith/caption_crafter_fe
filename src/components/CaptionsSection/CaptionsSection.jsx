import "./CaptionsSection.css";
import { useContext, useState } from "react";
import CaptionedCard from "../CaptionedCard/CaptionedCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const CaptionsSection = ({ handleCardClick, captionedImages, onCardLike }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredCaptions = showFavorites
    ? captionedImages.filter((caption) =>
        caption.likes?.includes(currentUser._id)
      )
    : captionedImages.filter((caption) => caption.owner === currentUser._id);

  return (
    <div className="captionsSection">
      <div className="captionsSection__header">
        <button
          onClick={() => setShowFavorites(false)}
          className={`captionsSection__btn ${
            !showFavorites ? "captionsSection__btn_active" : ""
          }`}
        >
          Your Captions
        </button>
        <button
          onClick={() => setShowFavorites(true)}
          className={`captionsSection__btn ${
            showFavorites ? "captionsSection__btn_active" : ""
          }`}
        >
          Favorites
        </button>
      </div>
      <ul className="captionsSection__cards-list">
        {filteredCaptions.map((caption) => (
          <CaptionedCard
            key={caption._id}
            card={caption}
            handleCardClick={handleCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
};

export default CaptionsSection;
