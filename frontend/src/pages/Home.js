import { useEffect, useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'

// components
import CircleDetails from '../components/CircleDetails'
import CircleForm from "../components/CircleForm"
//import CircleNavbar from "../components/CircleNavbar"
//import Navbar from "../components/Navbar"

const Home = () => {
    const [circles, setCircles] = useState(null)
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchCircles = async () => {
            const response = await fetch('/api/circles', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                setCircles(json)
            }
        }

        if (user) {
            fetchCircles()
        }
    }, [user])

    return(
        <>
        <div className="home">
            <div className="circles">
                {circles && circles.map((circle) => (
                    <CircleDetails key={circle._id} circle={circle}/>
                ))}
            </div>
            <CircleForm />
        </div>
        </>
    )
}

export default Home