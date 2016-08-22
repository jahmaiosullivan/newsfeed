import React, {Component, PropTypes} from 'react';
import Post from '../../components/Post/Post';
import Sidebar from '../../components/Sidebar';
import NewPostForm from '../../components/PostForm/NewPostForm';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { saveFile, createNewPost, isLoaded, loadPosts as load, toggle as toggleNewPostForm } from 'redux/actions/postsActionCreators';
import { loadUsers } from 'redux/actions/usersActionCreators';
// import util from 'util';
import lodash from 'lodash';

@asyncConnect( [{
  deferred: true,
  promise: ({store}) => {
    if (!isLoaded( store.getState() )) {
      return store.dispatch( load() ).then(({data: {posts}}) => {
        const postCreatorIds = lodash(posts)
          .filter(post => post.createdBy !== null)
          .map(post => post.createdBy)
          .uniqBy(post => post.createdBy)
          .value();

        store.dispatch(loadUsers(postCreatorIds));
      });
    }
  }
}] )
@connect(
  state => ({
    user: state.auth.user,
    posts: state.posts.data,
    editing: state.posts.editing,
    loading: state.posts.loading,
    showNewPostForm: state.posts.newPost.show
  }),
  {load, saveFile, createNewPost, toggleNewPostForm } )

export default class TimeLine extends Component {
  static propTypes = {
    posts: PropTypes.array,
    user: PropTypes.object,
    loading: PropTypes.bool,
    showNewPostForm: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    saveFile: PropTypes.func.isRequired,
    createNewPost: PropTypes.func.isRequired,
    toggleNewPostForm: PropTypes.func.isRequired
  };

  render() {
    const { posts, user, editing } = this.props;
    const styles = require( './Events.scss' );

    return (
      <div className="container-fluid">
        <section className="pageContent">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-8">
                {user &&
                <div className="row">
                  <NewPostForm {...this.props} />
                </div>
                }
                <ul className={styles.postsContainer}>
                  { posts && posts.map( (post) => {
                    return (<Post {...post} editing={editing[post.id]} key={post.id} />);
                  })}
                </ul>
              </div>
              <div className="col-lg-4 col-md-4">
                <Sidebar />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
