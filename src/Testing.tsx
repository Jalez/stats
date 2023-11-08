/** @format */

import { useEffect, useState } from 'react';
import useStore, { useNotificationStore } from './zustand/store';
import FormGroup from './General/FormGroup';
const Testing = () => {
	const { changeUser, user_id, viewer_type, your_best_submission, setViewerType, updateSubmission } =
		useStore((state) => state);
	const { setNotification, setNotificationType } = useNotificationStore(
		(state) => state
	);

	// if(!your_best_submission) return "No submission found with the given id, please change the id to use another submission";

	const your_best_score = your_best_submission?.points || -1;

	const [newUserId, setNewUserId] = useState(user_id);
	const [newYourBestScore, setNewYourBestScore] = useState(your_best_score);
	const [testMode, setTestMode] = useState(false);

	const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setViewerType(e.target.checked ? 'student' : 'teacher');
		setTestMode(e.target.checked);
		setNotification('TESTING TOOLS: Viewer type updated to ' + viewer_type);
	};

	const handleUserIdChange = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		changeUser(newUserId);
		setNotification('TESTING TOOLS: User id updated to ' + newUserId);
		setNotificationType('info');
	}

	useEffect(() => {
		if (your_best_submission) {
			setNewYourBestScore(your_best_submission.points);
		}
	}, [your_best_submission]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		updateSubmission(
				{
					points: newYourBestScore,
					aplus_id: user_id,
					exercise: 0,
					_order: 0,
				}
				
				)

		setNotification('TESTING TOOLS: State updated');
		setNotificationType('info');
	};

	return (
		<>
			<h3>Testing Tools</h3>
			{/* add a switch to active test mode */}
			<div className='form-check form-switch'>
				<input
					className='form-check-input'
					type='checkbox'
					id='testModeSwitch'
					onChange={handleSwitch}
				/>
				<label className='form-check-label' htmlFor='testModeSwitch'>
					{/* Teacher or Student */}
					{testMode ? 'Student' : 'Teacher'}
				</label>
				{/* Add a user_id input changer */}
						</div>
				<form onSubmit={handleUserIdChange}
				className='form-inline container'
				>


{/* create a legend titled "Change user for this section" */}
<fieldset
className='bg-light text-dark mb-3 p-5'
>

<legend className='
'>Changing the user</legend>

<div className='row'>
					<FormGroup label='User id' id='userId'>

						<input
							type='number'
							className='form-control'
							placeholder='User id'
							value={newUserId}
							onChange={(e) => {
								setNewUserId(parseInt(e.target.value));
								setNotification('');
							}}
							/>
					</FormGroup>
						<button	className='btn btn-primary'>Change user</button>
							</div>
					</fieldset>
				</form>

			<form onSubmit={handleSubmit}>
				<FormGroup label='Score' id='yourBestScore'>
					<input
						id='yourBestScore'
						type='number'
						className='form-control'
						placeholder='Your best score'
						value={newYourBestScore}
						onChange={(e) => {
							setNewYourBestScore(parseInt(e.target.value));
							setNotification('');
						}}
					/>
				</FormGroup>
				<button
				className='btn btn-primary'
				>Update test state</button>
			</form>
		</>
	);
};

export default Testing;

