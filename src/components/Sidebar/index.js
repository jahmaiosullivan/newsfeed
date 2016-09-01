import React from 'react';

const Sidebar = ({tags}) => {
  const styles = require( './styles.scss' );
  return (
    <div className={styles.sidebar}>
      <div className={styles.block}>
        <h3>Categories</h3>
        <div className={styles.divline}></div>
        <div className={styles.txt}>
          <ul className={styles.cats}>
            {tags && tags.map((tag) => {
              return (<li>
                <a href={`#${tag.name}`}>{tag.name}</a>
              </li>);
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
Sidebar.propTypes = {
  tags: React.PropTypes.array
};

export default Sidebar;
