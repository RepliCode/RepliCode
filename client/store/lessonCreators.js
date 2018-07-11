import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ALL_CREATORS = 'GET_ALL_CREATORS';

/**
 * INITIAL STATE
 */
const creators = [];

/**
 * ACTION CREATORS
 */
export const getCreators = creators => ({ type: GET_ALL_CREATORS, creators });

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = creators, action) {
  switch (action.type) {
    case GET_ALL_CREATORS:
      return action.creators;
    default:
      return state;
  }
}
