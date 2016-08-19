import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import underscore from 'lodash';
import util from 'util';

const thumbwidthHeight = '100px';
const dropZoneStyle = {
  width: thumbwidthHeight,
  height: thumbwidthHeight,
  border: '2px dashed rgb(102, 102, 102)',
  borderRadius: '5px'
};
const spinner = require( './images/ajax_loader_blue_48.gif' );
const spinnerOverlay = {
  position: 'absolute',
  top: 0,
  width: thumbwidthHeight,
  height: thumbwidthHeight,
  background: `rgba(255,255,255, 0.3) url(${spinner}) center center no-repeat`
};


const ThumbnailBox = ({file, onRemoveHandler}) => {
  return (
    <div key={`img.${file.preview}`} style={{ position: 'relative' }}>
      <img height={thumbwidthHeight} width={thumbwidthHeight} src={file.preview}/>
      <a onClick={onRemoveHandler}>Remove</a>
      {file.loading && <div style={spinnerOverlay} />}
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
    super( props );
    this._onOpenClick = () => { this.onOpenClick(); };
    this._onDrop = (files) => { this.onDrop( files ); };
  }

  componentWillMount() {
    console.log(`component mount ${util.inspect(this.props.images)}`);
  }

  onDrop(files) {
    const {uploadImageHandler, onChangeHandler, images} = this.props;
    const appendedFiles = [...images];
    let filesChanged = false;
    files.forEach( (file) => {
      const indexOfFile = underscore.findIndex( appendedFiles, (filename) => {
        return filename.name === file.name && filename.lastModified === file.lastModified;
      });

      if (indexOfFile === -1) {
        appendedFiles.push( {...file, loading: true} );

        uploadImageHandler(file).then((result) => {
          if (result.response.isSuccessful && result.response.statusCode === 201) {
            const index = underscore.indexOf( appendedFiles, underscore.find( appendedFiles, file ) );
            appendedFiles.splice( index, 1, {...file, uploadedUrl: result.url, loading: false} );
            onChangeHandler(appendedFiles);
          }
        });
        filesChanged = true;
      }
    });

    if (filesChanged) {
      onChangeHandler(appendedFiles);
    }
  }

  onOpenClick() {
    this.refs.dropzone.open();
  }

  onRemove(file) {
    const {onChangeHandler, images } = this.props;
    const updatedFiles = underscore.remove( images, (currentFile) => {
      return currentFile.name !== file.name;
    });
    onChangeHandler(updatedFiles);
  }

  render() {
    const { images, showOpenButton } = this.props;
    console.log(`rendering DropZone again. Images are ${util.inspect(images)}`);
    return (
      <div>
        <input type="hidden" name="selectedImages" value={`${images.map( JSON.stringify )}`}/>
        <div className="container-fluid">
          <div className="row">
            {images && images.map( (image) => {
              return (<div key={`img.${image.uploadedUrl}`} className="col-md-2">
                        <ThumbnailBox file={image} onRemoveHandler={() => { this.onRemove( image ); }} />
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
