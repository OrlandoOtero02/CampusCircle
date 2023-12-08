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
    
    const isOwner = circle.user_id === user._id;

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

    // Determine the text color based on the theme (light or dark)
    const textColor = document.body.className === "dark" ? "black" : "black";

    return(
        <div className="circle-details">
            {joined ? <h4 style={{ color: textColor }}><Link to='/messaging'>{circle.title}</Link></h4> : <h4 style={{ color: textColor }}>{circle.title}</h4>}
            <p>Description: {circle.description}</p>
            <p>Members: {circle.members.length}</p>
            <p style={{ marginBottom: 10 }}>{formatDistanceToNow(new Date(circle.createdAt), { addSuffix: true })}</p>
            {isOwner && <Button onClick={handleDelete}>Delete</Button>}
            { joined ? <Button variant="contained" style={{ marginRight: 10 }} onClick={handleLeave}>Leave</Button> : <Button variant="contained" style={{ marginRight: 10 }} onClick={handleJoin}>Join</Button>}
        </div>
    )
}
export default CircleDetails