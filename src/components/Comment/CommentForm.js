import React, {Component, PropTypes} from 'react';
import { createForm } from 'rc-form';
import UserImage from '../UserImage/UserImage';

@createForm()
export default class CommentForm extends Component {
  static propTypes = {
    id: PropTypes.number,
    postId: PropTypes.number,
    form: PropTypes.object,
    body: PropTypes.string,
    currentUser: PropTypes.object,
    createCommentHandler: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this._handleSubmit = (event) => { this.handleSubmit(event); };
  }

  handleSubmit(event) {
    event.preventDefault();
    const {createCommentHandler, postId, currentUser, form} = this.props;
    form.validateFields((error, values) => {
      console.log(error, values);

      if (!error) {
        createCommentHandler({body: values.comment, status: 0, postId: postId, createdBy: currentUser.id});
        form.setFieldsValue({comment: ''});
      }
    });
  }

  render() {
    const {currentUser, body, form: {getFieldProps, getFieldError} } = this.props;
    const styles = require('./Commentform.scss');
    return (
      <form className={styles.form} onSubmit={this._handleSubmit}>
        <UserImage user={currentUser} widthHeight="35" />
        <div className={styles.inner + ' pull-right'}>
          <input {...getFieldProps('comment', { initialValue: body || '', rules: [{required: true, min: 3, whitespace: true}] })}
            type="text"
            className={styles.commentInput}
            placeholder="Enter a comment..."
          />
          {getFieldError('comment') && getFieldError('comment').join(',')}
        </div>
        <div className="clearfix"></div>
        <div className={styles.submitContainer}>
          <button type="submit" className="btn btn-success btn-cons">Comment</button>
        </div>
      </form>
    );
  }
}
