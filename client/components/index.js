/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar';
export { default as UserHome } from './user-home';
export { Login, Signup } from './auth-form';
export { default as Editor } from './editor';
export { default as Recorder } from './recorder';
export { default as TeacherRecording } from './teacherRecording';
export { default as RecordingForm } from './recordingForm';
export { default as Console } from './console';
export { default as SingleLesson } from './singleLesson';
export { default as Lessons } from './lessons';
export { default as AuthModal } from './authModal';
export { default as LessonCard } from './lessonCard';
export { default as LandingPage } from './landingPage';
export { default as Feed } from './feed';
export { default as CustomPlayer } from './customPlayer';
