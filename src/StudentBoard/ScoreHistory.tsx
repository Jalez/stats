/** @format */

import LineChart from '../General/LineChart';
import ShadowedContainer from '../StyledComponents/ShadowedContainer';

const ScoreHistory = () => {
	return (
		<ShadowedContainer>
			<h2>Score History</h2>
			<LineChart
				label='Your scores'
				data={[19, 14, 12, 3]}
				xLabels={[1, 2, 3, 4]}
			/>
		</ShadowedContainer>
	);
};

export default ScoreHistory;
