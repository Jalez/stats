/** @format */

import './ProgressBar.css';

import styled, { keyframes } from 'styled-components';
import { HTMLAttributes, useEffect } from 'react';
import useStore, { useNotificationStore } from './zustand/store';
import { Level } from './types';
import ShadowedContainer from './ShadowedContainer';

const rotate = (degrees: string) => keyframes`
	0% {
		transform: rotate(0deg);
		-webkit-transform: rotate(0deg);
	}
	100% {
		transform: rotate(180deg);
		-webkit-transform: rotate(${degrees}deg);
	}
`;

interface RotatingSpanProps extends HTMLAttributes<HTMLSpanElement> {
	degrees: string;
	color?: string;
	start?: number;
	end?: number;
}

const RotatingSpan = styled.span<RotatingSpanProps>`
	border-color: ${(props) => props.color || 'black'};
	animation: ${(props) => rotate(props.degrees)}
		${(props) => props?.start || 0}s linear forwards
		${(props) => (props.end ? props.end : 0)}s;
`;

const ProgressBar = () => {
	const student_score = useStore((state 
		) => state.your_best_submission?.points || 0);
	const all_submissions = useStore((state) => state.all_submissions);
	const your_range_details = useStore((state) => state.your_range_details);
	const scores = all_submissions.map((submission) => submission.points);
	const levels: Record<number, Level> = useStore((state) => state.levels);
	const { setNotification, setNotificationType } = useNotificationStore(
		(state) => state
	);
	const lower_is_better = useStore((state) => state.lower_is_better);

    useEffect(() => {
        if (scores.length === 0) {
			console.log("No scores found")
            setNotification(
                "Your position can't be estimated yet because there are no other scores available at this time."
            );
            setNotificationType('info');
        } else if (!student_score) {
			console.log("No student score found")
            setNotification(
				"Your position can't be estimated yet because there are no scores available at this time."
			);
			setNotificationType('info');
        } else if (!your_range_details) {
			console.log("No range details found")
            setNotification(
                "Your position can't be estimated yet because there are no range details available at this time."
            );
            setNotificationType('info');
        }
    }, [student_score, your_range_details]);





	if(!student_score){
		return null;
	}

	// Hide the progress bar if the viewer is a teacher
	// if (viewer_type === 'teacher') {
	// 	return null;
	// }

	// Look for the level where the range contains the student score
	

	if (!your_range_details) {
		return null;
	}
		
	let levelDetails: Level | undefined;
	levelDetails = levels[your_range_details.id];



	const minScore = your_range_details.lower_limit || 0;
	// const maxScore = your_range_details.upper_limit || 0;

	const range = lower_is_better ? your_range_details.lower_limit - your_range_details.upper_limit :
	your_range_details.upper_limit - your_range_details.lower_limit;

	const progress = lower_is_better?  minScore - student_score : student_score - minScore;
	// make positive

	


	const percentage = (progress / range) * 100;

	const leftSideProgress = percentage > 50 ? percentage - 50 : 0;
	const rightSideProgress = percentage > 50 ? 50 : percentage;

	const LeftSideProgressToDegrees = (leftSideProgress / 50) * 180;
	const RightSideProgressToDegrees = (rightSideProgress / 50) * 180;


		

	return (
		<ShadowedContainer>
			<h2>Progress</h2>
			<div
				// className='col-md-3 col-sm-6'
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					// backgroundColor: 'black',
				}}>
				<div className='progress blue'>
					<span className='progress-left'>
						<RotatingSpan
							className='progress-bar'
							degrees={String(LeftSideProgressToDegrees)}
							start={1.5}
							end={1.8}
							color={levelDetails?.colors[0]}></RotatingSpan>
						{/* <span
							className='progress-bar'
							style={{ borderColor: levelDetails?.colors[0] }}></span> */}
					</span>
					<span className='progress-right'>
						<RotatingSpan
							className='progress-bar'
							degrees={String(RightSideProgressToDegrees)}
							start={1.8}
							end={0}
							color={levelDetails?.colors[0]}></RotatingSpan>
					</span>
					<div className='progress-value'>
						<img
							src={levelDetails?.badge}
							alt='level 4'
							width={140}
							height={140}
							style={{
								position: 'absolute',
								transform: 'translateX(-50%) translateY(-01%)',
								zIndex: 1,

							}}
						/>
					</div>
				</div>
			</div>
			<span>Progress:</span>
			<span
				style={{
					fontSize: '1.2rem',
					fontWeight: 'bold',
					textAlign: 'center',
				}}>
					<p>

					Next level at: {lower_is_better ? your_range_details.upper_limit : your_range_details.lower_limit || 0}
					</p>
					<p>
					Your current score: {student_score}
					</p>
				 {/* - {lower_is_better ? your_range_details.lower_limit : your_range_details.upper_limit || 0} */}
			</span>
			<span>
				{' '}
				You need <strong>{
					lower_is_better ? 
				student_score - your_range_details.upper_limit 
					: your_range_details.lower_limit - student_score
				} </strong>
				{lower_is_better ? ' less ' : ' more '}
				 score

				to level up.
			</span>
			<div>
				{/* his score / max score */}
				{/* <RotatingSpan degrees="180">⏳</RotatingSpan> */}
			</div>
		</ShadowedContainer>
	);
};

export default ProgressBar;
