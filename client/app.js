import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Editor from './editor'

const App = () => {
  return (
    <div>
      <Navbar />
      <Editor />
      <Routes />
    </div>
  )
}

export default App
