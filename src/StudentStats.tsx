/** @format */

import ShadowedContainer from './ShadowedContainer';
import { Level } from './types';

interface StudentStatsProps {
	your_best_score: number;
	levelDetails?: Level;
}

const StudentStats: React.FC<StudentStatsProps> = ({
	your_best_score,
	levelDetails,
}) => {
	return (
		<ShadowedContainer>
			<h2>General</h2>
			<p>Best Score: {your_best_score}</p>
			<p>Level: 1</p>
			<p>
				Reward:{' '}
				<strong>
					{levelDetails &&
						levelDetails.reward.amount * levelDetails.reward.points}{' '}
					points
				</strong>
			</p>
		</ShadowedContainer>
	);
};

export default StudentStats;
