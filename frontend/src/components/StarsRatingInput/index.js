import { useEffect, useState } from 'react';

const StarsRatingInput = ({ stars, onChange }) => {
  const [activeRating, setActiveRating] = useState(stars);

  useEffect(() => {
    setActiveRating(stars)
  }, [stars])

  console.log(stars);

  return (
    <>
      <div className="stars-rating-input" style={{ display:'flex', width: "30%", alignItems:'center', justifyContent:"space-between", margin:"10px" }}>
        <div
          onMouseEnter={() => { setActiveRating(1) }}
          onMouseLeave={() => { setActiveRating(stars) }}
          onClick={() => onChange(1)}
        >
          <i className={activeRating >= 1 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
        </div>
        <div
          onMouseEnter={() => { setActiveRating(2) }}
          onMouseLeave={() => { setActiveRating(stars) }}
          onClick={() => onChange(2)}
        >
          <i className={activeRating >= 2 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
        </div>
        <div
          onMouseEnter={() => { setActiveRating(3) }}
          onMouseLeave={() => { setActiveRating(stars) }}
          onClick={() => onChange(3)}
        >
          <i className={activeRating >= 3 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
        </div>
        <div
          onMouseEnter={() => { setActiveRating(4) }}
          onMouseLeave={() => { setActiveRating(stars) }}
          onClick={() => onChange(4)}
        >
          <i className={activeRating >= 4 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
        </div>
        <div
          onMouseEnter={() => { setActiveRating(5) }}
          onMouseLeave={() => { setActiveRating(stars) }}
          onClick={() => onChange(5)}
        >
          <i className={activeRating >= 5 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
        </div>
      </div>
    </>
  );
};

export default StarsRatingInput;
