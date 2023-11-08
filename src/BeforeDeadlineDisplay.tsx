/** @format */

import ShadowedContainer from './ShadowedContainer';
import { Level } from './types';

interface BeforeDeadlineDisplayProps {
	exercise_deadline: string;
	your_best_score: number;
	all_scores: number[];
	levels: Record<number, Level>;
}

const BeforeDeadlineDisplay: React.FC<BeforeDeadlineDisplayProps> = ({
	exercise_deadline,
	your_best_score,
	all_scores,
	levels,
}) => {
	const estimatedPosition = (
		your_best_score: number,
		all_scores: number[],
		levels: Record<number, Level>
	) => {
		// Figure out the level where the current range contains the student score
		const levelsCount = Object.keys(levels).length;
		if (all_scores.length < levelsCount)
			return 'There are too few scores from other students to give even a rough estimate on how well you did at this time.';

		// find out where the student score is in all scores
		const sortedScores = all_scores.sort((a: number, b: number) => b - a);
		const indexOfStudentScore = sortedScores.indexOf(your_best_score);
		// use that index to find the student's position compared to other students in the class
		const position = indexOfStudentScore + 1;
		return `Right now we can only say that your best score is better than ${(
			(position / all_scores.length) *
			100
		).toFixed(
			0
		)}% of the best scores recorded. Keep in mind that this is only an estimate, and that the actual position will be determined when the deadline passes. `;
		// return `Right now we can only give a rough estimate of your position`
	};
	return (
		<ShadowedContainer>
			{' '}
			<p>
				Data is still being gathered to determine exact point values (gathering
				will stop at <strong>{exercise_deadline.toLocaleString()}</strong>).{' '}
				{estimatedPosition(your_best_score, all_scores, levels)}
			</p>
		</ShadowedContainer>
	);
};

export default BeforeDeadlineDisplay;
