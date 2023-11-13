/** @format */

interface ShadowedContainerProps {
	children: React.ReactNode;
}

const ShadowedContainer: React.FC<ShadowedContainerProps> = ({ children }) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				boxShadow: '0 0 10px rgba(0,0,0,0.5)',
				flexShrink: 1,
				maxHeight: 'fit-content',
				borderRadius: '1rem',
				flex: 1,
				padding: '1rem',
				margin: '0.5rem',
				backgroundColor: 'white',
				backdropFilter: 'blur(8px)',
				opacity: 0.9,
				breakInside: 'avoid',
			}}>
			{children}
		</div>
	);
};

export default ShadowedContainer;
