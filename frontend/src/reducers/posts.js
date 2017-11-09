import {
  RECEIVE_POSTS,
  RECEIVE_CURRENT_POST,
  SET_POSTS_SORTING_OPTION,
  CHANGE_POST_SCORE,
  REMOVE_POST,
  EDIT_POST
} from '../actions/posts';

const postsInitialState = {
    posts: {},
    currentPost: {},
    postsSortingOption: 'voteScore',
}

export default function posts(state = postsInitialState, action) {
    const { type, posts, currentPost, postId, editPostObj, postsSortingOption, changePostScoreObj } = action;
    switch (type) {
        case RECEIVE_POSTS:
            return {
                ...state,
                posts
            };
        case RECEIVE_CURRENT_POST:
            return {
                ...state,
                currentPost
            };
        case SET_POSTS_SORTING_OPTION:
            return {
                ...state,
                postsSortingOption
            }
        case CHANGE_POST_SCORE:
            const { voteScore: currentVoteScore } = state.posts[changePostScoreObj.postId]
            const voteScore = changePostScoreObj.option === 'upVote' ? currentVoteScore + 1 :
            currentVoteScore - 1;
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [changePostScoreObj.postId]: {
                        ...state.posts[changePostScoreObj.postId],
                        voteScore
                    }
                }
            }
        case EDIT_POST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [editPostObj.id]: {
                        ...state.posts[editPostObj.id],
                        ...editPostObj
                    }
                }
            }
        case REMOVE_POST:
            const filteredPosts = Object.keys(state.posts)
                .filter(key => key !== postId)
                .reduce((result, current) => {
                    result[current] = state.posts[current];
                    return result;
                }, {});
            return {
                ...state,
                posts: filteredPosts
            }
        default:
            return state;
    }
}

// used in selectors
export const getPostsFromState = (state) => state.posts.posts;
export const getPostsSortingOptionFromState = (state) => state.posts.postsSortingOption;
