export interface MCPServer{
	name: string;
	command: string;
	args?: string[];
	env?: Record<string, string>;
}

export interface MCPTool {
	name: string;
	description?:string;
	inputSchema?: any;
	serverName: string;
}

export interface MCPInitResult {
	serverName: string;
	success: boolean;
	toolCount?:number;
	error?: string;
}
