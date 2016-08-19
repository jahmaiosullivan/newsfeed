import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import underscore from 'lodash';

const thumbwidthHeight = '100px';
const dropZoneStyle = {
  width: thumbwidthHeight,
  height: thumbwidthHeight,
  border: '2px dashed rgb(102, 102, 102)',
  borderRadius: '5px'
};
const thumbnailBoxStyle = {position: 'relative'};
const spinner = require('./images/ajax_loader_blue_48.gif');
const spinnerOverlay = {
  position: 'absolute',
  top: 0,
  width: thumbwidthHeight,
  height: thumbwidthHeight,
  background: `rgba(255,255,255, 0.3) url(${spinner}) center center no-repeat`
};


const ThumbnailBox = ({image, onRemoveHandler}) => {
  return (
    <div key={`img.${image.preview}`} style={thumbnailBoxStyle}>
      <img height={thumbwidthHeight} width={thumbwidthHeight} src={image.preview}/>
      <a onClick={onRemoveHandler}>Remove</a>
      {image.loading && <div style={spinnerOverlay}/>}
    </div>
  );
};

export default class DropZone extends Component {
  static propTypes = {
    uploadImageHandler: PropTypes.func.isRequired,
    onChangeHandler: PropTypes.func,
    showOpenButton: PropTypes.bool,
    images: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {images: props.images ? props.images : []};
    this._onOpenClick = () => {
      this.onOpenClick();
    };
    this._onDrop = (images) => {
      this.onDrop(images);
    };
    this._updateImagesView = (images) => {
      this.updateImagesView(images);
    };
    this._uploadImage = (image, cb) => {
      this.uploadImage(image, cb);
    };
  }

  onDrop(newImages) {
    const allImages = [...this.state.images];
    newImages.forEach((newImage) => {
      allImages.push({...newImage, loading: true});
      this._updateImagesView(allImages);

      this._uploadImage(newImage, (result) => {
        const index = underscore.indexOf(allImages, underscore.find(allImages, newImage));
        allImages.splice(index, 1, {...newImage, uploadedUrl: result.url, loading: false});
        this._updateImagesView(allImages);
      });
    });
  }

  onOpenClick() {
    this.refs.dropzone.open();
  }

  onRemove(image) {
    this._updateImagesView(underscore.remove(this.state.images, (currentFile) => {
      return currentFile.name !== image.name;
    }));
  }

  updateImagesView(imagesList) {
    const {onChangeHandler} = this.props;
    this.setState({images: imagesList});
    onChangeHandler(imagesList);
  }

  uploadImage(newImage, cb) {
    const {uploadImageHandler} = this.props;
    if (uploadImageHandler) {
      uploadImageHandler(newImage).then((result) => {
        if (result.response.isSuccessful && result.response.statusCode === 201) {
          cb(result);
        }
      });
    } else {
      console.log(`image not uploaded because uploadHandler is not set`);
    }
  }

  render() {
    const { showOpenButton } = this.props;
    const { images } = this.state;
    return (
      <div>
        <input type="hidden" name="selectedImages" value={`${images.map( JSON.stringify )}`}/>
        <div className="container-fluid">
          <div className="row">
            {images && images.map((image) => {
              return (<div key={`img.${image.preview}`} className="col-md-2">
                <ThumbnailBox image={image} onRemoveHandler={() => { this.onRemove( image ); }}/>
              </div>);
            })}
            <div className="col-md-2">
              <Dropzone ref="dropzone" onDrop={this._onDrop} style={dropZoneStyle}>
                <div>
                  <div>Add photo</div>
                  <i className="fa fa-plus"/>
                </div>
              </Dropzone>
            </div>
          </div>
        </div>
        {showOpenButton && <button type="button" onClick={this._onOpenClick}>Open Dropzone</button>}
      </div>
    );
  }
}
