import React from 'react';
import { Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { Navbar, Editor, Recorder, TeacherRecording } from './components';
import Routes from './routes';

const App = () => {
  return (
    <div>
      <Navbar />
      <TeacherRecording />
      <Routes />
    </div>
  );
};

export default App;
