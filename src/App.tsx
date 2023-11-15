/** @format */

import StudentBoard from './StudentBoard/StudentBoard';
import View from './View';
import useStore from './zustand/store';
import { useEffect, useState } from 'react';
import ViewSwitch from './ViewSwitch';
import StateDisplayer from './StateDisplayer/StateDisplayer';
import StateEditor from './StateEditor/StateEditor';


declare global {
	var GLOBAL_VARS: {
		last_login?: string,
		_auth_user_id?: string,
		_auth_user_backend?: string,
		_auth_user_hash?: string,
		context_id?: string,
		context_label?: string,
		context_title?: string,
		custom_context_api?: string,
		custom_context_api_id?: string,
		custom_user_api_token?: string,
		exer_id?: string,
		launch_presentation_document_target?: string,
		launch_presentation_locale?: string,
		launch_presentation_return_url?: string,
		lis_person_contact_email_primary?: string,
		lis_person_name_family?: string,
		lis_person_name_full?: string,
		lis_person_name_given?: string,
		lti_message_type?: string,
		lti_version?: string,
		resource_link_id?: string,
		resource_link_title?: string,
		roles?: string,
		tool_consumer_instance_description?: string,
		tool_consumer_instance_guid?: string,
		tool_consumer_instance_name?: string,
		tool_consumer_instance_url?: string,
		user_id?: string,
		instructor?: boolean
	}
}

(window as any).GLOBAL_VARS = (window as any).GLOBAL_VARS || {};


function App() {
	const { exercise, getExercise, changeUser, setYourBestSubmission, calculateYourRangeDetails, getRanges, getSubmissions, setDataFromLti } = useStore(state => state)

	const test_exercise_id = 42;
	const [exerciseId, setExerciseId] = useState((window as any).GLOBAL_VARS.exer_id || test_exercise_id);
	const { user_id, all_submissions, ranges } = useStore(state => state);
	useEffect(() => {
		if (GLOBAL_VARS.instructor) {
			console.log("Setting viewer type to teacher")
			// setViewerType('teacher');
		}
		if (GLOBAL_VARS.user_id) {
			// remove the i from the user_id
			const newUserId = GLOBAL_VARS.user_id.slice(1);
			changeUser(Number(newUserId));
		}
		if(GLOBAL_VARS.exer_id){
			setExerciseId(GLOBAL_VARS.exer_id);
		}
		setDataFromLti(GLOBAL_VARS as any);
	}, [GLOBAL_VARS])

	useEffect(() => {
		const your_best_submission = all_submissions?.find(submission => submission.aplus_id === user_id);
		if (your_best_submission) {
			setYourBestSubmission(your_best_submission);
			calculateYourRangeDetails();
		}
	}, [all_submissions, user_id, ranges])

	useEffect(() => {
		getExercise(exerciseId);
	}, [exerciseId]);


	useEffect(() => {
		if (exercise) {
			getRanges(exercise.id);
			getSubmissions(exercise.id);
		}
	}, [exercise])

	return (
		<div className='container'>
			{/* <Notification /> */}
			{
				GLOBAL_VARS.instructor ? <ViewSwitch /> : null
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
