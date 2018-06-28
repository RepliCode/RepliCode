import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */

const GET_TEXT_STATE = 'GET_TEXT_STATE';
const SET_TEXT_STATE = 'SET_TEXT_STATE';
const DELETE_TEXT_STATE = 'DELETE_TEXT_STATE';

/**
 * INITIAL STATE
 */
const defaultState = {};

/**
 * ACTION CREATORS
 */
const getTextState = timestamps => ({ type: GET_TEXT_STATE, timestamps });
export const setTextState = timestamps => ({ type: SET_TEXT_STATE, timestamps });
export const deleteTextState = () => ({ type: DELETE_TEXT_STATE });

/**
 * THUNK CREATORS
 */

export const runCode = code => dispatch => {
  return axios
    .post('/api/sandBox', { code })
    .then(evaluation => evaluation.data)
    .then(answer => answer)
    .catch(console.error);
};

// export const getText = () => async dispatch => {
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
    case GET_TEXT_STATE:
      // this will be pulling from db
      return action.timestamps;
    case SET_TEXT_STATE:
      // this will be assigning timestamps from current record to store
      return action.timestamps;
    case DELETE_TEXT_STATE:
      // this will be assigning timestamps from current record to store
      return {};
    default:
      return state;
  }
}
