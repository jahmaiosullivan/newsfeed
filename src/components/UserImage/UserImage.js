import React from 'react';
const styles = require('./UserImage.scss');

export default ({ user, widthHeight }) => {
  return (<div className={styles.userCommentWrapper}>
        {user && <img src={user.picture} alt="" width={widthHeight} height={widthHeight} />}
      </div>);
};
