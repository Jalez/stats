import styled from 'styled-components';

interface ShadowedContainerProps {
	children: React.ReactNode;
}

const ShadowedContainer = styled.div<ShadowedContainerProps>`
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	flex-shrink: 1;
	max-height: fit-content;
	border-radius: 1rem;
	flex: 1;
	padding: 1rem;
	margin: 0.5rem;
	background-color: white;
	backdrop-filter: blur(8px);
	opacity: 0.9;
	break-inside: avoid;
`;

export default ShadowedContainer;
