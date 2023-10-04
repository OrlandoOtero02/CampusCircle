import { useEffect, useState } from "react"

// components
import CircleDetails from '../components/CircleDetails'
import CircleForm from "../components/CircleForm"

const Home = () => {
    const [circles, setCircles] = useState(null)

    useEffect(() => {
        const fetchCircles = async () => {
            const response = await fetch('/api/circles')
            const json = await response.json()

            if (response.ok) {
                setCircles(json)
            }
        }

        fetchCircles()
    }, [])

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