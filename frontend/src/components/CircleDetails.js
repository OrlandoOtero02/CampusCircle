import { useAuthContext } from "../hooks/useAuthContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useCircleContext } from "../hooks/useCircleContext"
import Button from '@mui/material/Button'
import { useState } from "react"

const CircleDetails = ({ circle }) => {
    const { dispatch } = useCircleContext()
    const { user } = useAuthContext()
    const [error, setError] = useState(null)

    const handleDelete = async () => {
        const response = await fetch('/api/circles/' + circle._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
           dispatch({type: 'DELETE_CIRCLE', payload: json})
           console.log(json)
        }
    }

    const handleJoin = async () => {
        if (!user) {
            setError('You must be logged in')
            return
        }
        const response = await fetch('/api/user/', {
            method: 'PATCH',
            body: JSON.stringify(circle._id),
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        
        const json = await response.json()

        if (response.ok) {
            console.log(json)
        }
    }

    return(
        <div className="circle-details">
            <h4>{circle.title}</h4>
            <p>Description: {circle.description}</p>
            <p>Members: {circle.members.length}</p>
            <p>{formatDistanceToNow(new Date(circle.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
            <Button onClick={handleJoin}>Join</Button>
        </div>
    )
}

export default CircleDetails