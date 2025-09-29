
export interface Message{
	role:"user" | "assistant" | "system" | "tool";
	content: string;
	tool_calls?:ToolCall[];
	tool_call_id?:string;
	name?:string;
}

export interface ToolCall {
	id:string;
	function: {
		name:string;
		arguments: {[key:string]: any}
	};
}

export interface Tool {
	type:"function";
	function: {
		name: string;
		description: string;
		parameters: {
			type:"object";
			properties: Record<string, any>;
			required: string[];
		};
	};
}

export interface LLMClient {
	getCurrentModel(): string;
	setModel(model:string): void;
	getContextSize(): number;
	getAvailableModels(): Promise<string[]>;
	chat(messages: Message[], tools: Tool[]):Promise<any>;
	chatStream(messages:Message[], tools:Tool[]):AsyncIterable<any>;
	clearContext(): Promise<void>;
}

export type ProviderType = "openrouter" |  "anthropic" | "google" | "openai-compatible" | "grok";
