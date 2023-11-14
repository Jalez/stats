/** @format */

import './ProgressBar.css';

import styled, { keyframes } from 'styled-components';
import { HTMLAttributes, useEffect } from 'react';
import useStore, { useNotificationStore } from '../zustand/store';
import ShadowedContainer from '../StyledComponents/ShadowedContainer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
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
	const your_range_details = useStore((state) => state.your_range_details);
	const your_level_details = useStore((state) => state.your_level_details);
	const isLoadingRanges = useStore((state) => state.isLoadingRanges);
	const isLoadingSubmissions = useStore((state) => state.isLoadingSubmissions);

	const { setNotification, setNotificationType } = useNotificationStore(
		(state) => state
	);
	const lower_is_better = useStore((state) => state.lower_is_better);

    useEffect(() => {
		console.log("useEffect")
		 if (!student_score) {
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


	if (isLoadingRanges || isLoadingSubmissions) return 
	(<ShadowedContainer>
		<h2
		style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			textAlign: 'center',
		}}
		>Progress</h2>
		<Skeleton
	
		 style={{
			display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			width: "150px",
			height: "150px",
			lineHeight: "150px",
			// background: "none",
			margin: "0 auto",
			boxShadow: "none",
			position: "relative",
		 }}
		/>
		<Skeleton
			count={2}
			style={{

				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				textAlign: 'center',
			}}
		/>
	</ShadowedContainer>)


	

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
		

	const minScore = your_range_details.lower_limit || 0;
	const maxScore = your_range_details.upper_limit || 0;

	const range = your_range_details.upper_limit - your_range_details.lower_limit;

	const progress = lower_is_better?  maxScore - student_score : student_score - minScore;
	const progressToNextLevel = range - progress;

	const percentage = (progress / range) * 100;

	const leftSideProgress = percentage > 50 ? percentage - 50 : 0;
	const rightSideProgress = percentage > 50 ? 50 : percentage;

	const LeftSideProgressToDegrees = (leftSideProgress / 50) * 180;
	const RightSideProgressToDegrees = (rightSideProgress / 50) * 180;


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
							color={your_level_details?.colors[0]}></RotatingSpan>
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
							color={your_level_details?.colors[0]}></RotatingSpan>
					</span>
					<div className='progress-value'>
						<img
							src={your_level_details?.badge}
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

					Next level at: {lower_is_better ? (Number(your_range_details.lower_limit) -1) : (Number(your_range_details.upper_limit)+1) || 0}
					</p>
					<p>
					Your current score: {student_score}
					</p>
				 {/* - {lower_is_better ? your_range_details.lower_limit : your_range_details.upper_limit || 0} */}
			</span>
			<span>
				{your_level_details?.level == 6 ? 
				"You are at the highest level. Congratulations!"
				: (
					<>
				{' '}
				You need <strong>{
					progressToNextLevel
				} </strong>
				{lower_is_better ? ' less ' : ' more '}
				 score

				to level up.
				</>
				)}
			</span>
			<div>

				</div>
			</div>
		</ShadowedContainer>
	);
};

export default ProgressBar;
