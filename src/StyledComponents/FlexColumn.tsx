import styled from 'styled-components';

interface FlexColumnProps {
    children?: React.ReactNode;
    flex?: number;
}

const FlexColumn = styled.div<FlexColumnProps>`
    display: flex;
    flex: ${props => props.flex};
    flex-direction: column;
    column-width: 100%;
    column-count: 2;
    column-gap: 1rem;
    //make sure children occupy the full height
    & > * {
        height: 100%;
    }

`;

export default FlexColumn;
