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
		// text size is 1.5rem
		fontSize: "1.3rem",
	}
	const { your_best_submission, your_level_details, isLoadingSubmissions } = useStore((state) => state);

	const your_best_score = your_best_submission?.points || -1;
	return (
		<ShadowedContainer>
			<h2
				style={{
					...textCenter,
					fontSize: "2rem",

				}}

			>Status</h2>
			{isLoadingSubmissions ? (

				<Skeleton
					count={1}
					style={textCenter}
				/>
			) : (

				<div style={textCenter}>
					<p>

						<span>Best Score:
							<strong>
								{your_best_score == -1 ? "N/A" : your_best_score}
							</strong>
						</span> |{" "}
						<span>Level:
							<strong>
								{your_level_details?.level || "N/A"}
							</strong>
						</span> | {" "}
						<span>
							Reward: 
							<strong>
								{your_level_details &&(your_level_details.percentage / 100) * 250 + " points" || "N/A"}
								</strong>
						</span>
					</p>
				</div>
			)}
		</ShadowedContainer>
	);
};

export default StudentStats;
