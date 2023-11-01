import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpotDetails } from "../../store/spot";
import BookingForm from "../BookingForm";

const UpdateBookingForm = () => {
  //  const { bookingId } = useParams();
  //  const dispatch = useDispatch();
  //  const booking = useSelector((state) => state.spots.singleSpot);

  //  useEffect(() => {
  //   dispatch(fetchBookingDetails(bookingId));
  //  }, [dispatch, bookingId]);

   return (
    <h1>Edit Booking Form Goes Here!</h1>
   )

  //  /<BookingForm spot={spot} formType={"Update"} />;
};

export default UpdateBookingForm;
