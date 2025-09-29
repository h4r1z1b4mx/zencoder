import { existsSync, readFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";
import { shouldLog } from "./logging.js";
import { logError } from "../utils/message-queue.js";

const PREFERENCES_PATH = join(homedir(), ".zencoder-preferences.json");

export function loadPreferences(){
	if (existsSync(PREFERENCES_PATH)) {
		try {
			const data = readFileSync(PREFERENCES_PATH, 'utf-8');
			return JSON.parse(data);
		} catch (error) {
			if (shouldLog('warn')) {
				logError(`Failed to load preferences: ${error}`);
			}
		}
	}
	return {};
}
