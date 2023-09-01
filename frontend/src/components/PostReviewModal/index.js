import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function PostReviewModal() {
  const [reviewText, setReviewText] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      review: reviewText,
      stars
    }

    // const createdSpot = await dispatch(createSpot(payload))
    // .catch(async(res) => {
    //   const data = await res.json();
    //   if (data && data.errors) {
    //     setErrors(data.errors);
    //   }
    // });

    // if (createdSpot) {
    //   for (let spotImage of spotImagePayload){
    //     await dispatch(createSpotImage(spotImage, createdSpot.id))
    //   }
    //   await dispatch(fetchSpotDetails(createdSpot.id));
    //   history.push(`/spots/${createdSpot.id}`);
  }
  return (
    <form>
      <h2>How was your stay?</h2>
      <textarea
        placeholder="Write your review here."
        value={reviewText}
        onChange={e => setReviewText(e.target.value)}
      />
      <div className="stars-input">
        <div
          // className={stars >= 1 ? "filled" : "empty"}
          // onMouseEnter={() => { if (!disabled) setStars(1) }}
          // onMouseLeave={() => { if (!disabled) setStars(stars) }}
          // onClick={() => onChange(1)}
        >
          <i class="fa-regular fa-star"></i>
        </div>
        <div
          // className={activeRating >= 2 ? "filled" : "empty"}
          // onMouseEnter={() => { if (!disabled) setActiveRating(2) }}
          // onMouseLeave={() => { if (!disabled) setActiveRating(rating) }}
          // onClick={() => onChange(2)}
        >
          <i class="fa-regular fa-star"></i>
        </div>
        <div
          // className={activeRating >= 3 ? "filled" : "empty"}
          // onMouseEnter={() => { if (!disabled) setActiveRating(3) }}
          // onMouseLeave={() => { if (!disabled) setActiveRating(rating) }}
          // onClick={() => onChange(3)}
        >
          <i class="fa-regular fa-star"></i>
        </div>
        <div
          // className={activeRating >= 4 ? "filled" : "empty"}
          // onMouseEnter={() => { if (!disabled) setActiveRating(4) }}
          // onMouseLeave={() => { if (!disabled) setActiveRating(rating) }}
          // onClick={() => onChange(4)}
        >
          <i class="fa-regular fa-star"></i>
        </div>
        <div
          // className={activeRating >= 5 ? "filled" : "empty"}
          // onMouseEnter={() => { if (!disabled) setActiveRating(5) }}
          // onMouseLeave={() => { if (!disabled) setActiveRating(rating) }}
          // onClick={() => onChange(5)}
        >
          <i class="fa-regular fa-star"></i>
        </div>
      </div>
      <button>Submit Your Review</button>
    </form>
  );
}

export default PostReviewModal;
