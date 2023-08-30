import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot, updateSpot, fetchSpotDetails } from '../../store/spot';
import './SpotForm.css';

const SpotForm = ({spot, formType}) => {
  // let spotPreviewImage = spot.SpotImages.find((spotImage) => spotImage.preview === true);
  // let spotPreviewImageUrl = spotPreviewImage.url;

  const [country, setCountry] = useState(spot.country);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [latitude, setLatitude] = useState(spot.lat);
  const [longitude, setLongitude] = useState(spot.lng);
  const [description, setDescription] = useState(spot.description);
  const [name, setName] = useState(spot.name);
  const [price, setPrice] = useState(spot.price);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [imageUrl3, setImageUrl3] = useState(spot.imageUrl3);
  const [imageUrl4, setImageUrl4] = useState(spot.imageUrl4);
  const [imageUrl5, setImageUrl5] = useState(spot.imageUrl5);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setCountry(spot.country);
    setAddress(spot.address);
    setCity(spot.city);
    setState(spot.state);
    setLatitude(spot.lat);
    setLongitude(spot.lng);
    setDescription(spot.description);
    setName(spot.name);
    setPrice(spot.price);
  }, [dispatch, spot]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      ...spot,
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

    if(formType==='Create'){
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
    } else if (formType==='Update'){
      const updatedSpot = await dispatch(updateSpot(payload, spot.id))
      .catch(async(res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });

      if (updatedSpot) {
        await dispatch(fetchSpotDetails(updatedSpot.id));
        history.push(`/spots/${updatedSpot.id}`);
      }
    }

    // previewImageUrl ? dispatch(createSpotImage({url: previewImageUrl, preview: true})) : setErrors({...errors, previewImageUrl: "Preview Image is required"});

  };

  return (
    <section>
      <form id='create-spot-form' onSubmit={handleSubmit}>
        {formType==="Create" ? <h3>Create a New Spot</h3> : <h3>Update your Spot</h3>}
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
            <div className='create-spot-comma'>,</div>
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
            <div className='create-spot-comma'>,</div>
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
          <div className='create-spot-section-text'>
            <h4>Describe your place to guests</h4>
            <div>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</div>
          </div>
          <label id='description'>
            <textarea
              placeholder="Please write at least 30 characters"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className='create-spot-input create-spot-block-input'
            />
            <div className='inline-create-form-errors'>
              {errors.description && (<p>{errors.description}</p>)}
            </div>
          </label>
          <hr style={{margin: "10px 0px"}}></hr>
        </div>
        <div id='create-spot-section-three'>
          <div className='create-spot-section-text'>
            <h4>Create a title for your spot</h4>
            <div>Catch guests' attention with a spot title that highlights what makes your place special.</div>
          </div>
          <label id='name'>
            <input
              type="text"
              placeholder="Name of your spot"
              value={name}
              onChange={e => setName(e.target.value)}
              className='create-spot-input create-spot-block-input'
            />
            <div className='inline-create-form-errors'>
              {errors.name && (<p>{errors.name}</p>)}
            </div>
          </label>
          <hr style={{margin: "10px 0px"}}></hr>
        </div>
        <div id='create-spot-section-four'>
          <div className='create-spot-section-text'>
            <h4>Set a base price for your spot</h4>
            <div>Competitive pricing can help your listing stand out and rank higher in search results.</div>
          </div>
          <label id='price'>
            <input
              type="number"
              min="0"
              placeholder="Price per night (USD)"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className='create-spot-input create-spot-block-input'
            />
            <div className='inline-create-form-errors'>
              {errors.price && (<p>{errors.price}</p>)}
            </div>
          </label>
          <hr style={{margin: "10px 0px"}}></hr>
        </div>
        <div id='create-spot-section-five'>
          <div className='create-spot-section-text'>
            <h4>Liven up your spot with photos</h4>
            <div>Submit a link to at least one photo to publish your spot.</div>
          </div>
          <label id='photos'>
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
          <hr style={{margin: "10px 0px"}}></hr>
        </div>
        {formType==="Create" ? <button type='submit' id='create-spot-button'>Create Spot</button> : <button type='submit' id='create-spot-button'>Update Spot</button>}
      </form>
    </section>
  );
}

export default SpotForm;


  // const pokeTypes = useSelector(state => state.pokemon.types);

  // useEffect(() => {
  //   dispatch(getPokemonTypes());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (pokeTypes.length && !type) {
  //     setType(pokeTypes[0]);
  //   }
  // }, [pokeTypes, type]);
