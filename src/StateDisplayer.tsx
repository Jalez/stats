import TabbedContent from "./General/TabbedContent";
import ShadowedContainer from "./ShadowedContainer";
import StateExerciseDisplayer from "./StateExerciseDisplayer";
import StateLevelsDisplayer from "./StateLevelsDisplayer";
import StateNotificationDisplayer from "./StateNotificationDisplayer";
import StateSelectedStudentDisplayer from "./StateSelectedStudentDisplayer";
import StateSubmissionsDisplayer from "./StateSubmissionsDisplayer";

const StateDisplayer = () => {

    return (
        <ShadowedContainer>
            <h2>
                State Displayer
            </h2>
            <div
			 style={{
				maxHeight: "400px",
				overflowY: "auto",	
			 }}
			>

            <TabbedContent
             tabs={[
                 {
                     id: 'exercise',
                     label: 'Exercise',
                     content: <StateExerciseDisplayer />,
                    },
                    {
                    id: 'levels',
                    label: 'Levels',
                    content: <StateLevelsDisplayer />,
                },
                {
                    id: 'submissions',
                    label: 'Submissions',
                    content: <StateSubmissionsDisplayer />,
                },
                {
                    id: 'notification',
                    label: 'Notification',
                    content: <StateNotificationDisplayer />,
                },
                {
                    id: "selectedStudent",
                    label: "Selected Student",
                    content: <StateSelectedStudentDisplayer />
                }
                
            ]}
            defaultTab="exercise"
            />
 
            </div>
        </ShadowedContainer>
    );
}

export default StateDisplayer;