import { MCPClient } from "../mcp/mcp-client.js";
import { MCPToolAdapter } from "../mcp/mcp-tool-adapter.js";
import { Tool, ToolHandler } from "../types/core.js";



export class ToolManager {
	private mcpClient: MCPClient | null = null;
	private mcpAdapter: MCPToolAdapter | null = null;
	private toolRegistry: Record<string, ToolHandler> = {};
	private toolFormatters: Record<string, (args: any) => string | Promise<string> | React.ReactElement | Promise<React.ReactElement>> = {};
	private allTools: Tool[] = [];

	constructor () {
		this.toolRegistry = {};
	}

}
