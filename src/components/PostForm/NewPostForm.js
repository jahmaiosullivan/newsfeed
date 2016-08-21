import React, {Component, PropTypes} from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import PostForm from './PostForm';


export default class NewPost extends Component {
  static propTypes = {
    showNewPostForm: PropTypes.bool,
    toggleNewPostForm: PropTypes.func.isRequired,
    createNewPost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    saveFile: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this._handleSubmit = (formValues) => { this.handleSubmit(formValues); };
  }

  handleSubmit(formValues) {
    const {createNewPost, toggleNewPostForm, user } = this.props;
    createNewPost({...formValues, createdBy: user.id});
    toggleNewPostForm();
  }

  render() {
    const { saveFile, showNewPostForm, toggleNewPostForm } = this.props;
    return (
      <div>
        <div>
          <Nav bsStyle="pills" activeKey={1} onSelect={toggleNewPostForm}>
            <NavItem eventKey={1} href="#">New Post</NavItem>
          </Nav>
        </div>
        {showNewPostForm &&
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
