import { resolve } from "path";
import { ToolDefinition, ToolHandler } from "../types/core.js";
import { read, readFile } from "fs";
import React, { memo, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../hooks/useTheme.js";
import { Box, Text } from "ink";


const handler: ToolHandler = async (args: {path: string}): Promise<string> => {
	const absPath = resolve(args.path);
	try {
		const content = await readFile(absPath, 'utf-8');

		if (content.length === 0) {
			throw new Error(`File "${args.path}" exists but is empty (0 tokens)`);
		}

		const lines = content.split('\n');

		let result ='';

		for (let i = 0; i < lines.length; i++) {
			const lineNum = String(i+1).padStart(4, ' ');
			result += `${lineNum}: ${lines[i]}\n`;
		}

		return result.slice(0,-1);

	} catch (error:any) {
		if (error.code === 'ENOENT'){
			throw new Error(`File "${args.path}" does not exist`);
		}
		throw error;
	}
}


const ReadFileFormatter = memo(({args} : {args:any}) => {
	const {colors} = useContext(ThemeContext);
	const path = args.path || args.file_path || 'unknown';
	const [fileInfo, setFileInfo] = useState({size:0, tokens: 0});

	useEffect( () => {
		const loadFileInfo = async () => {
			try {
				const content = await readFile(resolve(path), 'utf-8');
				const fileSize = content.length;
				const estimatedTokens = Math.ceil(fileSize / 4);
				setFileInfo({size: fileSize, tokens:estimatedTokens});
			} catch (error) {
				setFileInfo({size:0, tokens:0});
			}
		}

		loadFileInfo();
	}, [path]);

	const messageContent = (
		<Box flexDirection="column">
			<Text color={colors.tool}>⚒ read_file</Text>
			<Box>
				<Text color={colors.secondary}>⚒ read_file</Text>
				<Text color={colors.white}>⚒ read_file</Text>
			</Box>
			<Box>
				<Text color={colors.secondary}>Size: </Text>
				<Text>
					{fileInfo.size} characters (~{fileInfo.tokens} tokens)
				</Text>
			</Box>

			{ (args.offset || args.limit) && (
				<Box marginTop={1}>
					<Text color={colors.secondary}>Range: </Text>
					<Text color={colors.primary}>
						{args.offset && `from line ${args.offset}`}
						{args.limit && `(${args.limit} lines)`}
					</Text>
				</Box>
			)}
		</Box>
	);


	return 

});


const formatter = async(args: any): Promise<React.ReactElement> => {
	return
}


export const readFileTool: ToolDefinition = {
}
