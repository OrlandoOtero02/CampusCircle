import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useCircleContext } from "../hooks/useCircleContext"

const CircleForm = () => {
    const { user } = useAuthContext()
    const { dispatch } = useCircleContext()
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async (e) => {
        
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const circle = {title, description}

        const response = await fetch('/api/circles', {
            method: 'POST',
            body: JSON.stringify(circle),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setTitle('')
            setDescription('')
            setError(null)
            setEmptyFields([])
            console.log('new circle added', json)
            dispatch({type: 'CREATE_CIRCLE', payload: json})
        }
    }

    // Determine the text color based on the theme (light or dark)
    const buttonColor = '#0988d0';

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create a New Circle</h3>

            <label>Circle Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Description:</label>
            <input 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
            />

            <button style={{ backgroundColor: buttonColor }}>Add Circle</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default CircleForm