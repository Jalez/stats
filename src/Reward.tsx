/** @format */

import ShadowedContainer from './ShadowedContainer';
import { reward } from './types';
import useStore from './zustand/store';

const Reward = () => {
	const { your_best_score, levels } = useStore((state) => state);

	// find the level where the range contains the student score
	let levelDetails;

	let levelKey = 0;
	for (const [key, value] of Object.entries(levels)) {
		if (
			value.range[0] <= your_best_score &&
			value.range[1] >= your_best_score
		) {
			levelDetails = value;
			levelKey = Number(key);

			break;
		}
	}

	if (!levelDetails) return 'No level details found';

	const rewardObject: reward = levelDetails.reward;

	return (
		<ShadowedContainer>
			<h2>Reward</h2>
			<p>Here is the predicted reward for your score of {your_best_score}:</p>
			{/* if img exists in the reward Object, print as many of the images as the amount points out */}
			{(rewardObject?.img && (
				<>
					{[...Array(rewardObject.amount)].map((_, i) => (
						<img
							key={i}
							src={rewardObject.img}
							alt='reward'
							style={{
								width: 'fit-content',

								// shift the image to the right on top of the other image
								position: 'absolute',

								// shift the image to the right

								left: `${8 - levelKey + i * 3}rem`,
								bottom: '1.5rem',
							}}
						/>
					))}
				</>
			)) || (
				/* Otherwise, print amount*points */
				<p>{rewardObject.amount * rewardObject.points} points</p>
			)}
		</ShadowedContainer>
	);
};

export default Reward;
