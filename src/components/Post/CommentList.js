import React, {Component, PropTypes} from 'react';
import CommentForm from '../Comment/CommentForm';
import Comment from './Comment';
import lodash from 'lodash';
import pluralize from 'pluralize';
// import util from 'util';

export default class CommentList extends Component {
  static propTypes = {
    id: PropTypes.number,
    currentUser: PropTypes.object,
    comments: PropTypes.any,
    commentCount: PropTypes.number,
    loadComments: PropTypes.func.isRequired,
    onChanged: PropTypes.func.isRequired,
    users: PropTypes.array,
    showComments: PropTypes.bool,
    loadUsers: PropTypes.func.isRequired,
    createNewComment: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {showComments: props.showComments, loaded: false };
  }

  handleCommentsToggled() {
    let newState = {showComments: !this.state.showComments};
    if (!this.state.loaded) {
      this.props.loadComments(this.props.id).then(() => {
        console.log(`load comments for ${this.props.id}`);
        this.props.onChanged();
      });
      newState = Object.assign({}, newState, {loaded: true});
    }

    this.setState(newState);
  }

  handleCommentAdded(comment) {
    this.props.createNewComment(comment).then(() => {
      this.props.onChanged();
    });
  }

  render() {
    const { users, loadUsers, commentCount, currentUser, comments, id } = this.props;
    const { showComments, loaded } = this.state;
    return (<div>
      {!loaded && <div>
        <a href="#" onClick={(event) => {event.preventDefault(); this.handleCommentsToggled(id);}}>
          {!commentCount && <span>Be the first to comment!</span>}
          {commentCount && <span>{`${showComments ? 'Hide' : 'Show'} ${commentCount} ${pluralize('comment', commentCount)}`}</span>}
        </a>
      </div>}
      { showComments && <div>
        { comments && comments.map((comment) => {
          const commentCreator = lodash.find(users, (cUser) => {
            return cUser.id === comment.createdBy;
          });
          return (<Comment loadUsers={loadUsers} creator={commentCreator} key={comment.id} comment={comment}/>);
        })}
        { currentUser &&
        <CommentForm createCommentHandler={(comment) => { this.handleCommentAdded(comment); }} postId={id}
                     currentUser={currentUser}/> }
      </div>
      }
    </div>);
  }
}

