import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Signup';
import Todo from './components/Todo';
import Mail from './components/Mail';
const App = () => {
  return (
    <Router>      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} /> 
        <Route path='/todo' element={<Todo />} />
        <Route path='/mail' element={<Mail />} />
      </Routes>
    </Router>
  );
};

export default App;
