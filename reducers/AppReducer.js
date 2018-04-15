import { CHANGE_APP_PROPS, LOAD_DETAILS } from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  loadDetails: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_APP_PROPS:
      return { ...state, loading: action.payload }
    case LOAD_DETAILS:
      return { ...state, loadDetails: action.payload }
    default:
      return state;
  }
};