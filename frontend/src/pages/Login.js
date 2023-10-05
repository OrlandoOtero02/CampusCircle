import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link } from 'react-router-dom'; // Import Link from React Router

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
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>

            <label>Username:</label>
            <input 
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <label>Password:</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div>}
            <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link> {/* Link to the ForgotPassword page */}
        </form>
    )
}

export default Login