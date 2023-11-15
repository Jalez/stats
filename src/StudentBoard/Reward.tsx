/** @format */

import ShadowedContainer from '../StyledComponents/ShadowedContainer';
import useStore from '../zustand/store';

const Reward = () => {
	const { your_best_submission, levels, ranges } = useStore((state) => state);
	if(!ranges) return "No ranges found";
	if (!your_best_submission) return 'No submission found';
	const your_best_score = your_best_submission?.points;
	// find the level where the range contains the student score
	let levelDetails;
	let rangeDetails;
	for (const iterator of ranges) {
		if (
			iterator.lower_limit <= your_best_score &&
			iterator.upper_limit >= your_best_score
		) {
			levelDetails = levels[iterator.id];
			rangeDetails = iterator;

			break;
		}
	}

	if (!levelDetails) return 'No level details found';
	if (!rangeDetails) return 'No range details found';

	const rewardPoints: number = 250 *(rangeDetails.percentage/100) ;

	return (
		<ShadowedContainer>
			<h2>Reward</h2>
			<p>Here is the predicted reward for your score of {your_best_score}:</p>
			{/* if img exists in the reward Object, print as many of the images as the amount points out */}
			<p>
				{rewardPoints} points
			</p>
		</ShadowedContainer>
	);
};

export default Reward;
