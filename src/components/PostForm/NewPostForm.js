import React, {Component, PropTypes} from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import PostForm from './PostForm';

export default class NewPost extends Component {
  static propTypes = {
    showNewPostForm: PropTypes.bool,
    toggleNewPostForm: PropTypes.func.isRequired,
    createNewPost: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    saveFile: PropTypes.func.isRequired
  };

  handleSubmit(formValues, createNewPost, toggleNewPostForm, user) {
    createNewPost({...formValues, createdBy: user.id});
    toggleNewPostForm();
  }

  render() {
    const { createNewPost, saveFile, showNewPostForm, toggleNewPostForm, currentUser } = this.props;
    return (
      <div>
        <div>
          <Nav bsStyle="pills" activeKey={1} onSelect={() => { toggleNewPostForm(); }}>
            <NavItem eventKey={1} href="#">New Post</NavItem>
          </Nav>
        </div>
        {showNewPostForm && currentUser &&
        <div>
          <PostForm formKey="newPost"
                    submitHandler={(formValues) => { this.handleSubmit(formValues, createNewPost, toggleNewPostForm, currentUser); }}
                    uploadFileHandler={saveFile} />
        </div>
        }
      </div>
    );
  }
}
