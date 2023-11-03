//signup.js
import { useState } from 'react'
import { useSignup} from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [birthdate, setBirthdate] = useState(new Date());
    const {signup, isLoading, error} = useSignup()

    const handleSubmit = async (e) => {
        //stop refresh of page
        e.preventDefault()

        //console.log(email, password, username, birthdate)

        await signup(email, password, username, birthdate)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <label>Username:</label>
            <input 
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <label>Birthdate:</label>
            <input
                type="date"
                onChange={(e) => setBirthdate(e.target.value)}
                value={birthdate}
            />
            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup