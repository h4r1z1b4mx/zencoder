import { ProviderType } from "./core.js";
import { ThemePreset } from "./ui.js";

export interface UserPreferences {
	lastProvider?: ProviderType;
	lastModel?:string;
	providerModels?:{
		[key in ProviderType]?: string;
	};
	lastUpdateCheck?:number;
	selectedTheme?:ThemePreset;
	trustedDirectories?: string[];
}

export type LogLevel = "silent" | "normal" | "verbose";
