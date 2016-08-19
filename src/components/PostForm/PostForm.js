import React, {Component, PropTypes} from 'react';
import DropZone from '../../components/ImageUpload/DropZone';
import util from 'util';

export default class PostForm extends Component {
  static propTypes = {
    postId: PropTypes.string,
    images: PropTypes.any,
    uploadFileHandler: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {postTitle: '', postBody: '', images: this.props.images ? this.props.images : [] };
    this._handleSubmit = (event) => { this.handleSubmit(event); };
    this._handleTitleChange = (event) => { this.handleTitleChange(event); };
    this._handleBodyChange = (event) => { this.handleBodyChange(event); };
    this._handleImagesChange = (event) => { this.handleImagesChange(event); };
  }

  handleTitleChange(event) {
    this.setState({postTitle: event.target.value});
  }

  handleBodyChange(event) {
    this.setState({postBody: event.target.value});
  }

  handleImagesChange(images) {
    this.setState({images: images});
  }

  handleSubmit(event) {
    event.preventDefault();
    const title = this.state.postTitle.trim();
    const body = this.state.postBody.trim();
    const images = this.state.images;
    if (!title || !body) {
      console.warn('both post title and body are blank');
      return;
    }
    console.log(`submit to handler ${title} ${body}`);
    console.log(`images to handler ${util.inspect(images)}`);
    // TODO: send request to the server
    // this.setState({title: '', body: ''});
  }

  render() {
    const {postId, uploadFileHandler } = this.props;
    const styles = require('./PostForm.scss');
    return (
      <form key={postId} className={styles.postForm} onSubmit={this._handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Title of your post ..."
            value={this.state.title}
            onChange={this._handleTitleChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Body of your post ..."
            value={this.state.postBody}
            onChange={this._handleBodyChange}
          />
          <DropZone images={this.props.images} uploadImageHandler={uploadFileHandler} onChangeHandler={this._handleImagesChange} />
        </div>
        <input type="submit" value="Post"/>
      </form>
    );
  }
}
