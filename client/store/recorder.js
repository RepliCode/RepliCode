import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const START_REC = 'START_REC';
const STOP_REC = 'STOP_REC';
const GET_BLOB = 'GET_BLOB';

/**
 * INITIAL STATE
 */
const initialState = {
  isRecord: false,
  startTime: '',
  blob: {},
};

/**
 * ACTION CREATORS
 */
export const startRec = startTime => ({
  type: START_REC,
  isRecord: true,
  startTime,
});
export const stopRec = () => ({
  type: STOP_REC,
  bool: false,
});

export const getBlob = blob => ({
  type: GET_BLOB,
  blob,
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
      return {
        ...state,
        isRecord: action.isRecord,
        startTime: action.startTime,
      };
    case STOP_REC:
      return {
        ...state,
        isRecord: action.bool,
      };
    case GET_BLOB:
      return {
        ...state,
        blob: action.blob,
      };
    default:
      return state;
  }
}
