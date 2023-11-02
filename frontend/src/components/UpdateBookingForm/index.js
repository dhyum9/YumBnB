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

   let newStartDate = new Date(booking.startDate);
   console.log('NEW START DATE: ', newStartDate)
   let newEndDate = new Date(booking.endDate);

   var newBooking = {
    id: booking.id,
    spotId: booking.spotId,
    userId: booking.userId,
    startDate: newStartDate,
    endDate: newEndDate
   }

   return (
    <BookingForm formType={"Update"} booking={newBooking}/>
   );
};

export default UpdateBookingForm;
