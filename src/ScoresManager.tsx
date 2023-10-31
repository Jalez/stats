/** @format */

import { useState } from 'react';
import FormGroup from './General/FormGroup';
import useStore from './zustand/store';
import { useNotificationStore } from './zustand/store';
import { Level } from './types';
const ScoresManager = () => {
	const { all_scores, setAllScores } = useStore((state) => state);
	const setNotification = useNotificationStore(
		(state) => state.setNotification
	);
	const [newAllScores, setNewAllScores] = useState<number[]>(all_scores);

	return (
		<div>
			<h3>Scores Manager</h3>
			<form
				className='form-inline'
				onSubmit={(e) => {
					e.preventDefault();
					setAllScores(newAllScores);
				}}>
				<FormGroup label='All Scores' id='allScores'>
					<input
						id='allScores'
						type='text'
						className='form-control'
						placeholder='Example: 1,2,3,4,5'
						value={newAllScores.join(',')}
						onChange={(e) => {
							setNewAllScores(
								e.target.value.split(',').map((score) => parseInt(score))
							);
							setNotification('');
						}}
					/>
					<button className='btn btn-primary' type='submit'>
						Update Scores
					</button>
				</FormGroup>
			</form>
			{/* Add a button to fetch scores from the database */}
			<FormGroup label='Fetch Scores' id='allScores'>
				<button
					className='btn btn-primary'
					onClick={() => {
						fetch('/api/scores')
							.then((res) => res.json())
							.then((data) => {
								setAllScores(data);
							});
					}}>
					Fetch from Database
				</button>
			</FormGroup>
			{/* Update level ranges based on all scores*/}
			<FormGroup label='Update Level Ranges' id='allScores'>
				<button
					className='btn btn-primary'
					onClick={() => {
						useStore.setState((state) => {
							const sortedScores = state.all_scores.sort((a, b) => a - b);
							const levelSize = Math.floor(sortedScores.length / 5);
							const levels: Record<number, Level> = {};
							for (let i = 0; i < 5; i++) {
								const level = i + 1;
								levels[level] = {
									name: `Level ${level}`,
									range: [
										sortedScores[i * levelSize],
										sortedScores[(i + 1) * levelSize - 1],
									],
									reward: {
										points: 50,
										amount: Number(i),
										img: 'Reward Image',
									},
									colors: ['#000000', '#000000'],
									img: 'Badge image',
								};
							}
							state.levels = levels;
							return state;
						});
					}}>
					Update Levels
				</button>
			</FormGroup>
		</div>
	);
};

export default ScoresManager;
