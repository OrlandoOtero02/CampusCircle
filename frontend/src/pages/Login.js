import React, { useState } from 'react';
import '../css/Login.css';
import Logo from '../CampusCircle Logo White.png';
import { TextField, Button, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useLogin } from '../hooks/useLogin'
import { Link } from 'react-router-dom';

const Login = () => {
    //const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLoading, error} = useLogin()

    const handleSubmit = async (e) => {
        //stop refresh of page
        e.preventDefault()

        //console.log(username, password)
        await login(username, password)
    }

    return (
        <div className="Login">
      {(
        <div className="login-container">
          <img className="logo-image" src={Logo} alt="CampusCircle Logo" />
          <div className="login-form">
            <h2 className="slogan">Stay connected to your circles.</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-container">
                <div className="form-group">
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div>
                  <Button type="submit" variant="contained" disabled={isLoading} className="login-button">
                    Login
                  </Button>
                  {error && <div className="error">{error}</div>}
                </div>
                <div className="signup-section">
                  <div className="signup-content">
                    <h3>Don't have an account?</h3>
                    <Link to="/signup">
                      <Button variant="contained" className="signup-button">
                        Sign up
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    )
}

export default Login