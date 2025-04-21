import "./Preloader.css";

function Preloader({ isLoading, activeModal }) {
  return (
    isLoading && (
      <div
        className={`preloader__modal ${
          activeModal === "preloader" && "preloader__modal_open"
        }`}
      >
        <div className="circle-preloader"></div>
        <p className="preloader__text">Generating Caption...</p>
      </div>
    )
  );
}

export default Preloader;
