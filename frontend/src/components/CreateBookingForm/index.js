import BookingForm from "../BookingForm";

const CreateBookingForm = () => {
  const booking = {
    startDate: '',
    endDate: ''
  };

  return (
    <BookingForm formType={"Create"} booking={booking}/>
  );
}

export default CreateBookingForm;
