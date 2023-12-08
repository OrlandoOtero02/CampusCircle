import { createContext, useReducer } from 'react'

export const EventContext = createContext()

export const eventsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_EVENT':
            return {
                events: action.payload
            }
        case 'CREATE_EVENT':
            return {
                events: [action.payload, ...state.events]
            }
        case 'DELETE_EVENT':
            return {
                events: state.events.filter((c) => c._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const EventContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(eventsReducer, {
        events: null
    })

    return (
        <EventContext.Provider value={{...state, dispatch}}>
            { children }
        </EventContext.Provider>
    )
}