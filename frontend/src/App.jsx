import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/login';
import SignUp from './components/Signup';
import Todo from './components/todo';
const App = () => {
  return (
    <Router>      
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/login" element={} /> */}
        <Route path="/signup" element={<SignUp/>} /> 
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </Router>
  );
};

export default App;
