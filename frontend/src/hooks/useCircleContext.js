import { CircleContext } from "../context/CircleContext";
import { useContext } from "react";

export const useCircleContext = () => {
    const context = useContext(CircleContext)

    if (!context) {
        throw Error('useCircleContext must be used inside an CircleContextProvider')
    }

    return context
}