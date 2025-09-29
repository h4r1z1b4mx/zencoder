import {useState} from 'react';
import {loadPreferences} from '../../config/preferences.js';
import {defaultTheme} from '../../config/themes.js';
import {LLMClient, Message} from '../../types/core.js';
export function useAppState () {
	// Initialize theme from preferences
	const preferences = loadPreferences();

	const initialTheme = preferences.selectedTheme || defaultTheme;

	const [client, setClient] = useState<LLMClient | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	

}
