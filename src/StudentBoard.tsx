/** @format */

import ProgressBar from './ProgressBar';
import StudentStats from './StudentStats';
import useStore from './zustand/store';
import background from './assets/background.webp';

import ScoreChart from './ScoreChart';
import BeforeDeadlineDisplay from './BeforeDeadlineDisplay';

const StudentBoard = () => {
	const {
		levels,
		your_best_submission,
		all_submissions,
		exercise,
		your_range_details
	} = useStore((state) => state);

	const exercise_deadline = exercise.deadline; 
	const assignment_name = exercise.id

	const all_scores = all_submissions.map((submission) => submission.points);

	// find the level where the range contains the student score

	
	const exerciseDeadlinePassed = (exercise_deadline: string) => {
		const deadline = new Date(exercise_deadline);
		const now = new Date();
		return now > deadline;
	};

	return (
		<div
			// className='container'
			style={{
				// width: '100%',
				height: 'fit-content',
				margin: '1rem',
				padding: '1rem',
				borderRadius: '1rem',
				backgroundImage: `url(${background})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				boxShadow: '0 0 10px rgba(0,0,0,0.5)',
			}}>
			<h1
				style={{
					backdropFilter: 'blur(2px)',
					// opacity: 0.9,
					display: 'inline-block',
					// color: 'white',
				}}>
				{' '}
				{assignment_name} - Dashboard
			</h1>

			{(!exerciseDeadlinePassed(exercise_deadline) && (
				<BeforeDeadlineDisplay
					exercise_deadline={exercise_deadline}
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
						{/* <div
							style={{
								display: 'flex',
								flexDirection: 'column',
								flex: 2,
							}}>
							<HighScores />
						</div> */}

						<ScoreChart />
					</div>
				</>
			)}
		</div>
	);
};

export default StudentBoard;
