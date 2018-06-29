import React from 'react';
import { Navbar, TeacherRecording } from './components';
import Routes from './routes';
// Add routes right under navbar
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
