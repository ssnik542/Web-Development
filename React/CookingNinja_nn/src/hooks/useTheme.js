import { useContext } from 'react/cjs/react.development'
import { ThemeContext } from '../context/ThemeContext'
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme() must be used inside a ThemeProvider")
    }
    return context;
}