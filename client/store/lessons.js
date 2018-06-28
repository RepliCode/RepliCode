import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */

const ADD_NEW_LESSON = 'ADD_NEW_LESSON';

/**
 * INITIAL STATE
 */
const initialState = {
  newLesson: {}
};

/**
 * ACTION CREATORS
 */
export const addLesson = lesson => ({
  type: ADD_NEW_LESSON,
  lesson
})

/**
 * THUNK CREATORS
 */

export const addLessonThunk = formFields => async dispatch => {
  try {
    let audioData = new FormData();
    audioData.append('file', this.props.blob);
    audioData.append('fileName', formFields.title)
    let request = {
      url: 'http://localhost:8080/api/aws/upload',
      method: 'POST',
      data: audioData,
      processData: false,
      contentType: false,
    };
    const aws = await axios.post(request);
    const db = await axios.post('/users/:userId', formFields.blob);
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}


onSubmit() {

  axios(request)
    .then(res => res.data)
    .then(result => {
      console.log(result);
    });
}


/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_LESSON:
      return action.lesson
    default:
      return state;
  }
}
