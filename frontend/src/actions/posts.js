import {
  fetchPosts,
  fetchPost,
  apiAddPost,
  apiUpdatePostScore,
  apiDeletePost,
  apiEditPost
} from '../utils/api';
import { normalize, filterDeleted } from '../utils/helpers';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_CURRENT_POST = 'RECEIVE_CURRENT_POST';
export const SET_CURRENT_POST = 'SET_CURRENT_POST';
export const SET_POSTS_SORTING_OPTION = 'SET_POSTS_SORTING_OPTION';
export const CHANGE_POST_SCORE = 'CHANGE_POST_SCORE';
export const REMOVE_POST = 'REMOVE_POST';
export const EDIT_POST = 'EDIT_POST';

export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

export const getPosts = () => dispatch => (
    fetchPosts()
        .then(posts => dispatch(receivePosts(normalize(filterDeleted(posts)))))
);

export const receiveCurrentPost = currentPost => ({
    type: RECEIVE_CURRENT_POST,
    currentPost
});

export const setCurrentPost = postId => (dispatch, getState) => {
    const { posts } = getState();
    // if the post is already cached in the collection, return it rather than making new request
    return posts.posts[postId] ? dispatch(receiveCurrentPost(posts.posts[postId])) : fetchPost(postId)
        .then(post => dispatch(receiveCurrentPost(post)));
};

export const setPostsSortingOption = postsSortingOption => ({
    type: SET_POSTS_SORTING_OPTION,
    postsSortingOption
});

export const addPost = postObj => dispatch => {
    return apiAddPost(postObj);
};

export const updatePostScore = changePostScoreObj => dispatch => {
    return apiUpdatePostScore(changePostScoreObj)
        .then(() => dispatch(changePostScore(changePostScoreObj)));
}

const changePostScore = changePostScoreObj => ({
    type: CHANGE_POST_SCORE,
    changePostScoreObj
});

export const deletePost = postId => dispatch => {
    return apiDeletePost(postId)
        .then(() => dispatch(removePost(postId)));
}

const removePost = postId => ({
    type: REMOVE_POST,
    postId
});

export const editPost = editPostObj => dispatch => {
    return apiEditPost(editPostObj)
        .then(res => dispatch(editExistingPost(editPostObj)));
};

const editExistingPost = editPostObj => ({
    type: EDIT_POST,
    editPostObj
});
