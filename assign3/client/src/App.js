import React from 'react'
import Form from './Components/Form'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Form/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App