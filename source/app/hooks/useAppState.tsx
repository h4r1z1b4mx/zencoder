import {useState} from 'react';
import {loadPreferences} from '../../config/preferences.js';
import {defaultTheme} from '../../config/themes.js';
import {LLMClient, Message, ProviderType} from '../../types/core.js';
import type {ThemePreset} from '../../types/ui.js';

export function useAppState () {
	// Initialize theme from preferences
	const preferences = loadPreferences();

	const initialTheme = preferences.selectedTheme || defaultTheme;

	const [client, setClient] = useState<LLMClient | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [displayMessages, setDisplayMessages] = useState<Message[]>([]);
	const [messageTokenCache, setMessageTokenCache] = useState<Map<string, number>>(new Map());
	const [currentModel, setCurrentModel] = useState<string>('');
	const [currentProvider, setCurrentProvider] = useState<ProviderType>('openai-compatible');
	const [currentTheme, setCurrentTheme] = useState<ThemePreset>(initialTheme);
	const [toolManager, setToolManager] = useState<ToolManager | null>(null);
}
