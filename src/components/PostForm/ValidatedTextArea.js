import React, {PropTypes} from 'react';

const ValidatedTextArea = ({ placeHolderText, name, value, getFieldProps, rows, maxLength, className }) => {
  return (
    <div>
      <textarea className={className} {...getFieldProps(`${name}`, { initialValue: value || '', rules: [{required: true, min: 3, whitespace: true}] })}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeHolderText}
      />
    </div>
  );
};

ValidatedTextArea.propTypes = {
  rows: PropTypes.number,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  className: PropTypes.string,
  placeHolderText: PropTypes.string,
  getFieldProps: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.array.isRequired
};

export default ValidatedTextArea;
