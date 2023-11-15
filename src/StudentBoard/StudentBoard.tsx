/** @format */

import ProgressBar from './ProgressBar';
import StudentStats from './StudentStats';
import useStore from '../zustand/store';
// import background from './assets/background.webp';

import ScoreChart from './ScoreChart';
import HighScores from './HighScores';
import 'react-loading-skeleton/dist/skeleton.css'
import MainHeading from './MainHeading';
import FlexContainer from '../StyledComponents/FlexContainer';
import FlexColumn from '../StyledComponents/FlexColumn';



const StudentBoard = () => {
	const {
		your_best_submission,
		all_submissions,
		lower_is_better,
	} = useStore((state) => state);

	// if (!exercise) {
	// 	if (viewer_type === 'teacher') return <ErrorMessage>No exercise found, please select an exercise to see student statistics</ErrorMessage>
	// 	return <ErrorMessage>Invalid entrance to see the statistics. Please enter through https://plus.tuni.fi/{"<COURSE_ID>"}/{"<COURSE_IMPLEMENTATION>"} LTI-service (course sidebar)</ErrorMessage>
	// }

	// if (!all_submissions) return "No submissions found with the given exercise id.";
	let all_scores = all_submissions?.map((submission) => submission.points);
	// arrange all scores depending on whether lower is better or not
	if (lower_is_better) {
		all_scores = all_scores?.sort((a, b) => a - b) || [];
	} else {
		all_scores = all_scores?.sort((a, b) => b - a) || [];
	}



	// const exerciseDeadlinePassed = (exercise_deadline: string) => {
	// 	const deadline = new Date(exercise_deadline);
	// 	const now = new Date();
	// 	return now > deadline;
	// };

	const seenHighScores = localStorage.getItem('seenHighScores');


	return (
		<>
			<MainHeading
			>
				Available Statistics
			</MainHeading>
			{/* <GradientContainer
				color1={your_level_details?.colors[0] || 'white'}
				color2={your_level_details?.colors[1] || '#222'}
			> */}
			<FlexContainer>
				<FlexColumn flex={1}>
					<StudentStats />
					<ProgressBar />

				</FlexColumn>
				<FlexColumn flex={3}>



					<ScoreChart />

				</FlexColumn>
				{your_best_submission?.points && all_scores && all_scores?.length > 50 && (all_scores.indexOf(your_best_submission.points) < 50 || seenHighScores) && (
					<FlexColumn
						flex={1}
					>
						<HighScores />
					</FlexColumn>
				)}
			</FlexContainer>
			{/* </GradientContainer> */}
		</>
	)
};

export default StudentBoard;
