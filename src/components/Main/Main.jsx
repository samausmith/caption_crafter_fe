import "./Main.css";
import CaptionedCard from "../CaptionedCard/CaptionedCard";

function Main({ handleCardClick, onCardLike, captionedImages }) {
  captionedImages.map((card) => {
    console.log(card._id);
  });
  return (
    <main>
      <section className="cards">
        <ul className="cards__list">
          {captionedImages &&
            captionedImages.map((card) => {
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
