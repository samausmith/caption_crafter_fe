import "./Main.css";
import CaptionedCard from "../CaptionedCard/CaptionedCard";

function Main({ handleCardClick, onCardLike, captionedImages }) {
  return (
    <main>
      <section className="cards">
        <h2 className="cards__text">
          Enter an image link to generate a caption!!!
        </h2>
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
