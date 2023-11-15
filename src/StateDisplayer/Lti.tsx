import ObjectDisplayer from "../General/ObjectDisplayer";
import useStore from "../zustand/store";

const Lti = () => {
    const { data_from_lti } = useStore(state => state);

    if (!data_from_lti) return "No data from LTI found, please select an exercise to display";

    return (
        <div>
            <h3>
                Lti data
            </h3>

            <ObjectDisplayer object={data_from_lti} />

        </div>
    )
}

export default Lti;