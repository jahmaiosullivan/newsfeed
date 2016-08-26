import React, {PropTypes} from 'react';

const ValidatedTextInput = ({ placeHolderText, name, value, form: {getFieldProps, getFieldError} }) => {
  return (
    <div>
      <input {...getFieldProps(`${name}`, { initialValue: value || '', rules: [{required: true, min: 3, whitespace: true}] })}
        type="text"
        placeholder={placeHolderText}
      />
      {getFieldError(name) && getFieldError(name).join(',')}
    </div>
  );
};

ValidatedTextInput.propTypes = {
  value: PropTypes.string,
  placeHolderText: PropTypes.string,
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.array.isRequired
};

export default ValidatedTextInput;
