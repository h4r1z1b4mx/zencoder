import { useEffect, useState } from "react";


export const useTerminalWidth = () => {
	// Calculate box with (leave some padding and ensure minimum width)
	const calculateBoxWidth = (columns: number) => {
		Math.max(Math.min(columns - 4, 120), 40)
	}

	const [boxWidth, setBoxWidth] = useState(() => {
		calculateBoxWidth(process.stdout.columns || 80)
	});

	useEffect( () => {
		const handleResize = () => {
			const newWidth = calculateBoxWidth(process.stdout.columns || 80);
			// Only update if width actually changed
			setBoxWidth(prevWidth => prevWidth !== newWidth ? newWidth : prevWidth);
		};

		// Listen for terminal resize events
		process.stdout.on('resize', handleResize);

		return () => {
			process.stdout.off('resize', handleResize);
		}

	}, []);

	return boxWidth;

};
