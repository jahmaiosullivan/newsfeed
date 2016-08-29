import React, {Component, PropTypes} from 'react';
import Lightbox from 'react-images';

export default class Gallery extends Component {
  static propTypes = {
    images: PropTypes.array,
    previewNumImages: PropTypes.number,
    showThumbnails: PropTypes.bool,
    theme: PropTypes.any
  };

  constructor(props) {
    super( props );
    this.state = {lightboxIsOpen: false, currentImage: 0};

    this.closeLightbox = this.closeLightbox.bind( this );
    this.gotoNext = this.gotoNext.bind( this );
    this.gotoPrevious = this.gotoPrevious.bind( this );
    this.gotoImage = this.gotoImage.bind( this );
    this.handleClickImage = this.handleClickImage.bind( this );
    this.openLightbox = this.openLightbox.bind( this );
  }

  openLightbox(index, event) {
    event.preventDefault();
    this.setState( {
      currentImage: index,
      lightboxIsOpen: true
    } );
  }

  closeLightbox() {
    this.setState({ currentImage: 0, lightboxIsOpen: false });
  }

  gotoPrevious() {
    this.setState({ currentImage: this.state.currentImage - 1 });
  }

  gotoNext() {
    this.setState({ currentImage: this.state.currentImage + 1 });
  }

  gotoImage(index) {
    this.setState({ currentImage: index });
  }

  handleClickImage() {
    if (this.state.currentImage !== this.props.images.length - 1) {
      this.gotoNext();
    }
  }

  render() {
    const {images, showThumbnails, theme, previewNumImages} = this.props;
    const {currentImage, lightboxIsOpen} = this.state;
    const styles = require( './Gallery.scss' );
    const appendedClass = images.length === 1 ? styles.fullWidth : '';

    return (
    <div>
      <div className={styles.gallery}>
        {images && images.slice(0, previewNumImages || 5).map((obj, index) => {
          return (
            <a href={obj.src}
               className={styles.thumbnail + ' ' + styles[obj.orientation] + ' ' + appendedClass }
               key={index}
               onClick={(event) => this.openLightbox(index, event)}>
              <img src={obj.thumbnail} className={styles.source}/>
            </a>);
        } )}
      </div>
      <Lightbox
        currentImage={currentImage}
        images={images}
        isOpen={lightboxIsOpen}
        onClickImage={this.handleClickImage}
        onClickNext={this.gotoNext}
        onClickPrev={this.gotoPrevious}
        onClickThumbnail={this.gotoImage}
        onClose={this.closeLightbox}
        showThumbnails={showThumbnails}
        theme={theme}
      />
    </div>);
  }
}
