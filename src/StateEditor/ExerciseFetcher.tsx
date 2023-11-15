/** @format */

// Let's you change the exercise that is to be used in the app.

// Store where the exercise is stored:
import useStore from '../zustand/store';


// Types
import { useEffect, useState } from 'react';
import { ValueChanger } from '../General/ValueChanger';
import getApiData from '../utils/getApiData';

const ExerciseFetcher = () => {
    const exercise = useStore((state) => state.exercise);
    const setExercise = useStore((state) => state.setExercise);
    const [newExerciseId, setNewExerciseId] = useState(exercise?.exercise_id || 0);

    useEffect(() => {
        setNewExerciseId(exercise?.exercise_id || 0);
    }, [exercise]);


		
	const fetchExercise = async (newExerciseId: number | string) => {

		const getExercise = async (exercise_id: number) => {
			// Give it a time out of 5 seconds before it gives up
			const route = '/api/exercises/';
			const data = await getApiData(route);
            console.log("data", data)
			if (data?.results) {
				const results = data.results;
				// find the exercise with the given id
				const exerciseData = results.find((e: any) => e.exercise_id === exercise_id);
				setExercise(exerciseData);
			}
		}
        newExerciseId = Number(newExerciseId);
        if (isNaN(newExerciseId)) newExerciseId = 0;


		getExercise(newExerciseId);
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
            <h3>Exercise</h3>
            {/* Display a table where columns are Name, Description, and Difficulty. */}

                   <ValueChanger 
                    value={newExerciseId}
                    label="Update exercise id"
                    onSubmit={fetchExercise}

                    />


            </div>
    );
};

export default ExerciseFetcher;
