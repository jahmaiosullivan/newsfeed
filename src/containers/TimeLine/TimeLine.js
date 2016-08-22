import React, {Component, PropTypes} from 'react';
import Post from '../../components/Post/Post';
import Sidebar from '../../components/Sidebar';
import NewPostForm from '../../components/PostForm/NewPostForm';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { saveFile, createNewPost, isLoaded, loadPosts, toggle as toggleNewPostForm } from 'redux/actions/postsActionCreators';
import { loadUsers } from 'redux/actions/usersActionCreators';
import lodash from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

@asyncConnect( [{
  deferred: false,
  promise: ({store}) => {
    if (!isLoaded( store.getState() )) {
      return store.dispatch( loadPosts() ).then(({data: {posts}}) => {
        const postCreatorIds = lodash(posts)
          .filter(post => post.createdBy !== null)
          .map(post => post.createdBy)
          .uniqBy(post => post.createdBy)
          .value();

        return store.dispatch(loadUsers(postCreatorIds));
      });
    }
  }
}] )
@connect(
  state => ({
    user: state.auth.user,
    users: state.users,
    posts: state.posts.data,
    editing: state.posts.editing,
    loading: state.posts.loading,
    showNewPostForm: state.posts.newPost.show
  }),
  {loadPosts, saveFile, createNewPost, toggleNewPostForm } )
export default class TimeLine extends Component {
  static propTypes = {
    users: PropTypes.object,
    posts: PropTypes.array,
    user: PropTypes.object,
    loading: PropTypes.bool,
    showNewPostForm: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    loadPosts: PropTypes.func.isRequired,
    saveFile: PropTypes.func.isRequired,
    createNewPost: PropTypes.func.isRequired,
    toggleNewPostForm: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {hasMore: true, posts: this.props.posts};
    this._loadMorePosts = (page) => { this.loadMorePosts(page); };
  }

  loadMorePosts(page) {
    console.log(`loading ${page}`);
    this.props.dispatch(loadPosts(page)).then(({data: {posts}}) => {
      const postCreatorIds = lodash(posts)
        .filter(post => post.createdBy !== null)
        .map(post => post.createdBy)
        .uniqBy(post => post.createdBy)
        .value();

      this.props.dispatch(loadUsers(postCreatorIds)).then(() => {
        this.setState({
          posts: this.state.posts.concat(posts),
          hasMore: posts.length > 0
        });
      });
    });
  }

  render() {
    const { users, user, editing } = this.props;
    const { posts } = this.state;
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
                  <InfiniteScroll
                    pageStart={2}
                    loadMore={this._loadMorePosts}
                    hasMore={this.state.hasMore}
                    loader={<div className="loader">Loading ...</div>}
                  >
                    { posts && posts.map( (post) => {
                      return (<Post postCreator={lodash.find(users.data, (postUser) => { return postUser.id === post.createdBy; })} {...post} editing={editing[post.id]} key={post.id} />);
                    })}
                  </InfiniteScroll>
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
