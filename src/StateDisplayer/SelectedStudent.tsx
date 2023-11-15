import ObjectDisplayer from "../General/ObjectDisplayer";
import useStore from "../zustand/store"

const StateSelectedStudentDisplayer = () => {
    const { your_best_submission, your_range_details, user_id, your_level_details } = useStore((state) => state);
    return (
        <div>
            <div>

            <h3>Selected Student</h3>
            {user_id ?
            <ObjectDisplayer object={{"user_id": user_id}} /> : "No user id found" }
            </div>
            <div>


                <h3>Best submission</h3>
                {your_best_submission ?
                    <ObjectDisplayer object={your_best_submission} /> : "No submission found with the given id, please change the id to use another submission"
                }

            </div>
            <div>
                <h3>Range details</h3>
                {your_range_details ?
                    <ObjectDisplayer object={your_range_details} /> : "No range details found"
                }
            </div>
            <div>
                <h3>Level details</h3>
                {your_level_details ?
                    <ObjectDisplayer object={your_level_details} /> : "No level details found"
                }
            </div>
        </div>
    )
}




export default StateSelectedStudentDisplayer;
