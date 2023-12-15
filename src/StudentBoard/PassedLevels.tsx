import ShadowedContainer from "../StyledComponents/ShadowedContainer"
import { Level } from "../types";
import useStore from "../zustand/store"
import PassedLevelIcon from "./PassedLevelIcon";

const PassedLevels = () => {
    const { levels, your_level_details } = useStore(state => state);
    // Get all the levels that the student has passed (including the current one)
    if(!your_level_details) return null
    const passedLevels = levels.filter((l: Level) => {
        return l.level <= your_level_details?.level

    })
    return (
        <ShadowedContainer>
            <h2
            style={{
                textAlign: 'center',
            }}
            >Passed Levels</h2>
            <div
             style={{
                 display: 'flex',
                 flexDirection: 'row',
                 alignItems: 'center',
                 justifyContent: 'center',
                 textAlign: 'center',
                 flexWrap: 'wrap',
                }}
                >

            {
                passedLevels.map((level, i:number) => {
                    return (
                        <PassedLevelIcon
                            key={i}
                            level={level}
                            />
                            )
                        })
                    }
                    </div>

            
        </ShadowedContainer>
    )
}

export default PassedLevels