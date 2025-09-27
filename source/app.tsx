import React from "react"
import { ThemeContext } from "./hooks/useTheme"
export default function App() {

	return (
		<ThemeContext.Provider value={ThemeContext}>
			
		</ThemeContext.Provider>
	)
}
