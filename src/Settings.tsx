/** @format */

import LevelsRangeChanger from './LevelsRangeChanger';
import SubmissionsManager from './SubmissionsManager';
import Testing from './Testing';
import ShadowedContainer from './ShadowedContainer';
import TabbedContent from './General/TabbedContent';
import ExerciseFetcher from './ExerciseFetcher';

const Settings = () => {

	return (
		<ShadowedContainer>
			<h2>Settings</h2>
			<div
			 style={{
				maxHeight: "400px",
				overflowY: "auto",	
			 }}
			>	
			<TabbedContent
			 tabs={[
				 {
					 id: 'testing',
					 label: 'Testing',
					 content: <Testing />,
					},
					{
						id: 'submissions',
					label: 'Submissions Manager',
					content: <SubmissionsManager />,
				},
				{
					id: 'levels',
					label: 'Levels Range Changer',
					content: <LevelsRangeChanger />,
				},
				{
					id: "exercise",
					label: "Exercise fetcher",
					content: <ExerciseFetcher />
				}
			]}
			/>

			</div>
		</ShadowedContainer>
	);
};



export default Settings;
