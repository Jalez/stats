/** @format */

import ScoreChart from './ScoreChart';
// import Settings from './Settings';
import StudentBoard from './StudentBoard';
import View from './View';

function App() {
	return (
		<div className=''>
			{/* <Settings /> */}
			{/* <Notification /> */}
			<View for='student'>
				<StudentBoard />
			</View>
			<View for='teacher'>
				<h1>Teacher View</h1>
				<ScoreChart />
			</View>
			<p id='studentScoreInfo'></p>
		</div>
	);
}

export default App;
