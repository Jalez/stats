/** @format */

import { useState } from 'react';
import HoverImage from '../StyledComponents/HoverImage';
import Sun from '../StyledComponents/Sun';
import { Level } from '../types';

interface PassedLevelIconProps {
  level: Level;
}

const PassedLevelIcon: React.FC<PassedLevelIconProps> = ({ level }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '50px',
        height: '50px',
        margin: '10px',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Sun color={level?.colors[0] || 'white'} size={47} />
      <HoverImage
        backgroundImage={level?.badge.background || ''}
        foregroundImage={level?.badge.foreground || ''}
        backgroundImageSize={'50px'}
        foregroundImageSize={'35px'}
      />
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '14px',
          }}>
          Level {level.level}: {level.name}
        </div>
      )}
    </div>
  );
};

export default PassedLevelIcon;
