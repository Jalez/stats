import ObjectDisplayer from "../General/ObjectDisplayer";
import useStore from "../zustand/store";

const ExerciseDisplayer = () => {
    const {exercise} = useStore((state) => state);
    if(!exercise) return "No exercise found, please select an exercise to display";

    return(
        <>
        <h2>Exercise details</h2>
        <ObjectDisplayer object={exercise} />
        </>
    )
}

export default ExerciseDisplayer;
