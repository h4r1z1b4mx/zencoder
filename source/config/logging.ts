import { LogLevel } from "../types/config.js"


let currentLogLevel: LogLevel = 'normal';

export function shouldLog(level: 'info' | 'warn' | 'error' | 'debug') : boolean {

	// In silent mode only show error
	if (currentLogLevel === 'silent'){
		return level === 'error';
	}
	// In normal mode show error and warn not debug
	if (currentLogLevel === 'normal') {
		return level === 'error' || level === 'warn';
	}

	return true;
}
