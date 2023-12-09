import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link } from 'react-router-dom'; // Import Link from React Router
import Logo from '../assets/CampusCircle Logo White.png'

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
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="logo-container">
                    <img className="logo-image" src={Logo} alt="CampusCircle Logo" />
                </div>

                <div className="fields-container">
                    <h3>Login</h3>

                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    <button disabled={isLoading}>Login</button>
                    {error && <div className="error">{error}</div>}
                    <Link to="/forgot-password" className="forgot-password-link">
                        Forgot Password?
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login