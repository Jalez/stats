/** @format */

import ShadowedContainer from './ShadowedContainer';
import { Level } from './types';

interface StudentStatsProps {
	your_best_score: number;
	levelDetails?: Level;
}

const StudentStats: React.FC<StudentStatsProps> = ({
	your_best_score,
	levelDetails
}) => {

	return (
		<ShadowedContainer>
			<h2>General</h2>
			<p>Best Score: {your_best_score == 0 ? "N/A": your_best_score}</p>
			<p>Level: {levelDetails?.level || "N/A"}</p>
			<p>
				Reward:{' '}
					{levelDetails && <strong>{(levelDetails.percentage/100) * 250 + " points"}</strong> || "N/A"}
			</p>
		</ShadowedContainer>
	);
};

export default StudentStats;
