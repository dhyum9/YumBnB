import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from "./components/SpotIndex";
import SpotShow from "./components/SpotShow";
import SpotForm from "./components/SpotForm";
import CreateSpotForm from "./components/CreateSpotForm";

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
          <Route path='/spots/:spotId/edit'>
            <SpotForm formType={"Update"}/>
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
