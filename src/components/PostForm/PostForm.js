import React, {Component, PropTypes} from 'react';
import Tags from '../Tags/Tags';
import DropZone from '../../components/ImageUpload/DropZone';
import ValidatedTextInput from './ValidatedTextInput';
import ValidatedTextArea from './ValidatedTextArea';
import ValidationList from '../Validations/ValidationList';
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
    this.state = { images: this.props.images ? this.props.images : []};
  }

  handleImagesChange(images) {
    this.setState({images: images});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {id, submitHandler, form} = this.props;

    form.validateFields((error, values) => {
      if (!error) {
        const images = this.state.images.map((image) => {
          return image.preview;
        }).join(', ');

        submitHandler({id: id, title: values.location.trim(), body: values.details.trim(), images}).then(() => {
          this.clearForm();
        });
      }
    });
  }

  clearForm() {
    this.props.form.setFieldsValue({details: '', location: ''});
    this.setState({images: []});
  }

  render() {
    const { id, title, body, uploadFileHandler, form: {getFieldError, getFieldProps}} = this.props;
    const styles = require('./PostForm.scss');
    const basicRules = [{required: true, min: 3, whitespace: true}];
    const locationErrors = getFieldError('location') ? getFieldError('location') : [];
    const detailErrors = getFieldError('details') ? getFieldError('details') : [];
    const selectedTags = [ {id: 1, text: 'Apples'} ];
    const suggestions=['Banana', 'Mango', 'Pear', 'Apricot'];

    return (
      <form id={`postForm_${id}`} key={id} className={styles.postForm} onSubmit={(event) => { this.handleSubmit(event); }}>
        <div>
          <ValidatedTextInput getFieldProps={getFieldProps} name="location" rules={basicRules} placeHolderText="Location ..." value={title} />
          <ValidatedTextArea className={styles.details} getFieldProps={getFieldProps} name="details" rules={basicRules} placeHolderText="Details ..." value={body} rows={4} maxLength={300} />
          <Tags tags={selectedTags} suggestions={suggestions} />
        </div>
        <div className={styles.imagesContainer}>
          <DropZone ref="dropzone" addPhotoStyle={styles.addPhoto} images={this.state.images} uploadImageHandler={uploadFileHandler} onChangeHandler={(event) => { this.handleImagesChange(event); }} />
        </div>
        <div className={styles.postButtonContainer}>
          {<button className="btn" type="button" onClick={() => { console.log(this.refs.dropzone.onOpenClick()); }}>Add photo/video</button>}
          <button type="submit" className={styles.postButton + ' btn btn-success'}>Post</button>
        </div>
        <ValidationList errors={[...locationErrors, ...detailErrors]} />
      </form>
    );
  }
}
