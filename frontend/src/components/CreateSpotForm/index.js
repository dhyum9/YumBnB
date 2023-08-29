import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot, fetchSpotDetails } from '../../store/spot';
import './CreateSpotForm.css';

const CreateSpotForm = () => {
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [imageUrl3, setImageUrl3] = useState('');
  const [imageUrl4, setImageUrl4] = useState('');
  const [imageUrl5, setImageUrl5] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      address,
      city,
      state,
      country,
      lat: latitude,
      lng: longitude,
      name,
      description,
      price
    };

    const createdSpot = await dispatch(createSpot(payload))
    .catch(async(res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });

    if (createdSpot) {
      await dispatch(fetchSpotDetails(createdSpot.id));
      history.push(`/spots/${createdSpot.id}`);
    }
  };

  return (
    <section>
      <form id='create-spot-form' onSubmit={handleSubmit}>
        <h3>Create a New Spot</h3>
        <div id='create-spot-section-one'>
          <div className='create-spot-section-text'>
            <h4>Where's your place located?</h4>
            <div>Guests will only get your exact address once they booked a reservation.</div>
          </div>
          <label>
            Country
            <div className='create-form-errors'>
              {errors.country && (<p>{errors.country}</p>)}
            </div>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={e => setCountry(e.target.value)}
              className='create-spot-block-input create-spot-input'
            />
          </label>
          <label>
            Street Address
            <div className='create-form-errors'>
              {errors.address && (<p>{errors.address}</p>)}
            </div>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className='create-spot-block-input create-spot-input'
            />
          </label>
          <div id='city-state-row'>
            <label id='city'>
              City
              <div className='create-form-errors'>
                {errors.city && (<p>{errors.city}</p>)}
              </div>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={e => setCity(e.target.value)}
                className='create-spot-input'
              />
            </label>
            <div class='create-spot-comma'>,</div>
            <label id='state'>
              State
              <div className='create-form-errors'>
                {errors.state && (<p>{errors.state}</p>)}
              </div>
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={e => setState(e.target.value)}
                className='create-spot-input'
              />
            </label>
          </div>
          <div id='lat-lng-row'>
            <label id='lat'>
              Latitude
              <div className='create-form-errors'>
                {errors.lat && (<p>{errors.lat}</p>)}
              </div>
              <input
                type="number"
                placeholder="Latitude"
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
                className='create-spot-input'
              />
            </label>
            <div class='create-spot-comma'>,</div>
            <label id='lng'>
              Longitude
              <div className='create-form-errors'>
                {errors.lng && (<p>{errors.lng}</p>)}
              </div>
              <input
                type="number"
                placeholder="Longitude"
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
                className='create-spot-input'
              />
            </label>
          </div>
          <hr style={{margin: "10px 0px"}}></hr>
        </div>
        <div id='create-spot-section-two'>
          <label>
            Describe your place to guests
            <textarea
              placeholder="Please write at least 30 characters"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className='create-spot-input create-spot-block-input'
            />
            <div className='create-form-errors'>
              {errors.description && (<p>{errors.description}</p>)}
            </div>
          </label>
        </div>
        <label>
          Create a title for your spot
          <input
            type="text"
            placeholder="Name of your spot"
            value={name}
            onChange={e => setName(e.target.value)}
            className='create-spot-input create-spot-block-input'
          />
          <div className='create-form-errors'>
            {errors.name && (<p>{errors.name}</p>)}
          </div>
        </label>
        <label>
          Set a base price for your spot
          <input
            type="number"
            min="0"
            placeholder="Price per night (USD)"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className='create-spot-input create-spot-block-input'
          />
          <div className='create-form-errors'>
            {errors.price && (<p>{errors.price}</p>)}
          </div>
        </label>
        <label>
          Liven up your spot with photos
          <input
            type="text"
            placeholder="Preview Image Url"
            value={previewImageUrl}
            onChange={e => setPreviewImageUrl(e.target.value)}
            className='create-spot-input create-spot-block-input'
          />
          <input
            type="text"
            placeholder="Image Url"
            value={imageUrl2}
            onChange={e => setImageUrl2(e.target.value)}
            className='create-spot-input create-spot-block-input'
          />
          <input
            type="text"
            placeholder="Image Url"
            value={imageUrl3}
            onChange={e => setImageUrl3(e.target.value)}
            className='create-spot-input create-spot-block-input'
          />
          <input
            type="text"
            placeholder="Image Url"
            value={imageUrl4}
            onChange={e => setImageUrl4(e.target.value)}
            className='create-spot-input create-spot-block-input'
          />
          <input
            type="text"
            placeholder="Image Url"
            value={imageUrl5}
            onChange={e => setImageUrl5(e.target.value)}
            className='create-spot-input create-spot-block-input'
          />
        </label>
        <button type='submit'>Create Spot</button>
      </form>
    </section>
  );
}

export default CreateSpotForm;


  // const pokeTypes = useSelector(state => state.pokemon.types);

  // useEffect(() => {
  //   dispatch(getPokemonTypes());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (pokeTypes.length && !type) {
  //     setType(pokeTypes[0]);
  //   }
  // }, [pokeTypes, type]);
