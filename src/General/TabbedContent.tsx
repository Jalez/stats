
import React from 'react';
import NavButton from './NavButton';

type Tab = {
	id: string;
	label: string;
	content: React.ReactNode;
};

type Props = {
	tabs: Tab[];
	defaultTab?: string;
};

const TabbedContent: React.FC<Props> = ({ tabs, defaultTab = tabs[0]?.id }) => {
	const [activeTab, setActiveTab] = React.useState(defaultTab);

	const handleTabChange = (tabId: string) => {
		setActiveTab(tabId);
	};

	return (
		<>
			<ul className="nav nav-tabs" role="tablist">
				{tabs.map(({ id, label }) => (
					<NavButton
						key={id}
						to={id}
						isActive={activeTab === id}
						handleClick={() => handleTabChange(id)}
					>
						{label}
					</NavButton>
				))}
			</ul>
			<div className="tab-content">
				{tabs.map(({ id, content }) => (
					<div key={id} className={`tab-pane ${activeTab === id ? 'active' : ''}`}>
						{content}
					</div>
				))}
			</div>
		</>
	);
};

export default TabbedContent;
