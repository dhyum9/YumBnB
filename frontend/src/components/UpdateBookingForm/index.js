import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBookingDetails } from "../../store/booking";
import BookingForm from "../BookingForm";

const UpdateBookingForm = () => {
   const { bookingId } = useParams();
   const dispatch = useDispatch();
   const booking = useSelector((state) => state.bookings.singleBooking);

   useEffect(() => {
    dispatch(fetchBookingDetails(bookingId));
   }, [dispatch, bookingId]);

   console.log(booking);

   return (
    <BookingForm formType={"Update"} booking={booking}/>
   );
};

export default UpdateBookingForm;
