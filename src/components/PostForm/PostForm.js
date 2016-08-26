import React, {Component, PropTypes} from 'react';
import DropZone from '../../components/ImageUpload/DropZone';
import ValidatedTextInput from './ValidatedTextInput';
import { createForm } from 'rc-form';

@createForm()
export default class PostForm extends Component {
  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    form: PropTypes.object,
    body: PropTypes.string,
    images: PropTypes.array,
    submitHandler: PropTypes.func.isRequired,
    uploadFileHandler: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { images: this.props.images ? this.props.images : [] };
  }

  handleImagesChange(images) {
    this.setState({images: images});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {id, submitHandler, form} = this.props;

    form.validateFields((error, values) => {
      console.log(error, values);

      if (!error) {
        const title = values.title.trim();
        const body = values.body.trim();
        const images = this.state.images.map((image) => {
          return image.preview;
        }).join(', ');

        submitHandler({id, title, body, images}).then(() => {
          form.setFieldsValue({title: '', body: ''});
          this.setState({images: []});
        });
      }
    });
  }

  render() {
    const { id, title, body, uploadFileHandler, form} = this.props;
    const styles = require('./PostForm.scss');
    const basicRules = [{required: true, min: 3, whitespace: true}];

    return (
      <form id={`postForm_${id}`} key={id} className={styles.postForm} onSubmit={(event) => { this.handleSubmit(event); }}>
        <div>
          <ValidatedTextInput form={form} name="title" rules={basicRules} placeHolderText="Title of your post ..." value={title} />
        </div>
        <div>
          <ValidatedTextInput form={form} name="body" rules={basicRules} placeHolderText="Body of your post ..." value={body} />
          <DropZone images={this.state.images} uploadImageHandler={uploadFileHandler} onChangeHandler={(event) => { this.handleImagesChange(event); }} />
        </div>
        <input type="submit" value="Post"/>
      </form>
    );
  }
}
