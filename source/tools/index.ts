import { ToolDefinition, ToolHandler } from "../types/core.js";
import { readFileTool } from "./read-file.js";




export const toolDefinitions: ToolDefinition[] = [
	readFileTool,
	createFileTool,
	
];


export const toolRegistry: Record<string, ToolHandler> = Object.fromEntries(

);
