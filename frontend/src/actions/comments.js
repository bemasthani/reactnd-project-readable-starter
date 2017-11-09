import {
  fetchComments,
  apiAddComment,
  apiDeleteComment,
  apiUpdateCommentScore,
  apiEditComment } from '../utils/api';
import { normalize, filterDeleted } from '../utils/helpers';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const SET_COMMENTS_SORTING_OPTION = 'SET_COMMENTS_SORTING_OPTION';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const CHANGE_COMMENT_SCORE = 'CHANGE_COMMENT_SCORE';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const TOGGLE_EDIT_COMMENT_MODAL = 'TOGGLE_EDIT_COMMENT_MODAL';
export const SET_EDIT_COMMENT_DRAFT = 'SET_EDIT_COMMENT_DRAFT';

const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
});

export const getComments = postId => dispatch => {
    fetchComments(postId)
        .then(comments => dispatch(receiveComments(normalize(filterDeleted(comments)))));
};

export const addComment = commentObj => dispatch => {
    return apiAddComment(commentObj)
        .then(res => dispatch(receiveComment(commentObj)));
};

const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});

export const deleteComment = commentId => dispatch => {
    return apiDeleteComment(commentId)
        .then(res => dispatch(removeComment(commentId)))
}

const removeComment = commentId => ({
    type: REMOVE_COMMENT,
    commentId
});

export const setCommentsSortingOption = commentsSortingOption => ({
    type: SET_COMMENTS_SORTING_OPTION,
    commentsSortingOption
});

export const updateCommentScore = changeCommentScoreObj => dispatch => {
    return apiUpdateCommentScore(changeCommentScoreObj)
        .then(() => dispatch(changeCommentScore(changeCommentScoreObj)));
}

const changeCommentScore = changeCommentScoreObj => ({
    type: CHANGE_COMMENT_SCORE,
    changeCommentScoreObj
});

export const editComment = commentObj => dispatch => {
    return apiEditComment(commentObj)
        .then(() => dispatch(editExistingComment(commentObj)));
}

const editExistingComment = commentObj => ({
    type: EDIT_COMMENT,
    commentObj
});

export const toggleEditCommentModal = editCommentModalOpened => ({
    type: TOGGLE_EDIT_COMMENT_MODAL,
    editCommentModalOpened
});

export const setEditCommentDraft = editCommentDraft => ({
    type: SET_EDIT_COMMENT_DRAFT,
    editCommentDraft // used as initial values in the form
});
