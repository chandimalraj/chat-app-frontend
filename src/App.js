import logo from './logo.svg';
import './App.css';
import ChatRoom from './components/ChatRoom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
    } from 'react-router-dom';
import SignUp from './components/Register/SignUp';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Chatroom from './components/Chatroom/Chatroom';
import Testing from './components/Testing';

function App() {
  return (
   
  
<Router>
  <Routes>

    <Route exact path='/register' element={<SignUp/>}></Route>
    <Route exact path='/chatroom' element={<ChatRoom/>}></Route>
    <Route exact path='/login' element={<Login/>}></Route>
    <Route exact path='/profile' element={<Profile/>}></Route>
    <Route exact path='/chat' element={<Chatroom/>}></Route>
    <Route exact path='/testing' element={<Testing/>}></Route>

  </Routes>
</Router>

   
   
  
  );
}

export default App;
