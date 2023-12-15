import styled, { keyframes } from 'styled-components';

const rotateLeft = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

const rotateRight = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
`;

const SunContainer = styled.div<{ color?: string, size: number }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: ${props => props.size || 70}px;
    height: ${props => props.size || 70}px;
    border-radius: 50%;
    opacity: 0.9;
    box-shadow: 0px 0px ${props => props.size/10}px ${props=>props.size/10}px ${props => props.color || 'white'};
    // overflow: hidden;
`;



const Ray = styled.div<ray>`
    background: -webkit-linear-gradient(top, rgba(${props => props.rayColor},0.0) 0%, rgba(${props => props.rayColor},0.5) 100%);
    margin-left: 10px;
    // border-radius: 0 0 80% 80%;
    position: absolute;
    height: ${props => props.height || 100}px;
    width: ${props => props.width || 70}px;
    transform: rotate(${props => props.rotate || 0}deg);
    -webkit-transform: rotate(${props => props.rotate || 0}deg);
    top: ${props => props.top || 0}px;
    left: ${props => props.left || 0}px;
`;

const RotationRay = styled.div<{ direction?: string, size?: number }>`
    position: absolute;
    margin: auto;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;
    width: ${props => props.size || 70}px;
    animation: ${props => props.direction === 'left' ? rotateLeft : rotateRight} 240s linear infinite;
    -webkit-animation: ${props => props.direction === 'left' ? rotateLeft : rotateRight} 240s linear infinite;
`;

export type ray = { rayColor?: string; height?: number; width?: number; rotate?: number; top?: number; left?: number };

type SunProps = {
    color: string;
    size: number;
};


// const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const createRays = (color: string, sunSize: number, rayNum: number) => {
    sunSize = sunSize / 2; // Adjust for ray width
    const rays = [];
    const angleIncrement = 360 / rayNum;
  
    for (let i = 0; i < rayNum; i++) {
      const rayHeight = Math.random() * (sunSize) - 1; // Random height between 30px and 80px
      const rayWidth = Math.random() * (sunSize/5);  // Random width between 8px and 20px
      const rayRotate = i * angleIncrement;     // Evenly distributed rotation
  
      // Calculate position based on rotation and sun size
      const angleRad = (rayRotate * Math.PI) / 180;
      const rayTop = sunSize / 2 - (rayHeight + sunSize / 2) * Math.cos(angleRad);
      const rayLeft = sunSize / 2 + (rayHeight + sunSize / 2) * Math.sin(angleRad);
  
      rays.push({ rayColor: color, height: rayHeight, width: rayWidth, rotate: rayRotate, top: rayTop, left: rayLeft });
    }
  
    return rays;
  }



const hexToRgb = (hex: string) => {
    // turn hex into rgb
    const hexColor = hex.replace('#', '');
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
}

const Sun = ({ color, size }: SunProps) => {
    // turn color into rgb
    console.log("SUN", color, size)
    const rgbColor = hexToRgb(color);
    const numOfLeftRays = 50;
    const leftRays = createRays(rgbColor, size, numOfLeftRays);
    const numOfRightRays = 50;
    const rightRays = createRays(rgbColor, size, numOfRightRays);
    return (
        <SunContainer color={color} size={size}>
            <RotationRay direction={'left'} size={size}>
                {
                    leftRays.map((ray, i) => (
                        <Ray {...ray} key={i} />
                    ))

                }
            </RotationRay>
            <RotationRay direction={'right'} size={size}>
                {
                    rightRays.map((ray, i) => (
                        <Ray {...ray} key={i} />
                    ))
                }
            </RotationRay>
        </SunContainer>
    );
}
export default Sun;