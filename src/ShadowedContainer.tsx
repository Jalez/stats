/** @format */

interface ShadowedContainerProps {
	children: React.ReactNode;
}

const ShadowedContainer: React.FC<ShadowedContainerProps> = ({ children }) => {
	return (
		<div
			style={{
				// center elements
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				minWidth: 'fit-content',
				// maxHeight: '50%',
				boxShadow: '0 0 10px rgba(0,0,0,0.5)',
				flexShrink: 1,
				height: '100%',
				borderRadius: '1rem',
				// flex: 1,
				padding: '1rem',
				margin: '0.5rem',
				backgroundColor: 'white',
				backdropFilter: 'blur(8px)',
				opacity: 0.9,
				// make the container see-through
				// blur the elements behind the element

				breakInside: 'avoid',
			}}>
			{children}
		</div>
	);
};

export default ShadowedContainer;
