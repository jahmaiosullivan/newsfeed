import React, {Component, PropTypes} from 'react';
import PostForm from '../PostForm/PostForm';
import CommentList from './CommentList';
import Thumbnail from '../Thumbnail/Thumbnail';
import lodash from 'lodash';
import timeago from 'timeago-words';

const styles = require('./Post.scss');

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
    const { users, currentUser, saveFile, body, editing, id, title, createdAt, images, createdBy, editPost, editPostStart, editPostStop, deletePost } = this.props;
    const postCreator = lodash.find(users, (postUser) => {
      return postUser.id === createdBy;
    });
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
        <div className="post">
          <div className={styles.widgetItem}>
            {isOwner && <div>
              <a href="#" onClick={(event) => { event.preventDefault(); deletePost(id); }}>Delete</a>
              <a href="#" onClick={(event) => { event.preventDefault(); editPostStart(id); }}>Edit</a>
            </div>}
            <div className={styles.imageTile} style={{ maxHeight: '214px' }}>
              <div className={styles.bottom}>
                <div className={styles.inner}>
                  <div className={styles.tiles}>
                    <div className="pull-right">
                      <a href="#" className={styles.transparentHashtag}> #Art Design </a>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>
              {images && <img src={images[0].preview} alt="" className="lazy hover-effect-img"/>}
            </div>
            <div className={styles.tiles}>
              <div className={styles.tilesBody}>
                <div className="row">
                  {postCreator && <div className={styles.userCommentwrapperProfilewrapper}>
                    <div className="profile-wrapper">
                      <img src={postCreator.picture} alt="" width="35" height="35" />
                    </div>
                    <div className="comment">
                      <div className={styles.userCommentwrapperUsername}> Jane <span className="semi-bold">Smith</span> </div>
                      <div className="preview-wrapper">@ webarch </div>
                    </div>
                    <div className="clearfix"></div>
                  </div>}

                  <div className={styles.userProfilePic}>
                    <div className={styles.timeContainer}>
                      <span className={styles.time}>{timeago(new Date(createdAt))}</span>
                    </div>
                  </div>
                  <div className="col-md-5 no-padding">
                    <div className={styles.comment}>
                      {postCreator && <div className={styles.userName}> {postCreator.name}</div>}
                    </div>
                    <div className="clearfix"></div>
                  </div>
                  <div className="col-md-7 no-padding">
                    <a href="#"> {title}</a>
                    <p className={styles.details}>
                      {body}
                    </p>
                    <a href="#" className={styles.hashtags}> #new york city </a>
                    <a href="#" className={styles.hashtags}> #amazing </a>
                    <a href="#" className={styles.hashtags}> #citymax </a>
                    <div className="clearfix"></div>
                  </div>
                </div>
                <div className="row">
                  <div>
                    {images && images.map((postImg) => {
                      return (<Thumbnail key={postImg.preview} image={postImg} thumbwidthHeight="100px"/>);
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CommentList {...this.props} onChanged={() => this.handleCommentListChanged()} />
        </div>
        }
      </li>
    );
  }
}
