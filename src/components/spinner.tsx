export const Spinner = () => (
  <div className="spinner-loading-wrapper">
    <div className="spinner">
      {Array.from({ length: 12 }, (_, idx) => (
        <div key={idx} className="spinner-loading-bar"></div>
      ))}
    </div>
  </div>
)
