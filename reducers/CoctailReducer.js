import {ACT_LOAD_COCKTAILS} from '../actions/ActionTypes';

const initialState = {
    coctails: {}
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case ACT_LOAD_COCKTAILS:
            return Object.assign({}, state, { coctails: action.props })
        default:
            return state
    }

}
