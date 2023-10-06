import { useEffect, useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { useCircleContext } from "../hooks/useCircleContext"
import Button from "@mui/material/Button";

// components
import CircleDetails from '../components/CircleDetails'
import CircleForm from "../components/CircleForm"
import CircleNavbar from "../components/CircleNavbar"

const Home = () => {
    const {circles, dispatch} = useCircleContext()
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
    }, [user, dispatch])

    const [createOpen, setCreateOpen] = useState(false);

    const openCreateDialogue = () => {
        setCreateOpen(true);
    }
    const closeCreateDialogue = () => {
        setCreateOpen(false);
    }

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
/*<Button 
            
onClick={(event) => {
    openCreateDialogue();
}}
>
    Join
</Button>*/