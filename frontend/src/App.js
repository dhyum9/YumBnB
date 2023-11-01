import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from "./components/SpotIndex";
import SpotShow from "./components/SpotShow";
import UpdateSpotForm from "./components/UpdateSpotForm";
import CreateSpotForm from "./components/CreateSpotForm";
import ReviewIndex from "./components/ReviewIndex";
import BookingIndex from "./components/BookingIndex";
import CreateBookingForm from "./components/CreateBookingForm";
import UpdateBookingForm from "./components/UpdateBookingForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path='/'>
            <SpotIndex type={"all"}/>
          </Route>
          <Route exact path='/spots/current'>
            <SpotIndex type={"usersOnly"}/>
          </Route>
          <Route exact path='/reviews/current'>
            <ReviewIndex />
          </Route>
          <Route exact path='/bookings/current'>
            <BookingIndex />
          </Route>
          <Route exact path='/bookings/:bookingId/edit'>
            <UpdateBookingForm />
          </Route>
          <Route path='/spots/:spotId/edit'>
            <UpdateSpotForm />
          </Route>
          <Route path='/spots/:spotId/bookings'>
            <CreateBookingForm />
          </Route>
          <Route path='/spots/:spotId'>
            <SpotShow />
          </Route>
          <Route exact path='/spots'>
            <CreateSpotForm />
          </Route>
        </Switch>}
    </>
  );
}

export default App;
