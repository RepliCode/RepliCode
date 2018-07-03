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
export const getSubscriptions = subscriptions => ({
  type: GET_SUBSCRIPTIONS,
  subscriptions,
});

/**
 * THUNK CREATORS
 */
// export const me = () => async dispatch => {};

export const subscribe = userId => async dispatch => {
  let lessonCreator = await axios.put(`/api/users/${userId}/subscriptions`);
  dispatch(addSubscription(lessonCreator));
};

export const unSubscribe = userId => async dispatch => {
  let lessonCreator = await axios.delete(`/api/users/${userId}/subscriptions`);
  dispatch(removeSubscription(lessonCreator));
};

export const getSubscriptionsThunk = userId => async dispatch => {
  let subscriptions = await axios.get(`/api/users/:userId/subscriptions`);
  dispatch(getSubscriptions(subscriptions));
};
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_SUBSCRIPTION:
      return { ...state, subscriptions: [...state.subscriptions, action.creator] };
    case REMOVE_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: state.subscriptions.filter(creator => creator.id !== action.creator.id),
      };
    case GET_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.subscriptions,
      };
    default:
      return state;
  }
}
