import { useState } from "react"
import { useCircleContext } from "../hooks/useCircleContext"

const CircleForm = () => {
    const { dispatch } = useCircleContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const circle = {title, description}

        const response = await fetch('/home/circles', {
            method: 'POST',
            body: JSON.stringify(circle),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setTitle('')
            setDescription('')
            setError(null)
            console.log('new circle added', json)
            dispatch({type: 'CREATE_CIRCLE', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create a New Circle</h3>

            <label>Circle Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Description:</label>
            <input 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />

            <button>Add Circle</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default CircleForm