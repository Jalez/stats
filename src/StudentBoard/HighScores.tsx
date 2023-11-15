/** @format */

// Show the 5 best scores

import ShadowedContainer from '../StyledComponents/ShadowedContainer';
import useStore from '../zustand/store';

import crown from '../assets/crown.svg';

const HighScores = () => {
	const { all_submissions, your_best_submission, lower_is_better  } = useStore((state) => state);
	if(!all_submissions) return "No submissions found with the given exercise id.";
	if(!your_best_submission) return "No submission found, please submit your solution to see your position";
	
	if(!all_submissions || !your_best_submission) return null;
	const all_points = all_submissions?.map((submission) => submission.points);
	const sortedScores = all_points?.sort((a, b) => lower_is_better ? a - b : b - a);
	const yourPosition = sortedScores.indexOf(your_best_submission?.points) + 1;
	// The moment the student sees highscores for the first time, add a cookie that will remember that he has seen it
	const seenHighScores = localStorage.getItem('seenHighScores');
	if (!seenHighScores) {
		localStorage.setItem('seenHighScores', 'true');
	}

	return (
		<ShadowedContainer>
			<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				textAlign: 'center',
			}}
			>

			<img src={crown} alt='crown' width={30} />
			<h2>High Scores</h2>
			<p>Your best score: {your_best_submission.points}</p>
			<p>Position: {yourPosition}</p>

			</div>
			{/* Create a striped table of them */}
			<table
				className='table table-striped table-hover text-center'
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
										fontWeight: score === your_best_submission.points ? 'bold' : 'normal',
										// Make bigger if it's your score
										fontSize: score === your_best_submission.points ? '1.3rem' : '1rem',
									}}>
									{index + 1}
								</td>
								<td
									style={{
										// bolden if it's your score
										fontWeight: score === your_best_submission.points ? 'bold' : 'normal',
										// Make bigger if it's your score
										fontSize: score === your_best_submission.points ? '1.3rem' : '1rem',
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
									fontWeight: 'bold',
									fontSize: '1.3rem',
								}}>
								{yourPosition}
							</td>
							<td
								style={{
									fontWeight: 'bold',
									fontSize: '1.3rem',
								}}>
								{your_best_submission.points}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</ShadowedContainer>
	);
};

export default HighScores;
