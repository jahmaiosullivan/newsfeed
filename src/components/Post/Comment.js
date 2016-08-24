import React, {Component, PropTypes} from 'react';

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
    return (<div key={comment.id}>
      <span>{comment.body}</span>
      {creator && <span>{creator.name} {creator.picture}</span>}
    </div>);
  }
}
