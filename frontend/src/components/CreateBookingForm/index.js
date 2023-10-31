import BookingForm from "../BookingForm";

const CreateBookingForm = () => {
  const startDate = new Date();
  const endDate = new Date();

  const booking = {
    startDate,
    endDate
  };

  return (
    <BookingForm formType={"Create"} booking={booking}/>
  );
}

export default CreateBookingForm;
