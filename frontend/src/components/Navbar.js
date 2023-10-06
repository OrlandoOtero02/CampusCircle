import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Campus Circle</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <Link to="/following">Following</Link>
                            <Link to="/users">Users</Link>
                            <Link to="/profile">Profile</Link>
                            <Link to="/settings">Settings</Link>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar