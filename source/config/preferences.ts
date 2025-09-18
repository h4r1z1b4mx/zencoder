import { existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import  type { UserPreferences } from "../types/config.js";


const PREFERENCES_PATH = join(homedir(), ".microcoder-preferences.json")

export function loadPreferences(): UserPreferences {
	if (existsSync(PREFERENCES_PATH)){
		try{

		} catch(error){
			if(shouldLog("warn")){
				
			}
		}
	}
	return {}
}
