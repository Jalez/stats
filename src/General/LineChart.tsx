/** @format */

import React from 'react';
import { Line } from 'react-chartjs-2';

interface LineChartProps {
	data: number[];
	label: string;
	xLabels?: unknown[];
}

const LineChart: React.FC<LineChartProps> = ({ data, label, xLabels }) => {
	const chartData = {
		labels: xLabels || data.map((_, i) => i),
		datasets: [
			{
				label: label,
				data: data,
				borderColor: '#007BFF', // color of the line
				backgroundColor: 'rgba(0,123,255,0.5)', // fill color under the line
				fill: true,
				// give x axis labels
			},
		],
	};

	return <Line data={chartData} />;
};

export default LineChart;
