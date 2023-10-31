/** @format */

// Let's you change the ranges and names of levels that are to be used in the app.

// Store where the levels are stored:
import useStore from './zustand/store';

// Types
import { Level } from './types';

const LevelsRangeChanger = () => {
	const levels: Record<number, Level> = useStore((state) => state.levels);

	const setLevel = (level: number, range: [number, number]) => {
		useStore.setState((state) => {
			state.levels[level].range = range;
			return state;
		});
	};

	const setLevelName = (level: number, name: string) => {
		useStore.setState((state) => {
			state.levels[level].name = name;
			return state;
		});
	};

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
						<th>Level</th>
						<th>Name</th>
						<th>Lower limit</th>
						<th>Upper limit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(levels).map((key) => {
						const level = levels[parseInt(key)];
						return (
							<tr key={key}>
								<td className='align-middle'>{key}</td>
								<td>
									<input
										className='form-control'
										type='text'
										value={level.name}
										// make the input take as little space as possible
										style={{
											width: '100%',
											// center it
											textAlign: 'center',
										}}
										onChange={(e) =>
											setLevelName(parseInt(key), e.target.value)
										}
									/>
								</td>
								<td>
									<input
										className='form-control'
										type='number'
										value={level.range[0]}
										onChange={(e) =>
											setLevel(parseInt(key), [
												parseInt(e.target.value),
												level.range[1],
											])
										}
									/>
								</td>
								<td>
									<input
										className='form-control'
										type='number'
										value={level.range[1]}
										onChange={(e) =>
											setLevel(parseInt(key), [
												level.range[0],
												parseInt(e.target.value),
											])
										}
									/>
								</td>
								{/* Add a button to delete level */}
								<td>
									<button
										className='btn btn-danger'
										onClick={() => {
											useStore.setState((state) => {
												delete state.levels[parseInt(key)];
												return state;
											});
										}}>
										X
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{/* Add a button to add a new level */}
			<button
				className='btn btn-primary'
				onClick={() => {
					useStore.setState((state) => {
						const newLevel = Object.keys(state.levels).length + 1;
						state.levels[newLevel] = {
							name: `Level ${newLevel}`,
							range: [0, 0],
							reward: {
								amount: 0,
								points: 0,
							},
							colors: ['#000000', '#000000'],
							img: '',
						};
						return state;
					});
				}}>
				Add Level
			</button>
		</div>
	);
};

export default LevelsRangeChanger;
