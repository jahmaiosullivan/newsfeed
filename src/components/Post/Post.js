import React, {Component, PropTypes} from 'react';
import PostForm from '../PostForm/PostForm';
import CommentList from './CommentList';
import lodash from 'lodash';
import TimeAgoDate from '../TimeAgoDate/TimeAgoDate';
import Gallery from '../Gallery/Gallery';

const styles = require( './Post.scss' );

const PostMainImage = ({images}) => {
  return (<div className={styles.imageTile}>
    {images && <img src={images[0].preview} alt=""/>}
  </div>);
};

const TagList = ({tags}) => {
  return (<div>{tags && tags.map( (tag) => {
    return (<a href="#" className={styles.hashtag}>{`#${tag}`}</a>);
  } )}</div>);
};
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

export default class Post extends Component {
  static propTypes = {
    id: PropTypes.number,
    postCreator: PropTypes.object,
    title: PropTypes.string,
    body: PropTypes.string,
    loadUsers: PropTypes.func.isRequired,
    users: PropTypes.array,
    images: PropTypes.array,
    loadComments: PropTypes.func.isRequired,
    onPostChanged: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
    comments: PropTypes.any,
    commentCount: PropTypes.number,
    showComments: PropTypes.bool,
    createdBy: PropTypes.string,
    createdAt: PropTypes.string,
    saveFile: PropTypes.func.isRequired,
    editing: PropTypes.bool,
    deletePost: PropTypes.func.isRequired,
    createNewComment: PropTypes.func.isRequired,
    editPostStart: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    editPostStop: PropTypes.func.isRequired
  };

  handleCommentListChanged() {
    this.props.onPostChanged();
  }

  render() {
    const {users, currentUser, saveFile, body, editing, id, title, createdAt, createdBy, editPost, editPostStop, deletePost, editPostStart, images} = this.props;
    const postCreator = lodash.find( users, (postUser) => {
      return postUser.id === createdBy;
    } );
    const tags = ['new york city', 'amazing', 'citymax'];
    const isOwner = currentUser && postCreator && postCreator.id === currentUser.id;
    return (
      <li id={`post_${String(id)}`} className={styles.post}>
        { editing &&
        <div>
          <PostForm {...this.props} submitHandler={editPost} uploadFileHandler={saveFile}/>
          <a href="#" onClick={(event) => { event.preventDefault(); editPostStop(id); }}>Cancel</a>
        </div>
        }
        { !editing &&
        <div>
          {isOwner && <div className={styles.postLinks}>
            <div className="pull-left">
              <a href="#" className={styles.edit} onClick={(event) => { event.preventDefault(); editPostStart(id); }}>
                <i className="fa fa-pencil"/> edit
              </a>
            </div>
            <div className="pull-right">
              <a href="#" className={styles.remove} onClick={(event) => { event.preventDefault(); deletePost(id); }}>
                <i className="fa fa-times"/> delete
              </a>
            </div>
            <div className="clearfix"></div>
          </div>}
          <div className="clearfix"></div>
          <div className={styles.imageTile}>
            {images && images !== null && <Gallery images={images.map((img) => ({
            src: img.preview,
            thumbnail: img.preview,
            caption: '',
            orientation: 'square',
            srcset: []
          }))} theme={theme} showThumbnails />}
          </div>
          <div>
            <div className="row">
              <div className={styles.postCreationDetails}>
                {postCreator && <img width="69" height="69" src={postCreator.picture} alt=""/>}
                {postCreator && <div className={styles.userName}>{postCreator.name}</div>}
                <div className={styles.timeContainer}>
                  <TimeAgoDate date={createdAt}/>
                </div>
              </div>
            </div>
            <div className={ styles.postDetails + ' row'}>
              <h3>{title}</h3>
              <p>{body}</p>
              <TagList tags={tags}/>
            </div>
            <div>
              <CommentList {...this.props} onChanged={() => this.handleCommentListChanged()}/>
            </div>
          </div>
        </div>
        }
      </li>
    );
  }
}
