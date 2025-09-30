import { ToolHandler } from "../types/core.js";
import { logError } from "../utils/message-queue.js";
import { MCPClient } from "./mcp-client.js";



export class MCPToolAdapter {
	private mcpClient: MCPClient;

	constructor(mcpClient: MCPClient) {
		this.mcpClient = mcpClient;
	}

	//It creates a tool handler for an mcp tool
	createToolHandler(toolName: string): ToolHandler {
		return async (args:any) => {
			try {
				const result = await this.mcpClient.callTool(toolName, args);
				return result;
			} catch (error) {
				return `Error executing MCP tool: ${error}`
			}
		}
	}

	// register all mcp tools to the tool registry
	registerMCPTools(toolRegistry: Record<string, ToolHandler>):void{
		const mcpTools = this.mcpClient.getAllTools();

		for (const tool of mcpTools) {
			const toolName = tool.function.name;
			// check conflicts with already existing tools
			if (toolRegistry[toolName]) {
				logError(`Warning: MCP tool "${toolName}" conflicts with existing tool. MCP tool will override.`);
			}
			toolRegistry[toolName] = this.createToolHandler(toolName);
		}

	}

	// unregister all mcp tools from the tool registry
	unregisterMCPTools(toolRegistry:Record<string, ToolHandler>):void {
		const mcpTools = this.mcpClient.getAllTools();

		for (const tool of mcpTools) {
			const toolName = tool.function.name;
			delete toolRegistry[toolName];
		}
	}

}
