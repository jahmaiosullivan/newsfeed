import React, {Component, PropTypes} from 'react';
import UserImage from '../UserImage/UserImage';
const styles = require('./Comment.scss');

export default class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object,
    creator: PropTypes.object,
    loadUsers: PropTypes.func.isRequired
  };

  componentWillMount() {
    const {loadUsers, comment, creator} = this.props;
    if (!creator && comment.createdBy) {
      loadUsers([comment.createdBy]);
    }
  }

  render() {
    const { comment, creator} = this.props;
    return (<div key={comment.id} className={styles.comment + ' row'}>
        <UserImage user={creator} widthHeight="35" />
        <div className={styles.details}>
          {creator && <div className={styles.username}> {creator.name} </div>}
          <div className={styles.body}> {comment.body} </div>
          <div className={styles.more}>
            <div className={styles.item}><i className="icon-time"></i> 12 mins ago </div>
          </div>
        </div>
    </div>);
  }
}
