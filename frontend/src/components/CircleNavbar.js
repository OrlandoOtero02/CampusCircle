import { Link } from 'react-router-dom'

const CircleNavbar = () => {
    return(
        <div>
            <Link to="/">
                <h4>My Circles</h4>
            </Link>
            <Link to="/">
                <h4>Joinable Circles</h4>
            </Link>
        </div>
    )
}

export default CircleNavbar