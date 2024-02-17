import { createContext, useContext, useState } from "react";

type ThemeProviderProps = { 
    children: React.ReactNode
}

const ThemeContext = createContext<boolean>(false);
const ThemeUpdateContext = createContext<()=>void>(()=>{});

export function useTheme(){
    return useContext(ThemeContext)
}

export function useThemeUpdate(){
    return useContext(ThemeUpdateContext)
}

export function ThemeProvider({children}:ThemeProviderProps){
    
    const [darkTheme, setDarkTheme] = useState<boolean>(false)

    function toggleTheme(){
        setDarkTheme(prevDarkTheme => !prevDarkTheme);
    }
    
    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}
