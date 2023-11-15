import HoverImage from "../StyledComponents/HoverImage";
import useStore from "../zustand/store";

const StateLevelsDisplayer = () => {
    const { levels } = useStore((state) => state);

    return (
        <>
        <p>
        Levels:{' '}
        </p>
        {/* Create a bootstrap table */}
        <table className='table table-striped table-hover text-center'>
            <thead>
                <tr>
                    <th>Level</th>
                    <th>Name</th>
                    <th>
                        Badge
                    </th>

                </tr>
            </thead>
            <tbody>
                {Object.entries(levels).map(([level, details]) => {
                    return (
                        <tr key={level}>
                            <td>{level}</td>
                            <td>{details.name}</td>
                            <td>
                                <HoverImage
                                 backgroundImage={details.badge.background}
                                    foregroundImage={details.badge.foreground}
                                    backgroundImageSize={40}
                                    foregroundImageSize={30}
                                />
        
                            </td>

                        </tr>
                    );
                })}
            </tbody>
        </table>
                </>
    )
}

export default StateLevelsDisplayer