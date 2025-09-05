import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const themeReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, color: action.payload }
        case 'CHANGE_MODE':
            return { ...state, mode: action.payload }
        default:
            return state;
    }
}
export function ThemeProvider({ children }) {

    //custom logic 
    const [state, dispatch] = useReducer(themeReducer, {
        color: '#9f2bc1',
        mode: 'dark'
    })
    const changeColor = (color) => {
        // console.log(color)
        dispatch({ type: 'CHANGE_COLOR', payload: color })
    }
    const changeMode = (mode) => {
        // console.log(mode)
        dispatch({ type: 'CHANGE_MODE', payload: mode })
    }
    return (
        <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
            {children}
        </ThemeContext.Provider>
    )
}