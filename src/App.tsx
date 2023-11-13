/** @format */

import AppState from './StateDisplayer/StateDisplayer';
import Settings from './Settings';
import StudentBoard from './StudentBoard';
import View from './View';
import useStore from './zustand/store';
import { useEffect } from 'react';
import ViewSwitch from './ViewSwitch';


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

const getApiData = async (url: string) => {
	const controller = new AbortController();
	const signal = controller.signal;
	setTimeout(() => controller.abort(), 5000);
	try {
		const response = await fetch(url, { signal });
		const contentType = response.headers.get('content-type')
		if (contentType && contentType.includes("application/json")) {
			const data = await response.json();
			return data;
		} else {
			console.log('Oops, ', url , ' does not give JSON (perhaps you are working without the api?)' );
			return null;
		}
	} catch (error) {
		console.error(error);
	}
}
function App() {
    const {exercise, setExercise, changeUser, setYourBestSubmission, setViewerType, calculateYourRangeDetails, setRanges, setAllSubmissions, updateAllSubmissions} = useStore(state => state)

	const test_exercise_id = 42;
	const exercise_id = (window as any).GLOBAL_VARS.exer_id || test_exercise_id;
	const {user_id, all_submissions, ranges} = useStore(state => state);
	useEffect(() => {
		if(GLOBAL_VARS.instructor) {
			console.log("Instructor mode")
			setViewerType('teacher');
		}
		if(GLOBAL_VARS.user_id) {
			// remove the i from the user_id
			const newUserId = GLOBAL_VARS.user_id.slice(1);
			changeUser(Number(newUserId));
		}
		
	}, [GLOBAL_VARS])

	useEffect(() => {
		// look for the submission with the given aplus_id being equal to the user_id
		// and set the your_best_submission to that submission
		const your_best_submission = all_submissions?.find(submission => submission.aplus_id === user_id);
		if(your_best_submission) {
			setYourBestSubmission(your_best_submission);
			calculateYourRangeDetails();
		}
		
	}, [all_submissions, user_id, ranges])

	useEffect(() => {
		console.log('App mounted');
		const getExercise = async (exercise_id: number) => {
			// Give it a time out of 5 seconds before it gives up
			const route = '/api/exercises/';
			const data = await getApiData(route);
			if (data?.results) {
				const results = data.results;
				// find the exercise with the given id
				const exerciseData = results.find((e: any) => e.exercise_id === exercise_id); 
				setExercise(exerciseData);
			}
		}
		// Currently, by default, we'll get the exercise with id = 1
		getExercise(exercise_id);
	}, []);


	useEffect(() => {
		if(exercise) {
			const getRanges = async (exercise_id: number) => {
				// Give it a time out of 5 seconds before it gives up
				const route = '/api/ranges/?exercise=' + exercise_id;
				const data = await getApiData(route);
				if (data) {
					const results = data.results;
					// get the last 6 ranges
					const lastSixRanges = results.slice(-6);
					setRanges(lastSixRanges);
				}
			}
			getRanges(exercise.id);

			const getSubmissions = async (exercise_id: number) => {
				// Give it a time out of 5 seconds before it gives up
				const route = '/api/submissions/?exercise=' + exercise_id;
				let data = await getApiData(route);
				if (data) {
					setAllSubmissions(data.results);
					while(data.next) {
						data = await getApiData(data.next);
						updateAllSubmissions(data.results);
					}
				}
			}
			getSubmissions(exercise.id);


		}
	}, [exercise])

	return (
		<div className='container'>
			{
				GLOBAL_VARS.instructor ? <ViewSwitch/> : null
			}
			{/* <Notification /> */}
			<View for='teacher'>
				<h1>Teacher View</h1>
				<div className='row'>
					<Settings />
					<AppState />
				</div>
				{/* <StudentBoard /> */}
				{/* <ScoreChart /> */}
			</View>
			<View for='student'>
				<StudentBoard />
			</View>
			<p id='studentScoreInfo'></p>
		</div>
	);
}

export default App;
