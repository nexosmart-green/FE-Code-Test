import {SELECTED_COCKTAIL} from '../actions/ActionTypes';
export default (state = null, action) => {
    switch (action.type) {
        case SELECTED_COCKTAIL:
            return action.payload;
        default:
            return state;

    }
};