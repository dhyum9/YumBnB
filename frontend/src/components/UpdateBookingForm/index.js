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

   if(!booking.startDate) return null;
   if(!booking.endDate) return null;

   //Converts dates to local time and to be accepted by DatePicker
   let newStartDate = new Date(`${booking.startDate}T00:00`);
   let newEndDate = new Date(`${booking.endDate}T00:00`);


   console.log('START DATE: ',newStartDate);
   console.log('END DATE: ', newEndDate);

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
