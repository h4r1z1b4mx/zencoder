import { memo } from "react";
import { useTerminalWidth } from "../hooks/useTerminalWidth.js";
import { useTheme } from "../hooks/useTheme.js";
import { Box, Text } from "ink";
import {TitledBox, titleStyles} from '@mishieck/ink-titled-box';



export default memo(function ToolMessage({
	title,
	message,
	hideTitle = false,
	hideBox = false,
	isBashMode = false,
} : {
	title?: string;
	message: string | React.ReactNode;
	hideTitle?:boolean;
	hideBox?:boolean;
	isBashMode?:boolean;
}){
	const boxWidth = useTerminalWidth();
	const {colors} = useTheme();

	const messageContent = typeof message === 'string' ? (<Text color={colors.white}>{message}</Text>):(message);

	const borderColor = colors.tool;
	const borderStyle = 'round';

	return (
		<>
			{hideBox ? (
				<Box width={boxWidth} flexDirection="column" marginBottom={1}>
					{isBashMode && (
						<Text color={colors.tool} bold>
							Bash Command Output
						</Text>
					)}
					{messageContent}
					{isBashMode && (
						<Text color={colors.secondary} dimColor>
							Output truncated to 4k characters to save context
						</Text>
					)}
				</Box>
			) : hideTitle ? (
				<Box
					borderStyle={borderStyle}
					width={boxWidth}
					borderColor={borderColor}
					paddingX={2}
					paddingY={0}
					flexDirection="column"
				>
					{messageContent}
					{isBashMode && (
						<Text color={colors.white} dimColor>
							Output truncated to 4k characters to save context
						</Text>
					)}
				</Box>
			) : (
				<TitledBox
					key={colors.primary}
					borderStyle={borderStyle}
					titles={[title || 'Tool Message']}
					titleStyles={titleStyles.pill}
					width={boxWidth}
					borderColor={borderColor}
					paddingX={2}
					paddingY={1}
					flexDirection="column"
					marginBottom={1}
				>
					{messageContent}
					{isBashMode && (
						<Text color={colors.tool} dimColor>
							Output truncated to 4k characters to save context
						</Text>
					)}
				</TitledBox>
			)}
		</>
	);

});
