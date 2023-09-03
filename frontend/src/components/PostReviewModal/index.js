import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import StarsRatingInput from '../StarsRatingInput';
import { createReview } from "../../store/review";
import { fetchSpotDetails } from "../../store/spot";
import './PostReviewModal.css';

function PostReviewModal({spotId}) {
  const [reviewText, setReviewText] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      review: reviewText,
      stars
    }

    const createdReview = await dispatch(createReview(payload, spotId))
    .catch(async(res) => {
      console.log("res:", res);
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });

    if (createdReview) {
      dispatch(fetchSpotDetails(spotId));
      closeModal();
    }
  }

  const onChange = (number) => {
    setStars(number);
  };

  return (
    <form onSubmit={handleSubmit} id='post-review-modal'>
      <h2>How was your stay?</h2>
      <div className='create-review-errors'>
        {errors.review && (<p>{errors.review}</p>)}
        {errors.stars && (<p>{errors.stars}</p>)}
      </div>
      <textarea
        placeholder="Leave your review here..."
        value={reviewText}
        onChange={e => setReviewText(e.target.value)}
      />
      <StarsRatingInput stars={stars} onChange={onChange}/>
      <button type='submit' disabled={true && (reviewText.length < 10 || stars < 1)}>Submit Your Review</button>
    </form>
  );
}

export default PostReviewModal;
