import'./SpotShowImage.css';

const SpotShowImage = ({images}) => {
  let previewImageUrl;
  let nonPreviewImages = [];

  images.forEach((imageObj) => {
    imageObj.preview === true ? previewImageUrl = imageObj.url : nonPreviewImages.push(imageObj.url);
  })

  return (
    <div id='spot-show-images-grid'>
      <div id='spot-show-image-left-col'>
        <img src={previewImageUrl} alt="Pics of the place go here"></img>
      </div>
      <div id='spot-show-image-right-col'>
        {nonPreviewImages.map((url) => <img id='right-col-image' src={url} alt="Pics of the place go here"></img>)}
      </div>
    </div>
  );
}

export default SpotShowImage;
