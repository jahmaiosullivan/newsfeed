import React, {Component, PropTypes} from 'react';
import PostForm from './PostForm';

export default class NewPost extends Component {
  static propTypes = {
    createNewPost: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    saveFile: PropTypes.func.isRequired
  };

  render() {
    const { createNewPost, saveFile, currentUser } = this.props;
    const styles = require('./NewPostForm.scss');
    return (
      <div className={styles.newPostForm}>
        {currentUser &&
          <PostForm formKey="newPost"
                    submitHandler={(formValues) => { return createNewPost({...formValues, createdBy: currentUser.id}); }}
                    uploadFileHandler={saveFile} />
        }
      </div>
    );
  }
}
