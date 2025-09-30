import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';
import {MCPServer, MCPTool, MCPInitResult} from '../types/mcp.js'
import { shouldLog } from '../config/logging.js';
import { Tool } from '../types/core.js';
import { logError, logInfo } from '../utils/message-queue.js';
export class MCPClient {
	private clients: Map<string, Client> = new Map();
	private transports: Map<string, StdioClientTransport> = new Map();
	private serverTools: Map<string, MCPTool[]> = new Map();
	private isConnected: boolean = false;

	constructor(){}

	async connectToServer(server: MCPServer): Promise<void> {
		try {
			// Create transport for the server
			// When not in verbose mode, suppress stderr output from MCP servers
			const transport = new StdioClientTransport({
				command: server.command,
				args: server.args || [],
				env : {
					...server.env,
					// Set log level environment variables that many servers respect
					LOG_LEVEL: shouldLog('debug') ? 'DEBUG' : 'ERROR',
					DEBUG: shouldLog('debug') ? '1' : '0',
					VERBOSE: shouldLog('debug') ? '1' : '0',
				},
				stderr: shouldLog('debug') ? 'inherit' : 'ignore'
			});

			const client = new Client({
				name:'zencoder-mcp-client',
				version:'1.0.0',
			});

			await client.connect(transport);

			//Store client and transport
			this.clients.set(server.name, client);
			this.transports.set(server.name, transport);

			//List available tools from this server
			const toolsResult = await client.listTools();
			const tools:MCPTool[] = toolsResult.tools.map(tool => ({
				name: tool.name,
				description: tool.description || undefined,
				inputSchema: tool.inputSchema,
				serverName: server.name,
			}));

			this.serverTools.set(server.name, tools)

		} catch(error) {
			throw error;
		}
	}

	async connectToServers (servers: MCPServer[], onProgress?: (result: MCPInitResult) => void) : Promise<MCPInitResult[]> {
		const results: MCPInitResult[] = [];

		const connectionPromises = servers.map(async (server) => {
			try {
				await this.connectToServer(server);
				const tools = this.serverTools.get(server.name) || [];
				const result: MCPInitResult = {
					serverName: server.name,
					success: true,
					toolCount: tools.length,
				};
				results.push(result);
				onProgress?.(result);
				return result;
			} catch (error) {
				const result: MCPInitResult = {
					serverName: server.name,
					success:false,
					error: error instanceof Error ? error.message : String(error),
				};

				results.push(result);
				onProgress?.(result);
				return result;
			}
		});

		await Promise.all(connectionPromises);

		this.isConnected = true;
		return results;
	}

	getAllTools(): Tool[] {
		const tools: Tool[] = [];

		for (const [serverName, serverTools] of this.serverTools.entries()) {
			for (const mcpTool of serverTools) {
				const tool: Tool = {
					type:'function',
					function: {
						name: mcpTool.name,
						description: mcpTool.description ? `[MCP: ${serverName}] ${mcpTool.description}` : `MCP tool from ${serverName}`,
						parameters: mcpTool.inputSchema || {
							type:'object',
							properties: {},
							required: [],
						},
					},
				};
				tools.push(tool);
			}
		}
		return tools;
	}

	getToolMapping(): Map<string, {serverName: string; originalName: string}> {
		const mapping = new Map<string, {serverName: string; originalName: string}>();

		for (const [serverName, serverTools] of this.serverTools.entries()) {
			for (const mcpTool of serverTools) {
				mapping.set(mcpTool.name, {
					serverName,
					originalName: mcpTool.name,
				});
			}
		}

		return mapping;
	}

	async callTool (toolName: string, args: Record<string, any>) : Promise<string>{
		// Here to find which server has a tool
		const toolMapping = this.getToolMapping();
		const mapping = toolMapping.get(toolName);

		if (!mapping) {
			const parts = toolName.split('_');
			if (parts.length >= 3 && parts[0] === 'mcp' && parts[1]) {
				const serverName = parts[1];
				const originalToolName = parts.slice(2).join('_');
				const client = this.clients.get(serverName);
				if (client) {
					return this.executeToolCall(client, originalToolName, args);
				}
			}
			throw new Error(`MCP tool not found: ${toolName}`);
		}

		const client = this.clients.get(mapping.serverName);
		if (!client) {
			throw new Error(
				`No MCP client connected for server: ${mapping.serverName}`
			);
		}

		return this.executeToolCall(client, mapping.originalName, args);

	}


	private async executeToolCall(
		client : Client,
		toolName: string,
		args: Record<string, any>,
	):Promise<string>{
		try {

			const result = await client.callTool({
				name: toolName,
				arguments: args,
			});

			if (result.content && Array.isArray(result.content) && result.content.length > 0) {
				const content = result.content[0];
				if (content.type === 'text') {
					return content.text || '';
				}else {
					return JSON.stringify(content);
				}
			}
			return 'Tool executed successfully (no output)';
		} catch(error) {
			throw new Error(`MCP tool execution failed: ${error}`);
		}
	}

	async disconnect(): Promise<void> {
		for (const [serverName, client] of this.clients.entries()) {
			try {
				await client.close();
				logInfo(`Disconnected from MCP server: ${serverName}`);
			}catch(error) {
				logError(`Error disconnecting from ${serverName}: ${error}`);
			}
		}

		this.clients.clear();
		this.transports.clear();
		this.serverTools.clear();
		this.isConnected = false;
	}

	getConnectedServers(): string[] {
		return Array.from(this.clients.keys());
	}

	isServerConnected(serverName: string):boolean{
		return this.clients.has(serverName);
	}

	getServerTools(serverName: string):MCPTool[]{
		return this.serverTools.get(serverName) || [];
	}

}
