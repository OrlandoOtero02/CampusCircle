import { Link } from 'react-router-dom'

const CircleNavbar = () => {
    return(
        <header>
            <div className="circle-navbar">
                <Link to="/">
                    <h4>My Circles</h4>
                </Link>
                <Link to="/JoinableCircles">
                    <h4>Joinable Circles</h4>
                </Link>
            </div>
        </header>

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