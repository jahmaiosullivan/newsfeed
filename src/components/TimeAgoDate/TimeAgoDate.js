import React from 'react';
import timeago from 'timeago-words';

export default ({date}) => {
  return (<div><i className="icon-time"></i> {timeago(new Date(date))}</div>);
};
