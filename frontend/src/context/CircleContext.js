import { createContext, useReducer } from 'react'

export const CircleContext = createContext()

export const circlesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CIRCLES':
            return {
                circles: action.payload
            }
        case 'CREATE_CIRCLE':
            return {
                circles: [action.payload, ...state.circles]
            }
        case 'DELETE_CIRCLE':
            return {
                circles: state.circles.filter((c) => c._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const CircleContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(circlesReducer, {
        circles: null
    })

    return (
        <CircleContext.Provider value={{...state, dispatch}}>
            { children }
        </CircleContext.Provider>
    )
}