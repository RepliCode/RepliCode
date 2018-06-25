import React from 'react';

import { Navbar, Editor, Recorder } from './components';
import Routes from './routes';

const App = () => {
  return (
    <div>
      <Navbar />
      <Editor />
      <Recorder />
      <Routes />
    </div>
  );
};

export default App;
