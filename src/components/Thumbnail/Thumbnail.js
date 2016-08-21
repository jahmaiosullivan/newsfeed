import React from 'react';

const Thumbnail = ({image, thumbwidthHeight, onRemoveHandler}) => {
  const thumbnailBoxStyle = {position: 'relative'};
  const spinner = require('./images/ajax_loader_blue_48.gif');
  const spinnerOverlay = {
    position: 'absolute',
    top: 0,
    width: thumbwidthHeight,
    height: thumbwidthHeight,
    background: `rgba(255,255,255, 0.3) url(${spinner}) center center no-repeat`
  };

  return (
    <div key={`img.${image.preview}`} style={thumbnailBoxStyle}>
      <img height={thumbwidthHeight} width={thumbwidthHeight} src={image.preview}/>
      <a onClick={onRemoveHandler}>Remove</a>
      {image.loading && <div style={spinnerOverlay}/>}
    </div>
  );
};

export { Thumbnail as default };
