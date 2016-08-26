import React, {PropTypes} from 'react';

const ValidatedTextInput = ({ placeHolderText, name, value, getFieldProps }) => {
  return (
    <div>
      <input {...getFieldProps(`${name}`, { initialValue: value || '', rules: [{required: true, min: 3, whitespace: true}] })}
        type="text"
        placeholder={placeHolderText}
      />
    </div>
  );
};

ValidatedTextInput.propTypes = {
  value: PropTypes.string,
  placeHolderText: PropTypes.string,
  getFieldProps: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.array.isRequired
};

export default ValidatedTextInput;
