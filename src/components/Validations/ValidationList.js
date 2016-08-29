import React, {PropTypes} from 'react';
const styles = require('./ValidationList.scss');

const ValidationList = ({errors}) => {
  const hasErrors = errors && errors.length > 0;

  return (hasErrors ? <div className={styles.validationErrorsContainer}>
    {errors.map((error) => { return (<div>{error}</div>); })}
  </div> : null);
};

ValidationList.propTypes = {
  errors: PropTypes.array.isRequired
};

export default ValidationList;
