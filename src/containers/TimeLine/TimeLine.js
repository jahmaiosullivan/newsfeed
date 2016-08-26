import React, {Component, PropTypes} from 'react';
import Post from '../../components/Post/Post';
import Sidebar from '../../components/Sidebar';
import NewPostForm from '../../components/PostForm/NewPostForm';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import * as newPostActions from 'redux/actions/postsActionCreators';
import { loadUsers } from 'redux/actions/usersActionCreators';
import lodash from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

@asyncConnect( [{
  deferred: false,
  promise: ({store}) => {
    if (!newPostActions.isLoaded( store.getState() )) {
      return store.dispatch( newPostActions.loadPosts() ).then(({data: {posts}}) => {
        const postCreatorIds = lodash(posts)
          .filter(post => post.createdBy !== null)
          .map(post => post.createdBy)
          .uniqBy(creatorId => creatorId)
          .value();

        return store.dispatch(loadUsers(postCreatorIds));
      });
    }
  }
}] )
@connect(
  state => ({
    currentUser: state.auth.user,
    users: state.users.data,
    posts: state.posts.data,
    hasMore: state.posts.hasMore,
    editing: state.posts.editing,
    loading: state.posts.loading,
    showNewPostForm: state.posts.newPost.show
  }),
  { ...newPostActions, loadUsers } )
export default class TimeLine extends Component {
  static propTypes = {
    users: PropTypes.array,
    posts: PropTypes.array,
    currentUser: PropTypes.object,
    hasMore: PropTypes.bool,
    loading: PropTypes.bool,
    showNewPostForm: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    loadUsers: PropTypes.func.isRequired,
    loadComments: PropTypes.func.isRequired,
    loadPosts: PropTypes.func.isRequired,
    saveFile: PropTypes.func.isRequired,
    createNewPost: PropTypes.func.isRequired,
    toggleNewPostForm: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this._loadMorePosts = (page) => { this.loadMorePosts(page); };
  }

  handlePostChanged() {
    this.forceUpdate();
  }

  loadMorePosts(page) {
    this.props.loadPosts(page);
  }

  render() {
    const { currentUser, posts, editing, hasMore } = this.props;
    const styles = require( './Events.scss' );
    console.log(`render timeline`);
    return (
      <div className="container-fluid">
        <section className="pageContent">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <Sidebar />
              </div>
              <div className="col-lg-8 col-md-8">
                {currentUser &&
                <div className="row">
                  <NewPostForm {...this.props} />
                </div>
                }
                <ul className={styles.postsContainer}>
                  <InfiniteScroll
                    pageStart={1}
                    loadMore={this._loadMorePosts}
                    hasMore={hasMore}
                    loader={<div className="loader">Loading ...</div>}
                  >
                    { posts && posts.map( (post) => {
                      return (<Post {...this.props} {...post} editing={editing[post.id]} key={post.id} onPostChanged={() => { this.handlePostChanged(); }} />);
                    })}
                  </InfiniteScroll>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
