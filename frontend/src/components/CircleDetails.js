const CircleDetails = ({ circle }) => {
    return(
        <div className="circle-details">
            <h4>{circle.title}</h4>
            <p>Description: {circle.description}</p>
            <p>{circle.createdAt}</p>
        </div>
    )
}

export default CircleDetails