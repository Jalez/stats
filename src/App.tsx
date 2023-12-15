/** @format */

import StudentBoard from './StudentBoard/StudentBoard';
import View from './View';
import useStore from './zustand/store';
import { useEffect, useState } from 'react';
import ViewSwitch from './ViewSwitch';
import StateDisplayer from './StateDisplayer/StateDisplayer';
import StateEditor from './StateEditor/StateEditor';
import { exercise, range, submission } from './types';

declare global {
	var GLOBAL_DATA: {
		course_id?: number,
		exercise_id?: number,
		instructor?: boolean,
		exercise?: exercise,
		ranges?: range[],
		submissions?: submission[],
		your_submission?: submission,
	}
}

(window as any).GLOBAL_DATA = (window as any).GLOBAL_DATA || {};


function App() {
	const {  calculateYourRangeDetails, setDataFromLti } = useStore(state => state)
	const { setAllSubmissions, setExercise, setYourBestSubmission,setRanges  } = useStore(state => state);
	const [globalData, setGlobalData] = useState(window.GLOBAL_DATA);

	useEffect(() => {
		const handleGlobalDataChange = () => {
		  setGlobalData(window.GLOBAL_DATA);
		};
	  
		window.addEventListener('GLOBAL_DATA_change', handleGlobalDataChange);
	  
		return () => {
		  window.removeEventListener('GLOBAL_DATA_change', handleGlobalDataChange);
		};
	  }, []);
	
	useEffect(() => {
		console.log("REACT GLOBAL_DATA", GLOBAL_DATA)
		if(!GLOBAL_DATA.exercise_id) return 

		if(GLOBAL_DATA.exercise){
			setExercise(GLOBAL_DATA.exercise);
		}
		if(GLOBAL_DATA.ranges){
			setRanges(GLOBAL_DATA.ranges);
		}
		if(GLOBAL_DATA.submissions){
			// GLOBAL_DATA.instructor && getSubmissions(GLOBAL_DATA.exercise_id);
			setAllSubmissions(GLOBAL_DATA.submissions);
		}
		if(GLOBAL_DATA.your_submission){
			setYourBestSubmission(GLOBAL_DATA.your_submission);
			calculateYourRangeDetails();
		}

		setDataFromLti(GLOBAL_DATA as any);
	}, [globalData])


	return (
		<div className='container'>
			{/* <Notification /> */}
			{
				GLOBAL_DATA.instructor ? <ViewSwitch /> : null
			}

			<View for='teacher'>
				<h1>
					State manager
				</h1>
				<div className='row'>
					<StateEditor />
					<StateDisplayer />
				</div>
			</View>
			<View for='student'>
				<StudentBoard />
			</View>
		</div>
	);
}

export default App;
