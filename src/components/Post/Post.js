import React, {Component, PropTypes} from 'react';
import PostForm from '../PostForm/PostForm';
import CommentList from './CommentList';
import lodash from 'lodash';
import TimeAgoDate from '../TimeAgoDate/TimeAgoDate';
import Gallery from '../Gallery/Gallery';

const TagList = ({tags, styles}) => {
  return (<div>{tags && tags.map( (tag) => {
    return (<a href="#" className={styles.hashtag}>{`#${tag.name}`}</a>);
  } )}</div>);
};

const theme = {
  // container
  gallery: { height: '273px'}
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
    tags: PropTypes.array,
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
    const styles = require( './Post.scss' );
    const {users, currentUser, saveFile, body, editing, id, tags, title, createdAt, createdBy, editPost, editPostStop, deletePost, editPostStart, images} = this.props;
    const postCreator = lodash.find( users, (postUser) => {
      return postUser.id === createdBy;
    } );
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
          <div>
            {images && images !== null && <Gallery previewNumImages={4} images={images.map((img, index) => ({
              src: img.preview,
              thumbnail: img.preview,
              caption: '',
              orientation: index === 0 ? 'square' : 'landscape',
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
              <TagList tags={tags} styles={styles} />
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
