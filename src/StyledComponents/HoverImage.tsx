import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface HoverImageProps {
  backgroundImage: string;
  foregroundImage: string;
  backgroundImageSize?: number | string;
  foregroundImageSize?: number | string;
}

interface BackgroundProps {
  image: string | undefined;
  size?: string | number;
}

const Background = styled.div<BackgroundProps>`
  position: relative;
  background-image: url(${props => props.image});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: ${props => props.size || '100px'};
  width: ${props => props.size || '100px'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ForegroundProps {
  size?: string | number;
}

const Foreground = styled.img<ForegroundProps>`
  position: relative;
  height: ${props => props.size || '50px'};
  width: ${props => props.size || '50px'};
  object-fit: contain;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  
  transform: translate(-50%, -50%);
  transition: all 0.5s ease-in-out;
  filter: drop-shadow(0 0 0.75rem #000);
  animation: move 4s infinite;

  &:hover {
    transform: scale(2) translate(-50%, -50%);
    filter: drop-shadow(0 10px 1rem #000);
    animation-play-state: paused;
  }

  @keyframes move {
    0%, 100% {
      transform: translate(-50%, -50%);
    }
    50% {
      transform: translate(-50%, -60%);
    }
  }
`;

const HoverImage: React.FC<HoverImageProps> = ({ backgroundImage, foregroundImage, backgroundImageSize, foregroundImageSize }) => {
  const backgroundRef = useRef<HTMLImageElement>(null);
  const foregroundRef = useRef<HTMLImageElement>(null);

  const adjustSize = () => {
    if (backgroundRef.current && foregroundRef.current) {
      foregroundRef.current.style.height = `${foregroundImageSize}px`;
      foregroundRef.current.style.width = 'auto';
    }
  };

  useEffect(() => {
    window.addEventListener('resize', adjustSize);
    adjustSize();
    return () => window.removeEventListener('resize', adjustSize);
  }, []);


  return (
    <Background
      ref = {backgroundRef}
      image={backgroundImage}
      size={backgroundImageSize}
     >
      <Foreground ref={foregroundRef} src={foregroundImage} alt="Foreground" 
      size={foregroundImageSize}
      />
    </Background>
  );
};

export default HoverImage;
