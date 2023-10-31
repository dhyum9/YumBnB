import { useParams } from "react-router-dom";
import BookingForm from "../BookingForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpotDetails } from "../../store/spot";

const CreateBookingForm = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots.singleSpot);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
  },[dispatch, spotId]);

  const startDate = new Date();
  const endDate = new Date();

  const booking = {
    startDate,
    endDate
  };

  return (
    <BookingForm formType={"Create"} spot={spot} booking={booking}/>
  );
}

export default CreateBookingForm;
