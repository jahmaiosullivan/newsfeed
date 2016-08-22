import React, {Component, PropTypes} from 'react';
import Post from '../../components/Post/Post';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { saveFile } from 'redux/actions/postsActionCreators';

const styles = require( './Events.scss' );
const PostList = ({ posts, editing }) => {
    return (
        <ul className={styles.postsContainer}>
          { posts && posts.map( (post) => {
            return (<Post {...post} editing={editing[post.id]} key={post.id} />);
          })}
        </ul>
    );
};

PostList.propTypes = {
  posts: PropTypes.array,
  editing: PropTypes.object.isRequired,
  loadUsers: PropTypes.func.isRequired,
  saveFile: PropTypes.func.isRequired
};

export default PostList;