const CircleDetails = ({ circle }) => {

    const handleClick = async() => {
        const response = await fetch('/api/circles/' + circle._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            // will need to update local frontend
            console.log(json)
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