/** @format */

import { useState } from 'react';
import FormGroup from './General/FormGroup';
import useStore from './zustand/store';
import { useNotificationStore } from './zustand/store';
const SubmissionManager = () => {
	const { addNewSubmission, setAllSubmissions } = useStore((state) => state);
	const setNotification = useNotificationStore(
		(state) => state.setNotification
	);
	const [submissionPoints, setSubmissionPoints] = useState<number>(0);
	const [order, setOrder] = useState<number>(0)
	const [studentId, setStudentId] = useState<number>(0)
	const [exercise, setExercise] = useState<number>(0)
	const submitNewSubmission = (points: number, student_id: number, exercise: number ) => {
		addNewSubmission({
			points: points,
			aplus_id: student_id,
			exercise: exercise,
			_order: 0,
		});
	}
	return (
		<div>
			<h3>Submission Manager</h3>
			<form
				className='form-inline'
				onSubmit={
					(e) => {
						e.preventDefault();
						submitNewSubmission(Number(submissionPoints), Number(studentId), Number(exercise));
						setNotification('Submission added');
					}
				}>
					<FormGroup label='Submission points' id='submissionPoints'>

					<input
						type="number"
						className='form-control'
						placeholder='Enter submission points'
						value={submissionPoints}
						onChange={(e) => setSubmissionPoints(Number(e.target.value))}
						/>
						</FormGroup>

					<FormGroup label='Student id' id='studentId'>
					<input
						type="number"
						className='form-control'
						placeholder='Enter student id'
						value={studentId}
						onChange={(e) => setStudentId(Number(e.target.value))}
					/>
					</FormGroup>
					<FormGroup label='Exercise id' id='exerciseId'>
					<input
						type="number"
						className='form-control'
						placeholder='Enter exercise id'
						value={exercise}
						onChange={(e) => setExercise(Number(e.target.value))}
					/>

					</FormGroup>
					<FormGroup label='Order' id='order'>
					<input
						type="number"
						className='form-control'
						placeholder='Enter order'
						value={order}
						onChange={(e) => setOrder(Number(e.target.value))}
					/>
					</FormGroup>

					
					<button className='btn btn-primary' type='submit'>
						Add submission
					</button>
			</form>
			{/* Add a button to fetch scores from the database */}
			<FormGroup label='Fetch Scores' id='allScores'>
				<button
					className='btn btn-primary'
					onClick={() => {
						fetch('/api/scores')
							.then((res) => res.json())
							.then((data) => {
								setAllSubmissions(data);
							});
					}}>
					Fetch from Database
				</button>
			</FormGroup>
			{/* Update level ranges based on all scores*/}
		
		</div>
	);
};

export default SubmissionManager;
