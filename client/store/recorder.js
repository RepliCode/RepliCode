import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const START_REC = 'START_REC';
const STOP_REC = 'STOP_REC';

/**
 * INITIAL STATE
 */
const initialState = {
  isRecord: false,
  startTime: '',
};

/**
 * ACTION CREATORS
 */
export const startRec = startTime => ({
  type: START_REC,
  state: { isRecord: true, startTime },
});
export const stopRec = () => ({
  type: STOP_REC,
  bool: false,
});

/**
 * THUNK CREATORS
 */
// export const me = () => async dispatch => {};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case START_REC:
      return action.state;
    case STOP_REC:
      return {
        ...state,
        isRecord: action.bool,
      };
    default:
      return state;
  }
}
