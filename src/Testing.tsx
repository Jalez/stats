/** @format */

import { useState } from 'react';
import useStore, { useNotificationStore } from './zustand/store';
import FormGroup from './General/FormGroup';
const Testing = () => {
	const { viewer_type, your_best_score, setViewerType, setYourBestScore } =
		useStore((state) => state);
	const { setNotification, setNotificationType } = useNotificationStore(
		(state) => state
	);

	const [newYourBestScore, setNewYourBestScore] = useState(your_best_score);
	const [testMode, setTestMode] = useState(false);

	const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setViewerType(e.target.checked ? 'student' : 'teacher');
		setTestMode(e.target.checked);
		setNotification('TESTING TOOLS: Viewer type updated to ' + viewer_type);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setYourBestScore(newYourBestScore);
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
			</div>

			<form onSubmit={handleSubmit}>
				<FormGroup label='Your Best Score' id='yourBestScore'>
					<input
						disabled={!testMode}
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
				<button disabled={!testMode}>Update test state</button>
			</form>
		</>
	);
};

export default Testing;
