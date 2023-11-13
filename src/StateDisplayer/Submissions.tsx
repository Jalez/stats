import useStore from "../zustand/store"

const StateSubmissionsDisplayer = () => {
    const { all_submissions } = useStore((state) => state);

    return (
        <>
        <p>
        Submissions:{' '}
        </p>
        {/* Create a bootstrap table */}
        <table className='table table-striped table-hover text-center'>
            <thead>
                <tr>
                    <th>Points</th>
                    <th>Student ID</th>
                    <th>Exercise</th>
                    <th>Order</th>
                </tr>
            </thead>
            <tbody>
                {all_submissions.map((submission) => {
                    return (
                        <tr key={submission.points}>
                            <td>{submission.points}</td>
                            <td>{submission.aplus_id}</td>
                            <td>{submission.exercise}</td>
                            <td>{submission._order}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
                </>
    )
}

export default StateSubmissionsDisplayer