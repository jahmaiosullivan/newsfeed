import React, {Component, PropTypes} from 'react';
import DropZone from '../../components/ImageUpload/DropZone';
// import util from 'util';

export default class PostForm extends Component {
  static propTypes = {
    postId: PropTypes.string,
    images: PropTypes.any,
    submitHandler: PropTypes.func.isRequired,
    uploadFileHandler: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {title: '', body: '', images: this.props.images ? this.props.images : [] };
    this._handleSubmit = (event) => { this.handleSubmit(event); };
    this._handleTitleChange = (event) => { this.handleTitleChange(event); };
    this._handleBodyChange = (event) => { this.handleBodyChange(event); };
    this._handleImagesChange = (event) => { this.handleImagesChange(event); };
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleBodyChange(event) {
    this.setState({body: event.target.value});
  }

  handleImagesChange(images) {
    this.setState({images: images});
  }

  handleSubmit(event) {
    event.preventDefault();
    const title = this.state.title.trim();
    const body = this.state.body.trim();
    const images = this.state.images.map((image) => {return image.uploadedUrl;}).join(', ');
    const {submitHandler} = this.props;
    if (!title || !body) {
      console.warn('both post title and body are blank');
      return;
    }
    submitHandler({title, body, images});
    this.setState({title: '', body: '', images: []});
  }

  render() {
    const {postId, uploadFileHandler } = this.props;
    const styles = require('./PostForm.scss');
    return (
      <form id={`postForm_${postId}`} key={postId} className={styles.postForm} onSubmit={this._handleSubmit}>
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
            value={this.state.body}
            onChange={this._handleBodyChange}
          />
          <DropZone images={this.state.images} uploadImageHandler={uploadFileHandler} onChangeHandler={this._handleImagesChange} />
        </div>
        <input type="submit" value="Post"/>
      </form>
    );
  }
}
