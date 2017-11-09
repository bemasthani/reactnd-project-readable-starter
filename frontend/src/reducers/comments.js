import {
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
  REMOVE_COMMENT,
  SET_COMMENTS_SORTING_OPTION,
  CHANGE_COMMENT_SCORE,
  EDIT_COMMENT,
  SET_EDIT_COMMENT_DRAFT,
  TOGGLE_EDIT_COMMENT_MODAL
} from '../actions/comments';

const commentsInitialState = {
    comments: {},
    commentsSortingOption: 'voteScore',
    editCommentModalOpened: false,
    editCommentDraft: {}
}

export default function comments(state = commentsInitialState, action) {
    const { type, comments, comment, commentId, commentObj, commentsSortingOption, changeCommentScoreObj, editCommentModalOpened, editCommentDraft } = action;
    switch (type) {
        case RECEIVE_COMMENTS:
            return {
                ...state,
                comments
            }
        case RECEIVE_COMMENT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [comment.id]: comment
                }
            }
        case REMOVE_COMMENT:
            const filteredComments = Object.keys(state.comments)
                .filter(key => key !== commentId)
                .reduce((result, current) => {
                    result[current] = state.comments[current];
                    return result;
                }, {});
            return {
                ...state,
                comments: filteredComments
            }
        case SET_COMMENTS_SORTING_OPTION:
            return {
                ...state,
                commentsSortingOption
            }
        case CHANGE_COMMENT_SCORE:
            const updatedComment = state.comments[changeCommentScoreObj.commentId];
            const { voteScore: currentVoteScore } = updatedComment;
            const voteScore = changeCommentScoreObj.option === 'upVote' ? currentVoteScore + 1 :
            currentVoteScore - 1;
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [changeCommentScoreObj.commentId]: {
                        ...updatedComment,
                        voteScore
                    }
                }
            }
        case EDIT_COMMENT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [commentObj.id]: {
                        ...state.comments[commentObj.id],
                        ...commentObj
                    }
                }
            }
        case TOGGLE_EDIT_COMMENT_MODAL:
            return {
                ...state,
                editCommentModalOpened
            }
        case SET_EDIT_COMMENT_DRAFT:
            return {
                ...state,
                editCommentDraft
            }
        default:
            return state;
    }
}

// used in selectors
export const getCommentsFromState = (state) => state.comments.comments;
export const getCommentsSortingOptionFromState = (state) => state.comments.commentsSortingOption;
