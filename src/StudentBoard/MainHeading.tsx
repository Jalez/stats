import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


interface MainHeadingProps {
    isLoading?: boolean;
    children?: React.ReactNode;
}

/**
 * @description A main heading component that shows a skeleton if isLoading is true. By default, isLoading is false
 * @param {MainHeadingProps} { isLoading, children } 
 * @returns {React.ReactNode}
 */
const MainHeading = ({ isLoading= false, children }: MainHeadingProps) => {
    return (
        <h1
            style={{
                backdropFilter: 'blur(2px)',
                display: 'inline-block',
                textAlign: 'center',
                margin: '0 auto',
                width: '100%',
                fontWeight: 'bold',
            }}>
            {isLoading ? <Skeleton height={30} width={200} /> : children}
        </h1>
    )
}

export default MainHeading