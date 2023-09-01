import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './PostReviewModal.css';
import { useModal } from "../../context/Modal";
import StarsRatingInput from '../StarsRatingInput';

function PostReviewModal() {
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
    closeModal();
  }

  const onChange = (number) => {
    setStars(number);
  };

  return (
    <form id='post-review-modal'>
      <h2>How was your stay?</h2>
      <textarea
        placeholder="Write your review here."
        value={reviewText}
        onChange={e => setReviewText(e.target.value)}
      />
      <StarsRatingInput stars={stars} onChange={onChange}/>
      <button>Submit Your Review</button>
    </form>
  );
}

export default PostReviewModal;
