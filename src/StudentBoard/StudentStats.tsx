/** @format */

import Skeleton from 'react-loading-skeleton';
import ShadowedContainer from '../StyledComponents/ShadowedContainer';
import useStore from '../zustand/store';
import React from 'react';



const StudentStats = () => {

	const textCenter: React.CSSProperties
		= {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		textAlign: "center",
	}
	const { your_best_submission, your_level_details, isLoadingSubmissions } = useStore((state) => state);

	const your_best_score = your_best_submission?.points || -1;
	return (
		<ShadowedContainer>
			<h2
			 	style={textCenter}
			>General</h2>
			{isLoadingSubmissions ? (

				<Skeleton
					count={3}
					style={textCenter}
				/>
			) : (

				<div style={textCenter}>
					<p>Best Score: {your_best_score == -1 ? "N/A" : your_best_score}</p>
					<p>Level: {your_level_details?.level || "N/A"}</p>
					<p>
						Reward: {your_level_details && <strong>{(your_level_details.percentage / 100) * 250 + " points"}</strong> || "N/A"}
					</p>
				</div>
			)}
		</ShadowedContainer>
	);
};

export default StudentStats;
