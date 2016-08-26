import React, {Component, PropTypes} from 'react';
import Avatar from '../Avatar';
import PostForm from '../PostForm/PostForm';
import CommentList from './CommentList';
import Thumbnail from '../Thumbnail/Thumbnail';
import lodash from 'lodash';

const icon1 = require('./images/icon1.jpg');
const icon4 = require('./images/icon4.jpg');
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
          <div>
            {isOwner && <div>
              <a href="#" onClick={(event) => { event.preventDefault(); deletePost(id); }}>Delete</a>
              <a href="#" onClick={(event) => { event.preventDefault(); editPostStart(id); }}>Edit</a>
            </div>}
            <div className={styles.userinfo + ' pull-left'}>
              {postCreator && <Avatar src={postCreator.picture }/>}

              <div className={styles.icons}>
                <img src={icon1} alt=""/>
                <img src={icon4} alt=""/>
              </div>
            </div>
            <div className={styles.posttext + ' pull-left'}>
              <h2>
                <a href="$"> {title}</a></h2>
              <p>{body}</p>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className={styles.postminfo + ' pull-left'}>
            <div className={styles.coments}>
              <div className={styles.commentbg}>
                560
                <div className={styles.mark}></div>
              </div>

            </div>
            <div className={styles.views}><i className="fa fa-eye"></i> 25</div>
            <div className={styles.time}><i className="fa fa-clock-o"></i> {createdAt}</div>
          </div>
          <div>
            { images && images.map((postImg) => {
              return (<Thumbnail key={postImg.preview} image={postImg} thumbwidthHeight="100px"/>);
            })}
          </div>
          <CommentList {...this.props} onChanged={() => this.handleCommentListChanged()} />
        </div>
        }
        <div className="clearfix"></div>
      </li>
    );
  }
}
