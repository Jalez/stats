/** @format */

import ProgressBar from './ProgressBar';
import StudentStats from './StudentStats';
import useStore from '../zustand/store';
import ScoreChart from './ScoreChart';
import HighScores from './HighScores';
import 'react-loading-skeleton/dist/skeleton.css'
import MainHeading from './MainHeading';
import FlexContainer from '../StyledComponents/FlexContainer';
import FlexColumn from '../StyledComponents/FlexColumn';

import PassedLevels from './PassedLevels';



const StudentBoard = () => {
	const {
		your_best_submission,
		all_submissions,
		lower_is_better,
	} = useStore((state) => state);

	let all_scores = all_submissions?.map((submission) => submission.points);
	if (lower_is_better) {
		all_scores = all_scores?.sort((a, b) => a - b) || [];
	} else {
		all_scores = all_scores?.sort((a, b) => b - a) || [];
	}

	const seenHighScores = localStorage.getItem('seenHighScores');


	return (
		<>
			<MainHeading
			>
				Available Statistics
			</MainHeading>
			<FlexContainer>
				{
					your_best_submission?.points && your_best_submission.points > 0 &&

					<FlexColumn flex={1}>
						<ProgressBar />
						<PassedLevels/>

					</FlexColumn>
				}
				<FlexColumn flex={3}>
					<StudentStats />
					<ScoreChart />
				</FlexColumn>
				{your_best_submission?.points && all_scores && all_scores?.length > 50 && ((all_scores.indexOf(your_best_submission.points) < 50 && all_scores.indexOf(your_best_submission.points) != -1 )|| seenHighScores) && (
					<FlexColumn
						flex={1}
					>
						<HighScores />
					</FlexColumn>
				)}
			</FlexContainer>
		</>
	)
};

export default StudentBoard;
