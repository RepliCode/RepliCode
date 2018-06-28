import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */

const GET_CONSOLE_STATE = 'GET_CONSOLE_STATE';
const SET_CONSOLE_STATE = 'SET_CONSOLE_STATE';
const DELETE_CONSOLE_STATE = 'DELETE_CONSOLE_STATE';

/**
 * INITIAL STATE
 */
const defaultState = {};

/**
 * ACTION CREATORS
 */
const getConsoleState = timestamps => ({ type: GET_CONSOLE_STATE, timestamps });
export const setConsoleState = timestamps => ({ type: SET_CONSOLE_STATE, timestamps });
export const deleteConsoleState = () => ({ type: DELETE_CONSOLE_STATE });

/**
 * THUNK CREATORS
 */

// export const getConsole = () => async dispatch => {
//   try {
//     const res = await axios.get('/auth/me')
//     dispatch(getUser(res.data || defaultUser))
//   } catch (err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_CONSOLE_STATE:
      // this will be pulling from db
      return action.timestamps;
    case SET_CONSOLE_STATE:
      // this will be assigning timestamps from current record to store
      return action.timestamps;
    case DELETE_CONSOLE_STATE:
      // this will be assigning timestamps from current record to store
      return {};
    default:
      return state;
  }
}
