import "./Main.css";
import CaptionedCard from "../CaptionedCard/CaptionedCard";

function Main({ handleCardClick, onCardLike, captionedImages }) {
  return (
    <main>
      <section className="cards">
        <ul className="cards__list">
          {captionedImages &&
            captionedImages.map((card, index) => {
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
      </section>
    </main>
  );
}

export default Main;
