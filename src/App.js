
import './App.css';
import { useState,useEffect } from 'react';
import Register from './Register';
import { Routes,Route, useNavigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import {ToastContainer} from 'react-toastify';
import apiReuest from './apiRequest';

function App() {
  const [id,idChange]=useState('');
  const [password,passwordChange]=useState('');
  const [fullname,fullnameChange]=useState('');
  const [email,emailChange]=useState('');
  const [fetchError,setfetchError]=useState(null)
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [loginuser,loginuserChange]=useState('');
  const [loginpassword,loginpasswordChange]=useState('');
  const [loginSuccess, loginSuccessChange] = useState(false);
  const navigate=useNavigate()

  const API_URL='http://localhost:3500/user'

  const addnewRegister = async ({ id, fullname, password, email }) => {
    const existingEmail = await checkExistingEmail(email);
    
    if (existingEmail) {
      setfetchError("Email already exists.");
      return;
    }
  
    let regobj = { id, fullname, password, email };
    const postOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(regobj)
    };
    const result = await apiReuest(API_URL, postOptions);
    console.log(result)
    if (result==null) {
      setfetchError("User registered successfully");
      setRegistrationSuccess(true);
    } else {
      setfetchError("Failed to register user.");
    }
    
  };
  
  const checkExistingEmail = async (email) => {
    const response = await fetch(`${API_URL}?email=${email}`);
    const data = await response.json();
    return data.length > 0; 
  };
  

  const handlesubmit = (e) =>{
    e.preventDefault()
    if (!id || !password || !fullname || !email) return;
    addnewRegister({id,fullname,password,email})
    idChange('')
    passwordChange('')
    fullnameChange('')
    emailChange('')
  }

  useEffect(() => {
    if (registrationSuccess) {
      navigate('/');
    }
  }, [registrationSuccess, navigate]);

  const ProceedLogin = (e)=>{
    e.preventDefault();
    loginauth({loginuser,loginpassword})
  }

  const loginauth = async({loginuser,loginpassword}) =>{
    const postOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }};
    const lresult = await fetch(API_URL+'/'+loginuser).then((res)=>{return res.json()});
    if (lresult.id===loginuser && lresult.password===loginpassword ){
      loginSuccessChange(true)
    }
    else{
      setfetchError("Username and password are not matching")
    }
  }

  useEffect(() => {
    if (loginSuccess) {
      navigate('/home');
    }
  }, [loginSuccess, navigate]);

    


  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<Home
         loginuser={loginuser}
         loginpassword={loginpassword}
         API_URL={API_URL}
        />}></Route>
        <Route path='/' element={<Login
        loginuser={loginuser}
        loginuserChange={loginuserChange}
        loginpassword={loginpassword}
        loginpasswordChange={loginpasswordChange}
        ProceedLogin={ProceedLogin}
        fetchError={fetchError}
        />}></Route>
        <Route path='register' element={
        <Register 
        handlesubmit={handlesubmit}
        id={id}
        idChange={idChange}
        password={password}
        passwordChange={passwordChange}
        fullname={fullname}
        fullnameChange={fullnameChange}
        email={email}
        emailChange={emailChange}
        fetchError={fetchError}
        />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
