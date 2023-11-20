import ArrayDisplayer from "../General/ArrayDisplayer";
import useStore from "../zustand/store"

const StateSubmissionsDisplayer = () => {
    const { all_submissions } = useStore((state) => state);

    if(!all_submissions) return "No submissions found, please select an exercise to display";
    console.log("Submissions", all_submissions)

    return (
        <>
        <p>
        Submissions:{' '}
        </p>
        {/* Create a bootstrap table */}
        <ArrayDisplayer arrayWithObjects={all_submissions} />
                </>
    )
}

export default StateSubmissionsDisplayer