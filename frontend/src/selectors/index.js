import { createSelector } from 'reselect';
import { getPostsIdsByCategoryFromState } from '../reducers/categories';
import { getPostsFromState, getPostsSortingOptionFromState } from '../reducers/posts';
import { getCommentsFromState, getCommentsSortingOptionFromState } from '../reducers/comments';
import { unNormalize } from '../utils/helpers';

// gets posts by category refferencing them by ids
const getPostsIdsByCategoryFunction = (posts, postsByCategory) => posts.filter(
    post => postsByCategory.indexOf(post.id) > -1
);

// posts and comments are kept in normalized form. This selector function transform them back to plain arrays and sorts them
const getPostsCommentsFunction = (collection, sortingOption) => (
    unNormalize(collection).sort((a,b) => a[sortingOption] < b[sortingOption])
);

export const getPostsSelector = createSelector(
    getPostsFromState,
    getPostsSortingOptionFromState,
    getPostsCommentsFunction
);

export const getPostsByCategorySelector = createSelector(
    getPostsSelector,
    getPostsIdsByCategoryFromState,
    getPostsIdsByCategoryFunction
);

export const getCommentsSelector = createSelector(
    getCommentsFromState,
    getCommentsSortingOptionFromState,
    getPostsCommentsFunction
);
