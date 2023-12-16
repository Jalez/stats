/** @format */

import ProgressBar from './ProgressBar';
import StudentStats from './StudentStats';
import useStore from '../zustand/store';
import ScoreChart from './ScoreChart';
import HighScores from './HighScores';
import 'react-loading-skeleton/dist/skeleton.css';
import MainHeading from './MainHeading';
import FlexContainer from '../StyledComponents/FlexContainer';

const StudentBoard = () => {
  const { your_best_submission, all_submissions, lower_is_better } = useStore(
    (state) => state
  );

  let all_scores = all_submissions?.map((submission) => submission.points);
  if (lower_is_better) {
    all_scores = all_scores?.sort((a, b) => a - b) || [];
  } else {
    all_scores = all_scores?.sort((a, b) => b - a) || [];
  }

  const seenHighScores = localStorage.getItem('seenHighScores');

  return (
    <>
      {/* make mainheading and student stats not scroll away */}
      <div
        style={{
          position: 'sticky',
          top: '0px',
          zIndex: 10,
          backgroundColor: 'white',
          // give it a border bottom
          borderBottom: '1px solid #eaeaea',
        }}>
        <MainHeading>Available Statistics</MainHeading>
        <StudentStats />
      </div>
      <FlexContainer>
        {your_best_submission?.points && your_best_submission.points > 0 && (
          <>
            <ProgressBar />
          </>
        )}
        <ScoreChart />
        {your_best_submission?.points &&
          all_scores &&
          all_scores?.length > 50 &&
          ((all_scores.indexOf(your_best_submission.points) < 50 &&
            all_scores.indexOf(your_best_submission.points) != -1) ||
            seenHighScores) && <HighScores />}
      </FlexContainer>
    </>
  );
};

export default StudentBoard;
