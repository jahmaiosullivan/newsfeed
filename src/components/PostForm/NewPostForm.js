import React, {Component, PropTypes} from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import * as newPostActions from 'redux/actions/postsActionCreators';
import {connect} from 'react-redux';
import PostForm from './PostForm';

@connect(
  (state) => ({
    showStatus: state.posts.newPost.showStatus
  }), {...newPostActions} )

export default class NewPost extends Component {
  static propTypes = {
    showStatus: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    createNewPost: PropTypes.func.isRequired,
    saveFile: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this._handleSubmit = (formValues) => { this.handleSubmit(formValues); };
  }

  handleSubmit(formValues) {
    const {createNewPost, toggle } = this.props;
    createNewPost(formValues);
    toggle();
  }

  render() {
    const { saveFile, showStatus, toggle } = this.props;
    return (
      <div>
        <div>
          <Nav bsStyle="pills" activeKey={1} onSelect={toggle}>
            <NavItem eventKey={1} href="#">New Post</NavItem>
          </Nav>
        </div>
        {showStatus &&
        <div>
          <PostForm formKey="newPost"
                    postId="-1"
                    submitHandler={(formValues) => { return this._handleSubmit(formValues); }}
                    uploadFileHandler={saveFile} />
        </div>
        }
      </div>
    );
  }
}
