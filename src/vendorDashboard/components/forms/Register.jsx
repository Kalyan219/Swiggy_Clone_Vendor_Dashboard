import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';
 
const Register = ({showLoginHandler}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`${API_URL}/vendor/register`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username,email,password})
        });

        const data = await response.json();
        if(response.ok){
          console.log(data);
          setUsername("");
          setEmail("");
          setPassword("");
          alert('vendor registered succesfully')
          showLoginHandler()
        }
      } catch (error) {
        console.error('registration failed',error)
        alert('Registration Failed')
      }
  }

  return (
    <div className="registerSection">
        <form className='authForm' onSubmit={handleSubmit}>
            <h3>Vendor Register</h3>
            <label>Username</label><br/>
           <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='enter your username' /><br/>
           <label>Email</label><br/>
           <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email' /><br/>
           <label>Password</label><br/>
           <input type='password' name='password' value={password}  onChange={(e) => setPassword(e.target.value)} placeholder='enter your password'/>
           <div className="btnSubmit">
               <button type='submit'>Submit</button>
           </div>
        </form>
    </div>
  )
}

export default Register;