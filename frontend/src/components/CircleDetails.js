import { useAuthContext } from "../hooks/useAuthContext"

const CircleDetails = ({ circle }) => {
    return(
        <div className="circle-details">
            <h4>{circle.title}</h4>
            <p>Description: {circle.description}</p>
            <p>Members: {circle.members.length}</p>
            <p>{formatDistanceToNow(new Date(circle.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            <p>{circle.createdAt}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default CircleDetails