import { useEffect } from "react"
import { useCircleContext } from "../hooks/useCircleContext"

// components
import CircleDetails from '../components/CircleDetails'
import CircleForm from "../components/CircleForm"

const Home = () => {
    const {circles, dispatch} = useCircleContext()

    useEffect(() => {
        const fetchCircles = async () => {
            const response = await fetch('/home/circles')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_CIRCLES', payload: json})
            }
        }

        fetchCircles()
    }, [dispatch])

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