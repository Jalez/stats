/** @format */

// Let's you change the ranges and names of levels that are to be used in the app.

// Store where the levels are stored:
import useStore from './zustand/store';

// Types
import { useEffect, useState } from 'react';
import LevelsRangeChangerRow from './LevelsRangeChangerRow';
import { range } from './types';

const LevelsRangeChanger = () => {
	const ranges = useStore((state) => state.ranges);
	const setRanges = useStore((state) => state.setRanges);
	const [newRanges, setNewRanges] = useState(ranges);

	useEffect(() => {
		setNewRanges(ranges);
	}, [ranges]);

	if(!newRanges) return "No ranges found, please select an exercise that has ranges in the api to modify ranges";



	const unsavedRangeLimitUpdater = (level:number, limitType: "lower_limit" | "upper_limit", newLimitAmount: number) => {
		
		const updatedRange = [...newRanges]
		updatedRange[level-1][limitType] = newLimitAmount;
		setNewRanges(updatedRange);
		
		// setNewRanges((state) => {
		// 	state[level-1][limitType] = newLimitAmount;
		// 	return state;
		// } );
	}

	const deleteRange = (id: number) => {
		console.log("Delete range", id, "TODO");
	}

	const postNewRanges = async (id:  number, newRange: range
		) => {
		await fetch("/api/ranges/" + id, {
			method: "PUT",
			body: JSON.stringify(newRange),
			headers: {
				"Content-Type": "application/json",
			},
			// Add withCredentials to send the cookie with the request
			credentials: "include",
			
		})	
	}
	const saveNewRanges = () => {
		console.log("Save new ranges", newRanges, "TODO");
		setRanges(newRanges);
		for (const range of newRanges) {
			postNewRanges(range.id, range);
		}
		
		
	}


	return (
		<div
			style={{
				width: '100%',
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<h3>Levels</h3>
			{/* Display a table where columns are Level, Name, Min Range, and Max Range. */}
			<table
				className='table table-striped table-hover table-sm text-center table-responsive'
				style={{
					marginLeft: 'auto',
					marginRight: 'auto',
				}}>
				<thead>
					<tr>
						<th>Id</th>
						<th>Lower limit</th>
						<th>Upper limit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{newRanges.map((range, key) => 
					 <LevelsRangeChangerRow
					  key={key}
					  range={range}
					  unsavedLimitUpdater={unsavedRangeLimitUpdater}
					  deleteRange={deleteRange}
					 />
					)}
				</tbody>
			</table>
			{/* Add a button to add a new level */}
			<button
				className='btn btn-primary'
				onClick={
					saveNewRanges
				}>
				Update ranges
			</button>

			</div>
	);
};

export default LevelsRangeChanger;
