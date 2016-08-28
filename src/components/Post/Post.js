import React, {Component, PropTypes} from 'react';
import PostForm from '../PostForm/PostForm';
import CommentList from './CommentList';
import lodash from 'lodash';
import timeago from 'timeago-words';

const styles = require('./Post.scss');

const OwnerLinks = ({ id, isOwner, deletePost, editPostStart }) => {
  return (<div>
    {isOwner && <div><a href="#" onClick={(event) => { event.preventDefault(); deletePost(id); }}>Delete</a>
    <a href="#" onClick={(event) => { event.preventDefault(); editPostStart(id); }}>Edit</a></div>}
  </div>);
};

const PostMainImage = ({images}) => {
  return (<div className={styles.imageTile}>
    {images && <img src={images[0].preview} alt="" />}
  </div>);
};

const TagList = ({tags}) => {
  return (<div>{tags && tags.map((tag) => {
    return (<a href="#" className={styles.hashtag}>{`#${tag}`}</a>);
  })}</div>);
};

const IconLink = ({href, value, icon }) => {
  return (<a href={href || '#'} className={styles.iconStyle}><i className={`fa fa-${icon}`}></i>{value}</a>);
};

const TimeAgoDate = ({date}) => {
  return (<div>{timeago(new Date(date))}</div>);
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
    const { users, currentUser, saveFile, body, editing, id, title, createdAt, createdBy, editPost, editPostStop } = this.props;
    const postCreator = lodash.find(users, (postUser) => {
      return postUser.id === createdBy;
    });
    const tags = [ 'new york city', 'amazing', 'citymax'];
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
          <OwnerLinks {...this.props} isOwner={isOwner} />
          <PostMainImage images={this.props.images} />
          <div>
            <div className="row">
              <div className={styles.postCreationDetails}>
                {postCreator && <img width="69" height="69" src={postCreator.picture} alt="" />}
                {postCreator && <div className={styles.userName}>{postCreator.name}</div>}
                <div className={styles.timeContainer}>
                  <TimeAgoDate date={createdAt} />
                  <div className={styles.postLinksContainer}>
                    <IconLink value="1584" icon="comment" />
                    <IconLink value="47k" icon="heart" />
                  </div>
                </div>
              </div>
            </div>
            <div className={ styles.postDetails + ' row'}>
              <h3>{title}</h3>
              <p>{body}</p>
              <TagList tags={tags} />
            </div>
            <CommentList {...this.props} onChanged={() => this.handleCommentListChanged()} />
          </div>
        </div>
        }
      </li>
    );
  }
}
