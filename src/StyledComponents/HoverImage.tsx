import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface HoverImageProps {
  backgroundImage: string;
  foregroundImage: string;
    backgroundImageSize?: number;
    foregroundImageSize?: number;
}

const Background = styled.div`
  position: relative;
  max-width: max-content;
`;

const Foreground = styled.img`
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
    <Background>
      <img ref={backgroundRef} src={backgroundImage}
       width={backgroundImageSize}
      alt="Background" />
      <Foreground ref={foregroundRef} src={foregroundImage} alt="Foreground" />
    </Background>
  );
};

export default HoverImage;
