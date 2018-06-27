import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const START_REC = 'START_REC';
const STOP_REC = 'STOP_REC';
const GET_BLOB = 'GET_BLOB';
const START_PLAY = 'START_PLAY';
const STOP_PLAY = 'STOP_PLAY';

/**
 * INITIAL STATE
 */
const initialState = {
  isRecord: false,
  isPlayback: false,
  startTime: '',
  blob: {},
  blobURL: '',
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

export const getBlob = (blob, blobURL) => ({
  type: GET_BLOB,
  blob,
  blobURL,
});

export const startPlay = () => ({
  type: START_PLAY,
  bool: true,
});

export const stopPlay = () => ({
  type: STOP_PLAY,
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
        blobURL: action.blobURL,
      };
    case START_PLAY:
      return {
        ...state,
        isPlayback: action.bool,
      };
    case STOP_PLAY:
      return {
        ...state,
        isPlayback: action.bool,
      };
    default:
      return state;
  }
}
