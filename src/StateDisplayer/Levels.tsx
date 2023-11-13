import useStore from "../zustand/store";

const StateLevelsDisplayer = () => {
    const { levels } = useStore((state) => state);

    return (
        <>
        <p>
        Levels:{' '}
        </p>
        {/* Create a bootstrap table */}
        <table className='table table-striped table-hover text-center'>
            <thead>
                <tr>
                    <th>Level</th>
                    <th>Name</th>
                    <th>
                        Badge
                    </th>

                </tr>
            </thead>
            <tbody>
                {Object.entries(levels).map(([level, details]) => {
                    return (
                        <tr key={level}>
                            <td>{level}</td>
                            <td>{details.name}</td>
                            <td>
                                <img
                                width={40}
                                height={40}
                                    src={details.badge}
                                    alt={details.name}
                                    // style={{ width: '10rem' }}
                                />
                            </td>

                        </tr>
                    );
                })}
            </tbody>
        </table>
                </>
    )
}

export default StateLevelsDisplayer