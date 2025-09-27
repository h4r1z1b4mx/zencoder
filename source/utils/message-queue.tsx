import { MessageType } from "../types/utils.js";

let globalAddToChatQueue: ((component: React.ReactNode) => void) | null = null;
let componentKeyCounter = 0;


// Helper function to generate stable keys
function getNextKey(): string {
	componentKeyCounter++;
	return `global-msg-${componentKeyCounter}`;
}


export function addMessageToQueue(type: MessageType, message: string, hideBox: boolean = true){
	if(!globalAddToChatQueue){
		// Fallback to console if queue not available
		console[type === 'error'? 'error':'log'](message);
		return
	}

	const key = getNextKey();
	let component: React.ReactNode;

	switch (type) {
		case 'error':
			component = (
				
			)
	}
}



export function logError(message: string, hideBox: boolean = true){
	addMessageToQueue('error', message, hideBox);
}
