import TabbedContent from "../General/TabbedContent";
import ShadowedContainer from "../ShadowedContainer";
import StateExerciseDisplayer from "./Exercise";
import StateLevelsDisplayer from "./Levels";
import Lti from "./Lti";
import StateNotificationDisplayer from "./Notification";
import StateSelectedStudentDisplayer from "./SelectedStudent";
import StateSubmissionsDisplayer from "./Submissions";

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
                },
                {
                    id: "LTI",
                    label: "LTI data",
                    content: <Lti/>
                }
                
            ]}
            defaultTab="exercise"
            />
 
            </div>
        </ShadowedContainer>
    );
}

export default StateDisplayer;