import ObjectDisplayer from "../General/ObjectDisplayer";
import useStore from "../zustand/store";

const ExerciseDisplayer = () => {
    const {exercise} = useStore((state) => state);

    return(
        <>
        <h2>Exercise details</h2>
        <ObjectDisplayer object={exercise} />
        </>
    )
}

export default ExerciseDisplayer;
