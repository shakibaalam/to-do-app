
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddTasks from './Components/AddTasks';
import Login from './Components/Login';
import NavBar from './Components/NavBar';
import Register from './Components/Register';
import RequireAuth from './Components/RequireAuth';
import Task from './Components/Task';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <h1 className='my-8 font-bold text-4xl text-purple-600'>Welcome To-Do app.......</h1>
      <Routes>
        <Route path="/" element={<Login></Login>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/register" element={<Register></Register>} />
        <Route path="/add" element={<RequireAuth>
          <AddTasks></AddTasks>
        </RequireAuth>} />
        <Route path="/task" element={<RequireAuth>
          <Task></Task>
        </RequireAuth>} />
      </Routes>
    </div>
  );
}

export default App;
