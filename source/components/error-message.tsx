import { memo } from "react";
import {TitledBox, titleStyles} from '@mishieck/ink-titled-box';
import { useTerminalWidth } from "../hooks/useTerminalWidth.js";
import { useTheme } from "../hooks/useTheme.js";
import {Box, Text} from 'ink'


export default memo(function ErrorMessage(
	{
		message,
		hideTitle = false,
		hideBox = false
	}:{
		message:string,
		hideTitle?:boolean,
		hideBox?:boolean
	}
){

	const boxWidth = useTerminalWidth();
	const {colors} = useTheme();
	return (
		<>
			{ hideBox ?(
				<Box width={boxWidth} flexDirection="column" marginBottom={1}>
					<Text color={colors.error}>{message}</Text>
				</Box>
			): hideTitle?(
				<Box
					borderStyle="round"
					width={boxWidth}
					borderColor={colors.error}
					paddingX={2}
					paddingY={0}
					flexDirection="column"
				>
					<Text color={colors.error}>{message}</Text>
				</Box>
			):(
				<TitledBox
					key={colors.primary}
					borderStyle="round"
					titles={['Error']}
					titleStyles={titleStyles.pill}
					width={boxWidth}
					borderColor={colors.error}
					paddingX={2}
					paddingY={1}
					flexDirection="column"
				>
					<Text color={colors.error}> {message}</Text>
				</TitledBox>
			)}
		</>
	);
});
