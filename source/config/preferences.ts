import { existsSync } from "fs";
import { homedir } from "os";
import { join } from "path";
import { shouldLog } from "./logging";

const PREFERENCES_PATH = join(homedir(), ".zencoder-preferences.json");

export function loadPreferences() {
	if (existsSync(PREFERENCES_PATH)) {
		try {

		} catch (error) {
			if (shouldLog) {

			}
		}
	}
	return {};
}
