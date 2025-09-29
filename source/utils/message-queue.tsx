import { MessageType } from "../types/utils";
import ErrorMessage from '../components/error-message.js';
import SuccessMessage from '../components/success-message.js'
let globalAddToChatQueue : ((component: React.ReactNode) => void) |null = null;
let componentKeyCounter = 0;


// Helper function to generate a key
function getNextKey(): string {
	componentKeyCounter++;
	return `global-msg-queue-${componentKeyCounter}`
}

// Add message to chat queue
export function addMessageToQueue(type: MessageType, message: string, hideBox:boolean = true){
	if (!globalAddToChatQueue) {
		console[type==='error'?'error' :'log'](message);
		return;
	}

	const key = getNextKey();
	let component: React.ReactNode;

	switch (type) {
		case 'error':
			component = (
				<ErrorMessage
					key={key}
					message={message}
					hideBox={hideBox}
				/>
			);
			break;
		case 'success':
			component = (
				<SuccessMessage
					key={key}
					message={message}
					hideBox={hideBox}
				/>
			);
			break;
		case 'info':
		default:
			component = (

			);
		break;
	}

}


export function logError() {

}
