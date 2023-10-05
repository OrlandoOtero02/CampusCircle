import React, { useState } from 'react';
import '../css/Signup.css';
import Logo from '../CampusCircle Logo White.png';
import { TextField, Button, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSignup} from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const {signup, isLoading, error} = useSignup()

    const handleSubmit = async (e) => {
        //stop refresh of page
        e.preventDefault()

        //console.log(email, password, username)

        await signup(email, password, username)
    }

    return (
        <div className="Signup">
        {(
        <div className="signup-container">
            <img className="logo-image" src={Logo} alt="CampusCircle Logo" />
            <div className="signup-form">
                <h2 className="header">Create an account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-container">
                        <div className="form-group">
                            <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                                    <AccountCircleIcon />
                                </InputAdornment>
                                ),
                            }}
                            />
                        </div>
                        <div>
                            <Button type="submit" variant="contained" disabled={isLoading} className="signup-button">
                            Sign Up
                            </Button>
                            {error && <div className="error">{error}</div>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
        )}
        </div>
    )
}

export default Signup