/** @format */

import ShadowedContainer from './ShadowedContainer';
import { range } from './types';

interface StudentStatsProps {
	your_best_score: number;
	rangeDetails?: range;
}

const StudentStats: React.FC<StudentStatsProps> = ({
	your_best_score,
	rangeDetails,
}) => {

	return (
		<ShadowedContainer>
			<h2>General</h2>
			<p>Best Score: {your_best_score == 0 ? "N/A": your_best_score}</p>
			<p>Level: {rangeDetails?.id || "N/A"}</p>
			<p>
				Reward:{' '}
					{rangeDetails && <strong>{(rangeDetails.percentage/100) * 250 + " points"}</strong> || "N/A"}
			</p>
		</ShadowedContainer>
	);
};

export default StudentStats;
