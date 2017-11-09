import { RECEIVE_CATEGORIES, RECEIVE_POSTS_BY_CATEGORY, SET_CURRENT_CATEGORY } from '../actions/categories';

const categoriesInitialState = {
    categories: [],
    currentCategory: '',
    postsIdsByCategory: []
}

export default function categories(state = categoriesInitialState, action) {
    const { type, categories, currentCategory, postsIdsByCategory } = action;
    switch (type) {
        case RECEIVE_CATEGORIES:
            return {
                ...state,
                categories
            };
        case SET_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory
            }
        case RECEIVE_POSTS_BY_CATEGORY:
            // keep only ids of posts by category as a refference
            return {
                ...state,
                postsIdsByCategory
            }
        default:
            return state;
    }
}

// used in selector
export const getPostsIdsByCategoryFromState = (state) => state.categories.postsIdsByCategory;
