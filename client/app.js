import React from 'react';
import { Navbar, Editor, Recorder, TeacherRecording } from './components';
import Routes from './routes';
// Add routes right under navbar
const App = () => {
  return (
    <div>
      <Navbar />
      <TeacherRecording />
    </div>
  );
};

export default App;
