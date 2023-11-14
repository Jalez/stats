import styled from "styled-components";

interface GradientContainerProps {
    prevColor1: string;
    prevColor2: string;
    color1: string;
    color2: string;
}

const GradientContainer = styled.div<GradientContainerProps>`
    height: fit-content;
    // height: 400px;
    margin: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    background: linear-gradient(to top right, ${props => props.prevColor1} 30%, ${props => props.prevColor2} 70%),
                linear-gradient(to top right, ${props => props.color1} 30%, ${props => props.color2} 70%);
    background-size: 100% 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transition: background 0.5s ease-in-out;

    &.transition {
        background: linear-gradient(to top right, ${props => props.color1} 30%, ${props => props.color2} 70%);
    }
`;

export default GradientContainer;
