import "./loader.css";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Please wait...</p>
      </div>
    </div>
  );
};

export default Loader;