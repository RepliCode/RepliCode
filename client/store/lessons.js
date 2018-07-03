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
  newLesson,
});
export const getAllLessons = lessons => ({
  type: GET_ALL_LESSONS,
  lessons,
});

/**
 * THUNK CREATORS
 */

export const addLessonThunk = (formFields, userId) => async dispatch => {
  try {
    let audioData = new FormData();
    audioData.append(formFields.title, formFields.blob);
    audioData.append('userId', userId);
    let request = {
      url: `/api/aws/${userId}/upload`,
      method: 'POST',
      data: audioData,
      processData: false,
      contentType: false,
    };
    const filename = await axios(request);
    console.log('WIth like a label', filename);
    const savedLesson = await axios.post(`/api/users/${userId}`, {
      ...formFields,
      audioURL: `https://replicode.s3.amazonaws.com/${filename.data}`,
    });
    dispatch(addLesson(savedLesson.data));
  } catch (err) {
    console.error(err);
  }
};

export const getLessonsThunk = () => async dispatch => {
  try {
    let userFetch = await axios.get('/api/users');
    let lessons = [];
    userFetch.data.forEach(user => {
      lessons = lessons.concat(user.lessons);
    });
    //Since we are eager loading content creators, we should at some point dispatch an action to save the creators in the store so that we can render an all creators or individual creators page with their details.
    dispatch(getAllLessons(lessons));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_LESSON:
      return {
        ...state,
        lessons: [...state.lessons, action.newLesson],
      };
    case GET_ALL_LESSONS:
      return { ...state, lessons: action.lessons };
    default:
      return state;
  }
}
