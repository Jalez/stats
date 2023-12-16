/** @format */

import styled from 'styled-components';

interface FlexColumnProps {
  children?: React.ReactNode;
  flex?: number;
}

const FlexColumn = styled.div<FlexColumnProps>`
  display: flex;
  min-width: fit-content;
  max-width: 300px;
  flex: ${(props) => props.flex};
  flex-direction: column;
  column-width: 100%;
  overflow: auto;
  //make sure children occupy the full height
  & > * {
    height: 100%;
  }
`;

export default FlexColumn;
