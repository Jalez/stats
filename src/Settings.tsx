/** @format */

import React from 'react';
import LevelsRangeChanger from './LevelsRangeChanger';
import ScoresManager from './ScoresManager';
import Testing from './Testing';
import NavButton from './General/NavButton';
import ShadowedContainer from './ShadowedContainer';

const Settings = () => {
	const [activeTab, setActiveTab] = React.useState('testing');

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<ShadowedContainer>
			<h2>Settings</h2>
			<ul className='nav nav-tabs' id='myTab' role='tablist'>
				<NavButton
					to='testing'
					isActive={activeTab === 'testing'}
					handleClick={handleTabChange}>
					Testing
				</NavButton>
				<NavButton
					to='scores'
					isActive={activeTab === 'scores'}
					handleClick={handleTabChange}>
					Scores Manager
				</NavButton>
				<NavButton
					to='levels'
					isActive={activeTab === 'levels'}
					handleClick={handleTabChange}>
					Levels Range Changer
				</NavButton>
			</ul>
			<div className='tab-content' id='myTabContent'>
				{activeTab === 'testing' && <Testing />}
				{activeTab === 'scores' && <ScoresManager />}
				{activeTab === 'levels' && <LevelsRangeChanger />}
			</div>
		</ShadowedContainer>
	);
};

export default Settings;
