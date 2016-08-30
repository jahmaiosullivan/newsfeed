import React, {Component, PropTypes} from 'react';
import Post from '../../components/Post/Post';
import Sidebar from '../../components/Sidebar';
import NewPostForm from '../../components/PostForm/NewPostForm';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import * as newPostActions from 'redux/actions/postsActionCreators';
import {loadTags, isLoaded as isTagsLoaded } from 'redux/actions/tagActionCreators';
import { loadUsers } from 'redux/actions/usersActionCreators';
import lodash from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import Helmet from 'react-helmet';

@asyncConnect( [{
  deferred: false,
  promise: ({store: { getState, dispatch}}) => {
    const promises = [];

    if (!isTagsLoaded( getState() )) {
      promises.push( dispatch(loadTags()));
    }

    if (!newPostActions.isLoaded( getState() )) {
      promises.push( dispatch( newPostActions.loadPosts() ).then(({data: {posts}}) => {
        const postCreatorIds = lodash(posts)
          .filter(post => post.createdBy !== null)
          .map(post => post.createdBy)
          .uniqBy(creatorId => creatorId)
          .value();

        return dispatch(loadUsers(postCreatorIds));
      }));
    }

    return Promise.all( promises );
  }
}])
@connect(
  state => ({
    currentUser: state.auth.user,
    users: state.users.data,
    tags: state.tags.data,
    posts: state.posts.data,
    hasMore: state.posts.hasMore,
    editing: state.posts.editing,
    loading: state.posts.loading
  }),
  { ...newPostActions, loadUsers } )
export default class TimeLine extends Component {
  static propTypes = {
    users: PropTypes.array,
    posts: PropTypes.array,
    tags: PropTypes.array,
    currentUser: PropTypes.object,
    hasMore: PropTypes.bool,
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    loadUsers: PropTypes.func.isRequired,
    loadComments: PropTypes.func.isRequired,
    loadPosts: PropTypes.func.isRequired,
    saveFile: PropTypes.func.isRequired,
    createNewPost: PropTypes.func.isRequired
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
    const { currentUser, posts, editing, hasMore, tags } = this.props;
    const styles = require( './Events.scss' );
    console.log(`render timeline`);
    return (
      <div className="container-fluid">
        <Helmet title="Timeline"/>
        <section className="pageContent">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-3">
                <Sidebar />
                {tags && tags.map((tag) => {
                  return (<div>{tag.name}</div>);
                })}
              </div>
              <div className="col-lg-6 col-md-6">
                {currentUser && <NewPostForm {...this.props} />}
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
