import React, {Component} from 'react';
import Gallery from '../../components/Gallery/Gallery';

const imageList = [
  `https://images.unsplash.com/photo-1454991727061-be514eae86f7?dpr=2&auto=format&w=1024&h=1024`,
  `https://images.unsplash.com/photo-1455717974081-0436a066bb96?dpr=2&auto=format&w=1024&h=1024`,
  `https://images.unsplash.com/photo-1460899960812-f6ee1ecaf117?dpr=2&auto=format&w=1024&h=1024`,
  `https://images.unsplash.com/photo-1456926631375-92c8ce872def?dpr=2&auto=format&w=1024&h=1024`,
  `https://images.unsplash.com/photo-1452274381522-521513015433?dpr=2&auto=format&w=1024&h=1024`,
  `https://images.unsplash.com/photo-1471145653077-54c6f0aae511?dpr=2&auto=format&w=1024&h=1024`,
  `https://images.unsplash.com/photo-1471005197911-88e9d4a7834d?dpr=2&auto=format&w=1024&h=1024`,
  `https://images.unsplash.com/photo-1470583190240-bd6bbde8a569?dpr=2&auto=format&w=1024&h=1024`,
  `https://images.unsplash.com/photo-1470688090067-6d429c0b2600?dpr=2&auto=format&w=1024&h=1024`,
  `https://images.unsplash.com/photo-1470742292565-de43c4b02b57?dpr=2&auto=format&w=1024&h=1024`
];

const theme = {
  // container
  container: {background: 'rgba(255, 255, 255, 0.9)'},

  // arrows
  arrow: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    fill: '#222',
    opacity: 0.6,
    transition: 'opacity 200ms',

    ':hover': {
      opacity: 1
    }
  },
  arrow__size__medium: {
    borderRadius: 40,
    height: 40,
    marginTop: -20,

    '@media (min-width: 768px)': {
      height: 70,
      padding: 15
    }
  },
  arrow__direction__left: {marginLeft: 10},
  arrow__direction__right: {marginRight: 10},

  // header
  close: {
    fill: '#D40000',
    opacity: 0.6,
    transition: 'all 200ms',

    ':hover': {
      opacity: 1
    }
  },

  // footer
  footer: {
    color: 'black'
  },
  footerCount: {
    color: 'rgba(0, 0, 0, 0.6)'
  },

  // thumbnails
  thumbnail: {},
  thumbnail__active: {
    boxShadow: '0 0 0 2px #00D8FF'
  }
};

export default class GalleryPage extends Component {
  render() {
    const styles = require( '../../components/Gallery/Gallery.scss' );
    const DEFAULT_IMAGES = imageList.map((src) => ({
      src,
      thumbnail: src,
      caption: '',
      orientation: 'square',
      srcset: []
    }));

    return (
      <div className={styles.container}>
        <div className={styles.rightCol}>
          <div className={styles.pageContent}>
            <div className={styles.pageBody}>
              <section className={styles.sectionExamples}>
                <div className="section">
                  <div>
                    <h3>Default Options</h3>
                    <Gallery images={DEFAULT_IMAGES}/>

                    <h3>With Thumbnails</h3>
                    <Gallery images={DEFAULT_IMAGES} showThumbnails/>

                    <h3>Themed Lightbox</h3>
                    <Gallery images={DEFAULT_IMAGES} theme={theme} showThumbnails/>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>);
  }
}
