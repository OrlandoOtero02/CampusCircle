import { useAuthContext } from "../hooks/useAuthContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useCircleContext } from "../hooks/useCircleContext"
import Button from '@mui/material/Button'
import { useState } from "react"
import { 
Navigate,
Link, 
} from "react-router-dom"

const CircleDetails = ({ circle, joined }) => {
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

    const handleJoin = async() => {
        console.log(user.email)
      
        if (!user) {
            setError('You must be logged in')
            return
        }
        const response = await fetch('/api/circles/add/' + circle._id, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        
        const json = await response.json()

        if (response.ok) {
            console.log(json)
        }
    }

    const handleLeave = async () => {
        if (!user) {
            setError('You must be logged in')
            return
        }
        const response = await fetch('/api/circles/leave/' + circle._id, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        
        const json = await response.json()

        if (response.ok) {
            console.log(json)
        }
    }

    const handleOpen = () => {
        if (joined) {
            console.log("\n How did you get here? \n")
        }
    }

    const [owner, setOwner] = useState(false);

    if (circle.user_id == user.id) {
        setOwner(true);
    }

    return(
        <div className="circle-details">
            {joined ? <h4><Link to='/messaging'>{circle.title}</Link></h4> : <h4>{circle.title}</h4>}
            <p>Description: {circle.description}</p>
            <p>Members: {circle.members.length}</p>
            <p>{formatDistanceToNow(new Date(circle.createdAt), { addSuffix: true })}</p>
            <Button onClick={handleDelete}>Delete</Button>
            { joined ? <Button onClick={handleLeave}>Leave</Button> : <Button onClick={handleJoin}>Join</Button>}
        </div>
    )
}
export default CircleDetails