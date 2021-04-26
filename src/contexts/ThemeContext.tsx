import { createContext, useState, ReactNode, useContext } from 'react'

type ThemeContextData = {
    isDark: boolean;
    changeToDark: () => void;
    changeToLight: () => void;
}

export const ThemeContext = createContext({} as ThemeContextData)

type ThemeContextProviderProps = {
    children: ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {

    const [isDark, setIsDark] = useState(false)

    function changeToDark() {
        setIsDark(true)
    }

    function changeToLight() {
        setIsDark(false)
    }

    return (
        <ThemeContext.Provider 
        value={{
            isDark,
            changeToDark,
            changeToLight,
        }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}