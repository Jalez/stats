/** @format */

import ProgressBar from './ProgressBar';
import StudentStats from './StudentStats';
import useStore from './zustand/store';
// import background from './assets/background.webp';

import ScoreChart from './ScoreChart';
import BeforeDeadlineDisplay from './BeforeDeadlineDisplay';
import HighScores from './HighScores';

const StudentBoard = () => {
	const {
		levels,
		your_best_submission,
		all_submissions,
		exercise,
		your_range_details,
		lower_is_better,
	} = useStore((state) => state);

	if(!exercise) return "No exercise found, please select an exercise to see student statistics";
	const exercise_deadline = exercise.deadline;

	if(!all_submissions) return "No submissions found with the given exercise id.";
	let all_scores = all_submissions.map((submission) => submission.points);
	// arrange all scores depending on whether lower is better or not
	if (lower_is_better) {
		all_scores = all_scores.sort((a, b) => a - b);
	} else {
		all_scores = all_scores.sort((a, b) => b - a);
	}

	// find the level where the range contains the student score


	const exerciseDeadlinePassed = (exercise_deadline: string) => {
		const deadline = new Date(exercise_deadline);
		const now = new Date();
		return now > deadline;
	};

	return (
		<div>
		<h1
				style={{
					backdropFilter: 'blur(2px)',
					display: 'inline-block',
					textAlign: 'center',
					margin: '0 auto',
					width: '100%',
					fontWeight: 'bold',
				}}>
				{' '}
				Available Statistics for assignment {exercise.id}
			</h1>
		<div
			style={{
				height: 'fit-content',
				margin: '1rem',
				padding: '1rem',
				borderRadius: '1rem',
				background: `linear-gradient(45deg, ${levels[your_range_details?.id || 0]?.colors[0] || "white"} 30%, ${levels[your_range_details?.id || 0]?.colors[1] || "#222"
				} 90%)`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				boxShadow: '0 0 10px rgba(0,0,0,0.5)',
			}}>
			

			{(!exerciseDeadlinePassed(exercise_deadline)
				// {(true
				&& (
					<BeforeDeadlineDisplay
						exercise_deadline={exercise_deadline}
						lower_is_better={lower_is_better}
						your_best_score={your_best_submission?.points || 0}
						all_scores={all_scores}
						levels={levels}
					/>
				)) || (
					<>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								height: 'fit-content',
								width: '100%',
							}}>
							<div
								style={{
									display: 'flex',
									flex: 1,
									flexDirection: 'column', // maintain
									columnWidth: '100%',
									height: 'fit-content',
									columnCount: 2, // number of columns
									columnGap: '1rem', // space between columns
								}}>
								<StudentStats
									your_best_score={your_best_submission?.points || 0}
									rangeDetails={your_range_details || undefined}
								/>
								<ProgressBar />
							</div>
							{/* <div
					style={{
						display: 'flex',
						flexDirection: 'column',
						flex: 1,
					}}>
					<ScoreHistory />
					<Reward />
				</div> */}

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									flex: 2,
								}}
								>

								<ScoreChart />
							</div>
								{your_best_submission?.points && all_scores && all_scores.length > 50 && all_scores.indexOf(your_best_submission.points) < 50 && (
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											flex: 0.5,
										}}>
										<HighScores />
									</div>
								)}
						</div>
					</>
				)}
		</div>
		</div>
	);
};

export default StudentBoard;
