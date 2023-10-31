/** @format */

import './ProgressBar.css';

import styled, { keyframes } from 'styled-components';
import { HTMLAttributes } from 'react';
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
	const viewer_type = useStore((state) => state.viewer_type);
	const student_score = useStore((state) => state.your_best_score);
	const scores = useStore((state) => state.all_scores);
	const levels: Record<number, Level> = useStore((state) => state.levels);
	const { setNotification, setNotificationType } = useNotificationStore(
		(state) => state
	);

	// Hide the progress bar if there are no scores
	if (scores.length === 0) {
		setNotification(
			"Your position can't be estimated yet because there are no other scores available at this time."
		);
		setNotificationType('info');
		return null;
	}

	// Hide the progress bar if the viewer is a teacher
	if (viewer_type === 'teacher') {
		return null;
	}

	// Look for the level where the range contains the student score
	let levelKey = 0;
	let levelDetails: Level | undefined;
	for (const [key, value] of Object.entries(levels)) {
		if (value.range[0] <= student_score && value.range[1] >= student_score) {
			levelKey = parseInt(key);
			levelDetails = value;
			break;
		}
	}

	// get the next levels min score and set it as the max score
	const nextLevel = levels[levelKey + 1];
	console.log(levelDetails);

	const minScore = levelDetails?.range[0] || 0;
	const maxScore = nextLevel?.range[0] || levelDetails?.range[1] || 0;

	const range = maxScore - minScore;

	const progress = student_score - minScore;

	const percentage = (progress / range) * 100;
	console.log(percentage);

	const leftSideProgress = percentage > 50 ? percentage - 50 : 0;
	const rightSideProgress = percentage > 50 ? 50 : percentage;

	const LeftSideProgressToDegrees = (leftSideProgress / 50) * 180;
	const RightSideProgressToDegrees = (rightSideProgress / 50) * 180;

	console.log(LeftSideProgressToDegrees, RightSideProgressToDegrees);
	return (
		<ShadowedContainer>
			<h2>Progress</h2>
			<div
				className='col-md-3 col-sm-6'
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
							src={levelDetails?.img}
							alt='level 4'
							width={140}
							style={{
								position: 'absolute',
								// left: '90%',
								transform: 'translateX(-50%) translateY(-00%)',
								zIndex: 1,

								// top: '10px',
								// height: '25px',
								// // width: '25px',
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
					// top: '25px',
				}}>
				{student_score}/{maxScore}
			</span>
			<span>
				{' '}
				You need {maxScore - student_score} more point
				{maxScore - student_score === 1 ? ' ' : 's '}
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
