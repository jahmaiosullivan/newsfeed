import React, {Component, PropTypes} from 'react';
import * as newPostActions from 'redux/actions/postsActionCreators';
import {connect} from 'react-redux';

@connect(
  (state) => ({
    showStatus: state.posts.showStatus
  }), {...newPostActions} )

export default class CommentForm extends Component {
  static propTypes = {
    id: PropTypes.number,
    postId: PropTypes.number,
    body: PropTypes.string,
    createCommentHandler: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {commentBody: this.props.body ? this.props.body : ''};
    this._handleSubmit = (event) => { this.handleSubmit(event); };
    this._handleCommentChange = (event) => { this.handleCommentChange(event); };
  }

  handleCommentChange(event) {
    this.setState({commentBody: event.target.value});
  }

  handleSubmit(event) {
    const { createCommentHandler, postId } = this.props;
    event.preventDefault();
    const body = this.state.commentBody.trim();
    if (!body) {
      console.warn('body of comment is blank');
      return;
    }
    createCommentHandler({body, status: 0, postId: postId});
    this.setState({commentBody: ''});
  }

  render() {
    const {commentBody } = this.state;
    return (
      <form onSubmit={this._handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter a comment ..."
            value={commentBody}
            onChange={this._handleCommentChange}
          />
        </div>
        <input type="submit" value="Comment"/>
      </form>
    );
  }
}
