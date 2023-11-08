import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchSpotDetails } from '../../store/spot';
import { createBooking, fetchSpotBookings, updateBooking } from '../../store/booking';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingForm.css';
import NoImage from './no-image-available.jpeg';
import SpotBookingItem from '../SpotBookingItem';

const BookingForm = ({booking, formType}) => {

  //Helper function to calculate number of days between startDate and endDate
  const getNumNights = (startDate, endDate) => {
    let loop = new Date(startDate);
    let count = 0;

    while (loop < endDate) {
      count++;
      loop.setDate(loop.getDate() + 1);
    }

    return count;
  }

  const [startDate, setStartDate] = useState(booking.startDate);
  const [endDate, setEndDate] = useState(booking.endDate);
  const [numNights, setNumNights] = useState(getNumNights(startDate, endDate));
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots.singleSpot);
  const bookingsObj = useSelector(state => state.bookings.spot);
  const spotBookings = Object.values(bookingsObj);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
    dispatch(fetchSpotBookings(spotId));
  },[dispatch, spotId]);

  useEffect(() => {
    setStartDate(booking.startDate);
    setEndDate(booking.endDate);
  }, [dispatch, booking]);

  useEffect(() => {
    setNumNights(getNumNights(startDate, endDate))
  }, [startDate, endDate]);

  if (!spot["id"]) return null;

  const convertDate = (date) => {
    const months = {
      'Jan': "01",
      'Feb': "02",
      'Mar': "03",
      'Apr': "04",
      'May': "05",
      'Jun': "06",
      'Jul': "07",
      'Aug': "08",
      'Sep': "09",
      'Oct': "10",
      'Nov': "11",
      'Dec': "12"};
    let dateParts = String(date).split(" ");
    return `${dateParts[3]}-${months[dateParts[1]]}-${dateParts[2]}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      ...booking,
      startDate: convertDate(startDate),
      endDate: convertDate(endDate)
    };

    if(formType==='Create'){
      const createdBooking = await dispatch(createBooking(payload, spotId))
      .catch(async(res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });

      if (createdBooking) {
        history.push(`/bookings/current`);
        window.alert("Your booking has been created. Enjoy your trip!");
      }
    } else if (formType==='Update'){
      const updatedBooking = await dispatch(updateBooking(payload, booking.id))
      .catch(async(res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });

      if (updatedBooking) {
        history.push(`/bookings/current`);
        window.alert("Your booking has been updated.");
      }
    }

  };

  //Sets Preview Image to first Spot Image
  let previewImageUrl = spot.SpotImages[0].url;

  //Overrides Preview Image only if preview property is true
  spot.SpotImages.forEach((imageObj) => {
    if (imageObj.preview === true) {
      previewImageUrl = imageObj.url;
    }
  })

  //Excludes already booked dates from Datepicker
  let reservedDates = [];

  for (let spotBooking of spotBookings){

    let startDate = new Date(`${spotBooking.startDate}T00:00`);
    let endDate = new Date(`${spotBooking.endDate}T00:00`);

    if(startDate.toString() === booking.startDate.toString()){
      continue;
    }

    let loop = new Date(startDate);
    while (loop <= endDate) {
      reservedDates.push(new Date(loop));
      let newDate = loop.setDate(loop.getDate() + 1);
      loop = new Date(newDate);
    }
  }

  //Set minimum date for datepicker
  let minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  //Multiplication helper function
  const multiply = (num1, num2) => num1*num2;

  return (
    <div id='booking-form-page'>
      <form onSubmit={handleSubmit} id='create-booking-form'>
        {formType==="Create" ? <h1 className='booking-form-heading'>Confirm your Booking</h1> : <h1 className='booking-form-heading'>Edit your Booking</h1>}
        <h2>Your trip</h2>
        <label for='booking-check-in-datepicker' className='booking-datepicker-label'>
          Check-In
        </label>
        <div className='booking-check-in-container'>
          <DatePicker
            selectsStart
            selected={startDate}
            onChange={date => setStartDate(date)}
            excludeDates={reservedDates}
            startDate={startDate}
            minDate={minDate}
            monthsShown={3}
            placeholderText="Your trip's start date"
            isClearable
            id='booking-check-in-datepicker'
          />
        </div>
        <div>{errors.startDate && (<p>{errors.startDate}</p>)}</div>
        <label for='booking-check-out-datepicker' className='booking-datepicker-label'>
          Checkout
        </label>
        <div className='booking-check-out-container'>
          <DatePicker
            selectsEnd
            selected={endDate}
            onChange={date => setEndDate(date)}
            excludeDates={reservedDates}
            startDate={startDate}
            endDate={endDate}
            minDate={minDate}
            monthsShown={3}
            placeholderText="Your trip's end date"
            isClearable
            id='booking-check-out-datepicker'
          />
        </div>
        <div>{errors.endDate && (<p>{errors.endDate}</p>)}</div>
        <hr></hr>
        <h2>Ground Rules</h2>
        <div id='booking-form-ground-rules-text'>We ask every guest to remember a few simple things about what makes a great guest.</div>
        <ul id='booking-form-ground-rules-list'>
          <li>Follow the house rules</li>
          <li>Treat your Host's home like your own</li>
        </ul>
        <hr></hr>
        {formType==="Create" ? <button type='submit' id='create-booking-button'>Create Booking</button> : <button type='submit' id='update-booking-button'>Update Booking</button>}
      </form>
      <div id='booking-form-spot-info'>
          <div className='booking-form-spot-details'>
            <div className='booking-form-spot-details-first-row'>
              {previewImageUrl ?
                <img className='booking-form-spot-image' src={previewImageUrl}></img> :
                <img className='booking-form-spot-image' src={NoImage}></img>}
              <div className='booking-form-spot-details-text'>
                <div className='booking-form-spot-name'>
                  {spot.name}
                </div>
                <div className='booking-form-review-info'>
                  <i className="fa-solid fa-star" id='booking-form-star-icon'></i>
                  {Number.parseFloat(spot.avgStarRating).toFixed(2)} <span className='booking-form-num-reviews'>({spot.numReviews} reviews)</span>
                </div>
              </div>
            </div>
            <hr></hr>
            <div className='booking-form-price-details'>
              <h3>Price details</h3>
              <div className='booking-form-price-calculations'>
                <div>
                  ${Number.parseFloat(spot.price).toFixed(2)} x {numNights} nights
                </div>
                <div>
                  ${Number.parseFloat(multiply(spot.price, numNights)).toFixed(2)}
                </div>
              </div>
            </div>
            <hr></hr>
            <div className='booking-form-total-price'>
              <div className='booking-form-total-label'>
                Total(USD)
              </div>
              <div>
                ${Number.parseFloat(multiply(spot.price, numNights)).toFixed(2)}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default BookingForm;
