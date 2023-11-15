/** @format */

import LevelsRangeChanger from './LevelsRangeChanger';
import SubmissionsManager from './SubmissionsManager';
import Testing from './Testing';
import ShadowedContainer from '../StyledComponents/ShadowedContainer';
import TabbedContent from '../General/TabbedContent';
import ExerciseFetcher from './ExerciseFetcher';

const StateEditor = () => {

	return (
		<ShadowedContainer>
			<h2>State tester</h2>
			<p>
				State changes are not permanent when using the tester, it will be reset when you refresh the page.
			</p>
			<div
				style={{
					maxHeight: "400px",
					overflowY: "auto",
				}}
			>
				<TabbedContent
					tabs={[
						{
							id: "exercise",
							label: "Exercise fetcher",
							content: <ExerciseFetcher />
						},
						{
							id: 'selectedStudent',
							label: 'Selected student',
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

					]}
				/>

			</div>
		</ShadowedContainer>
	);
};



export default StateEditor;
