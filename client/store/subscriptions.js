import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const ADD_SUBSCRIPTION = 'ADD_SUBSCRIPTION';
const REMOVE_SUBSCRIPTION = 'REMOVE_SUBSCRIPTION';
const GET_SUBSCRIPTIONS = 'GET_SUBSCRIPTIONS';
const GET_SUBSCRIBERS = 'GET_SUBSCRIBERS';

/**
 * INITIAL STATE
 */
const initialState = { subscriptions: [], subscribers: [] };

/**
 * ACTION CREATORS
 */
export const addSubscription = creator => ({
  type: ADD_SUBSCRIPTION,
  creator,
});
export const removeSubscription = creator => ({
  type: REMOVE_SUBSCRIPTION,
  creator,
});

/**
 * THUNK CREATORS
 */
// export const me = () => async dispatch => {};

export const subscribe = () => async dispatch => {
  axios.put('/api/');
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_SUBSCRIPTION:
      return { ...state, subscriptions: [...state.subscriptions, action.creator] };
    default:
      return state;
  }
}
