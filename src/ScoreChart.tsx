/** @format */
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import useStore, { StoreState } from './zustand/store';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);
import { Level } from './types';
import ShadowedContainer from './ShadowedContainer';

const ScoreChart: React.FC = () => {
	const { all_scores, levels } = useStore((state: StoreState) => state);
	const [data, setData] = useState(processData(levels, all_scores));

	useEffect(() => {
		setData(processData(levels, all_scores));
	}, [levels, all_scores]);

	function processData(levels: Record<number, Level>, all_scores: number[]) {
		const labels: string[] = [];
		const data: number[] = [];

		for (const key in levels) {
			const level = levels[key];
			const count = all_scores.filter(
				(score) => score >= level.range[0] && score <= level.range[1]
			).length;

			labels.push(key);
			data.push(count);
		}

		return {
			labels: labels,
			datasets: [
				{
					label: 'Level 1 - Range 0-2',
					data: data,
					backgroundColor: [
						'#FF6384',
						'#36A2EB',
						'#FFCE56',
						'#4BC0C0',
						'#9966FF',
						'#FF9F40',
					],
				},
			],
			// Since data shows the number of scores in each level, it is always a whole number, so we can set the step size to 1 and remove the decimals from the y axis
			options: {
				scales: {
					y: {
						ticks: {
							stepSize: 1,
							callback: function (value: number) {
								if (value % 1 === 0) {
									return value;
								}
							},
						},
					},
				},
			},
		};
	}

	return (
		<ShadowedContainer>
			<h2>Number of scores in each level</h2>
			<Bar
				// change size of chart
				data={data}
			/>
		</ShadowedContainer>
	);
};

export default ScoreChart;
