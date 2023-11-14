import { range } from "../types";

interface LevelsRangeChangerRowProps  {
    range: range,
    unsavedLimitUpdater: (id: number, limit: 'lower_limit' | 'upper_limit', value: number) => void
    deleteRange: (id: number) => void;
}

const LevelsRangeChangerRow = ({ range, unsavedLimitUpdater, deleteRange }:
    LevelsRangeChangerRowProps
    ) => {



    return (

        <tr>
								<td className='align-middle'>{range.id}</td>
								<td>
									<input
										className='form-control'
										type='number'
										value={range.lower_limit}
										onChange={(e) =>
											unsavedLimitUpdater(range.id, 'lower_limit', parseInt(e.target.value))
										}
									/>
								</td>
								<td>
									<input
										className='form-control'
										type='number'
										value={range.upper_limit}
										onChange={(e) =>
											unsavedLimitUpdater(range.id, 'upper_limit', parseInt(e.target.value))
										}
									/>
								</td>
								{/* Add a button to delete level */}
								<td>
									<button
										className='btn btn-danger'
										onClick={() => {
											deleteRange(range.id);
										}}>
										X
									</button>
								</td>
							</tr>
    )
}

export default LevelsRangeChangerRow;