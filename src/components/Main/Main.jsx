import "./Main.css";
import { useState } from "react";
import CaptionedCard from "../CaptionedCard/CaptionedCard";

function Main({ handleCardClick, onCardLike, captionedImages }) {
  const [visibleCount, setVisibleCount] = useState(4);
  const canShowMore = captionedImages.length > visibleCount;
  const canShowLess = visibleCount > 4;

  const handleShowMore = () => {
    setVisibleCount((prevCard) => prevCard + 4);
  };

  const handleShowLess = () => {
    setVisibleCount((prevCard) => prevCard - 4);
  };

  return (
    <main>
      <section className="cards">
        <ul className="cards__list">
          {captionedImages &&
            captionedImages.slice(0, visibleCount).map((card) => {
              return (
                <CaptionedCard
                  key={card._id}
                  card={card}
                  handleCardClick={handleCardClick}
                  onCardLike={onCardLike}
                />
              );
            })}
        </ul>
        <div className="cards__show-btns">
          {canShowLess && (
            <button className="cards__show-btn" onClick={handleShowLess}>
              Show Less
            </button>
          )}
          {canShowMore && (
            <button className="cards__show-btn" onClick={handleShowMore}>
              Show More
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default Main;
