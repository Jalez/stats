/** @format */

// Show the 5 best scores

import ShadowedContainer from './ShadowedContainer';
import useStore from './zustand/store';

import crown from './assets/crown.svg';

const HighScores = () => {
	const { all_scores, your_best_score } = useStore((state) => state);

	const sortedScores = all_scores.sort((a, b) => b - a);

	const yourPosition = sortedScores.indexOf(your_best_score) + 1;

	return (
		<ShadowedContainer>
			<img src={crown} alt='crown' width={30} />
			<h2>High Scores</h2>
			<p>Your best score: {your_best_score}</p>
			<p>Position: {yourPosition}</p>

			{/* Create a striped table of them */}
			<table
				className='table table-striped table-hover table-sm text-center table-responsive'
				style={{
					marginLeft: 'auto',
					marginRight: 'auto',
				}}>
				<thead>
					<tr>
						<th>Rank</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					{sortedScores.slice(0, 5).map((score, index) => {
						return (
							<tr key={index}>
								<td
									style={{
										// bolden if it's your score
										fontWeight: score === your_best_score ? 'bold' : 'normal',
										// Make bigger if it's your score
										fontSize: score === your_best_score ? '1.3rem' : '1rem',
									}}>
									{index + 1}
								</td>
								<td
									style={{
										// bolden if it's your score
										fontWeight: score === your_best_score ? 'bold' : 'normal',
										// Make bigger if it's your score
										fontSize: score === your_best_score ? '1.3rem' : '1rem',
									}}>
									{score}
								</td>
							</tr>
						);
					})}
					{/* Add a ... at this point to mark it cuts off */}
					<tr>
						<td>...</td>
						<td>...</td>
					</tr>
					{/* If his position is over 6, show it at this point */}
					{yourPosition > 6 && (
						<tr>
							<td
								style={{
									// bolden if it's your score
									fontWeight: 'bold',
									// Make bigger if it's your score
									fontSize: '1.3rem',
								}}>
								{yourPosition}
							</td>
							<td
								style={{
									// bolden if it's your score
									fontWeight: 'bold',
									// Make bigger if it's your score
									fontSize: '1.3rem',
								}}>
								{your_best_score}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</ShadowedContainer>
	);
};

export default HighScores;
