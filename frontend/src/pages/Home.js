import { useEffect, useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { useCircleContext } from "../hooks/useCircleContext"
import Button from "@mui/material/Button";

// components
import CircleDetails from '../components/CircleDetails'
import CircleForm from "../components/CircleForm"
import CircleNavbar from "../components/CircleNavbar"

//import CircleNavbar from "../components/CircleNavbar"
//import Navbar from "../components/Navbar"


const Home = () => {
    const {circles, dispatch} = useCircleContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchCircles = async () => {
            const response = await fetch('/api/circles/user', {
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

    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            <div className="home">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search Circles"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="circles">
                    {circles &&
                        circles
                            .filter((circle) => {
                                if (searchQuery.trim() === "") {
                                    return true; // Show all circles when the search query is blank
                                }
                                return (
                                    circle.title &&
                                    circle.title.toLowerCase().includes(searchQuery.toLowerCase())
                                    || circle.description.toLowerCase().includes(searchQuery.toLowerCase())
                                );
                            })
                            .map((circle) => (
                                // <CircleDetails key={circle._id} circle={circle} joined={true} />
                                <CircleDetails key={circle._id} circle={circle} />
                            ))}
                </div>
                <CircleForm />
            </div>
        </>
    );
};

export default Home;
/*<Button 
            
onClick={(event) => {
    openCreateDialogue();
}}
>
    Join
</Button>*/