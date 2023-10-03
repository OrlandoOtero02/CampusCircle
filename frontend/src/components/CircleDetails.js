import { useCircleContext } from "../hooks/useCircleContext"

const CircleDetails = ({ circle }) => {
    const { dispatch } = useCircleContext()

    const handleClick = async () => {
        const response = await fetch('/home/circles/' + circle._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_CIRCLE', payload: json})
        }
    }

    return(
        <div className="circle-details">
            <h4>{circle.title}</h4>
            <p>Description: {circle.description}</p>
            <p>{circle.createdAt}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default CircleDetails