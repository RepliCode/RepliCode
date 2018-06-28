import axios from 'axios';
// import history from '../history';

/**
 * ACTION TYPES
 */

const GET_ALL_LESSONS = 'GET_ALL_LESSONS';
const ADD_NEW_LESSON = 'ADD_NEW_LESSON';

/**
 * INITIAL STATE
 */
const initialState = {
  lessons: [],
};

/**
 * ACTION CREATORS
 */
export const addLesson = newLesson => ({
  type: ADD_NEW_LESSON,
  newlesson,
});

/**
 * THUNK CREATORS
 */

export const addLessonThunk = formFields => async dispatch => {
  try {
    let audioData = new FormData();
    audioData.append(formFields.title, formFields.blob);
    let request = {
      url: 'http://localhost:8080/api/aws/upload',
      method: 'POST',
      data: audioData,
      processData: false,
      contentType: false,
    };
    const filename = await axios(request).data;
    console.log('WIth like a label', filename);
    const savedLesson = await axios.post('/api/users/:userId', {
      ...formFields,
      audio: `https://replicode.s3.amazonaws.com/${filename}`,
    }).data;
    dispatch(addLesson(savedLesson));
  } catch (err) {
    console.error(err);
  }
};

// onSubmit() {

//   axios(request)
//     .then(res => res.data)
//     .then(result => {
//       console.log(result);
//     });
// }

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_LESSON:
      return {
        ...state,
        lessons: [...lessons, action.newLesson],
      };
    default:
      return state;
  }
}
