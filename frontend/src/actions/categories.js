import { receivePosts } from './posts';
import { fetchCategories, fetchPostsByCategory } from '../utils/api';
import { mapToIds, normalize } from '../utils/helpers';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY';

export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
});

export const getCategories = () => (dispatch, getState) => {
    const state = getState();
    // if there are already cached categories return them instead of the new api request. Otherwise get them from api (if user directly comes to category page i.e. by typing URL)
    return state.categories && state.categories.categories.length ? state.categories.categories : fetchCategories()
        .then(categories => dispatch(receiveCategories(categories)))
};

export const setCurrentCategory = currentCategory => ({
    type: SET_CURRENT_CATEGORY,
    currentCategory
});

const receivePostsByCategory = postsIdsByCategory => ({
    type: RECEIVE_POSTS_BY_CATEGORY,
    postsIdsByCategory
});

export const getPostsByCategory = category => dispatch => (
    fetchPostsByCategory(category)
        .then(posts => {
            dispatch(receivePostsByCategory(mapToIds(posts)));
            dispatch(receivePosts(normalize(posts)));
        })
);
