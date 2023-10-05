import { useEffect } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { useCircleContext } from "../hooks/useCircleContext"

// components
import CircleDetails from '../components/CircleDetails'
import CircleForm from "../components/CircleForm"
import CircleNavbar from "../components/CircleNavbar"

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
                dispatch({type: 'SET_CIRCLES', payload: json})
            }
        }

        if (user) {
            fetchCircles()
        }
    }, [user])

    return(
        <div className="home">
                <div className="circles">
                    {circles && circles.map((circle) => (
                        <CircleDetails key={circle._id} circle={circle}/>
                ))}
                </div>
            <CircleForm />
        </div>
    )
}

export default Home