import {useContext, createContext} from 'react';
import { Colors, ThemePreset } from '../types/ui.js';

export interface ThemeContextType {
	currentTheme: ThemePreset;
	colors: Colors;
	setCurrentTheme: (theme: ThemePreset) => void;
}


export const  ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error('useTheme must be used within a Theme\'s provider');
	}

	return context
}
