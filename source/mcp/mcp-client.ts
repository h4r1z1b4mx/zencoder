import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';
import {MCPServer, MCPTool, MCPInitResult} from '../types/mcp.js'
import { shouldLog } from '../config/logging.js';
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

	}



}
