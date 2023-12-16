/** @format */

import styled from 'styled-components';

interface ShadowedContainerProps {
  children: React.ReactNode;
  flex?: number;
}

const ShadowedContainer = styled.div<ShadowedContainerProps>`
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  flex-shrink: 1;
  // max-height: fit-content;
  border-radius: 1rem;

  flex: ${(props) => props.flex || 1};
  padding: 1rem;
  margin: 0.5rem;
  background-color: white;
  backdrop-filter: blur(8px);
`;

export default ShadowedContainer;
