import React, {PropTypes} from 'react';

const Avatar = ({src}) => {
  const styles = require( './Avatar.scss' );

  return (<div className={styles.avatar}>
      <img src={src} alt=""/>
      <div className={styles.status + ' ' + styles.green}>&nbsp;</div>
    </div>);
};
Avatar.propTypes = {
  img: PropTypes.string
};
export default Avatar;
