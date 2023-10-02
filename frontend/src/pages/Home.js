import { useEffect, useState } from "react"

const Home = () => {
    const [circles, setCircles] = useState(null)

    useEffect(() => {
        const fetchCircles = async () => {
            const response = await fetch('/home/circles')
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
                    <p key={circle._id}>{circle.title}</p>
                ))}
            </div>
        </div>
    )
}

export default Home