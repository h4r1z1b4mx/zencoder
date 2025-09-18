import { useTerminalWidth } from "../app/hooks/useTerminalWidth.js";

export default memo(function ErrorMessage({
	message,
	hideTitle = false,
	hideBox = false,
}: {
	message:string;
	hideTitle?:boolean;
	hideBox?: boolean;
}) {
	const boxWidth = useTerminalWidth();
	
})
