import { ToolDefinition, ToolHandler } from "../types/core.js";




export const toolDefinitions: ToolDefinition[] = [
	readFileTool, 
];


export const toolRegistry: Record<string, ToolHandler> = Object.fromEntries(

);
