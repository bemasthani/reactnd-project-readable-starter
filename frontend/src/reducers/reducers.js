import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import categories from './categories';
import posts from './posts';
import comments from './comments';
import { SET_CONFIRM_MODAL } from '../actions/actions';

const confirmModalInitialState = {
    isOpen: false,
    id: ''
}

function confirmModal(state = confirmModalInitialState, action) {
    const { type, confirmModal } = action;
    switch (type) {
        case SET_CONFIRM_MODAL:
            return {
                ...state,
                ...confirmModal
            }
        default:
            return state;
    }
}

// combine all reducers
export default combineReducers({
    categories,
    posts,
    comments,
    confirmModal,
    form: formReducer
});
