/** @format */

import StudentBoard from './StudentBoard/StudentBoard';
import View from './View';
import useStore from './zustand/store';
import { useEffect, useState } from 'react';
import ViewSwitch from './ViewSwitch';
import StateDisplayer from './StateDisplayer/StateDisplayer';
import StateEditor from './StateEditor/StateEditor';
import { exercise, range, submission } from './types';

declare global {
  var GLOBAL_DATA: {
    course_id?: number;
    exercise_id?: number;
    instructor?: boolean;
    exercise?: exercise;
    ranges?: range[];
    submissions?: submission[];
    your_submission?: submission;
  };
}
// create a fake global data object if we are testing in local

// check if local
if (window.location.hostname === 'localhost') {
  // create fake global data
  window.GLOBAL_DATA = {
    course_id: 1,
    exercise_id: 1,
    instructor: true,
    exercise: {
      id: 1,
      exercise_id: 1,
      deadline: '2021-09-30T23:59:59.000Z',
      number_of_ranges: 2,
      lower_is_better: false,
      course: 1,
    },
    ranges: [
      {
        id: 1,
        upper_limit: 50,
        lower_limit: 0,
        updated: '2021-09-30T23:59:59.000Z',
        percentage: 0,
        exercise_id: 1,
      },
      {
        id: 2,
        upper_limit: 100,
        lower_limit: 50,
        updated: '2021-09-30T23:59:59.000Z',
        percentage: 20,
        exercise_id: 1,
      },
      {
        id: 3,
        upper_limit: 150,
        lower_limit: 100,
        updated: '2021-09-30T23:59:59.000Z',
        percentage: 40,
        exercise_id: 1,
      },
      {
        id: 4,
        upper_limit: 200,
        lower_limit: 150,
        updated: '2021-09-30T23:59:59.000Z',
        percentage: 60,
        exercise_id: 1,
      },
      {
        id: 5,
        upper_limit: 250,
        lower_limit: 200,
        updated: '2021-09-30T23:59:59.000Z',
        percentage: 80,
        exercise_id: 1,
      },
      {
        id: 6,
        upper_limit: 300,
        lower_limit: 250,
        updated: '2021-09-30T23:59:59.000Z',
        percentage: 100,
        exercise_id: 1,
      },
    ],

    submissions: [
      {
        aplus_id: 1,
        points: 50,
        exercise: 1,
      },
      {
        aplus_id: 2,
        points: 100,
        exercise: 1,
      },
      {
        aplus_id: 3,
        points: 0,
        exercise: 1,
      },
      {
        aplus_id: 4,
        points: 25,
        exercise: 1,
      },
      {
        aplus_id: 5,
        points: 75,
        exercise: 1,
      },
      {
        aplus_id: 6,
        points: 150,
        exercise: 1,
      },
      {
        aplus_id: 7,
        points: 200,
        exercise: 1,
      },
      {
        aplus_id: 8,
        points: 250,
        exercise: 1,
      },
      // create more points between 0 and 250
      {
        aplus_id: 9,
        points: 10,
        exercise: 1,
      },
      {
        aplus_id: 10,
        points: 20,
        exercise: 1,
      },
      {
        aplus_id: 11,
        points: 30,
        exercise: 1,
      },
      {
        aplus_id: 12,
        points: 40,
        exercise: 1,
      },
      {
        aplus_id: 13,
        points: 60,
        exercise: 1,
      },
      {
        aplus_id: 14,
        points: 70,
        exercise: 1,
      },
      {
        aplus_id: 15,
        points: 80,
        exercise: 1,
      },
      {
        aplus_id: 16,
        points: 90,
        exercise: 1,
      },
      {
        aplus_id: 17,
        points: 110,
        exercise: 1,
      },
      {
        aplus_id: 18,
        points: 120,
        exercise: 1,
      },
      {
        aplus_id: 19,
        points: 130,
        exercise: 1,
      },
      {
        aplus_id: 20,
        points: 140,
        exercise: 1,
      },
      {
        aplus_id: 21,
        points: 160,
        exercise: 1,
      },
      {
        aplus_id: 22,
        points: 170,
        exercise: 1,
      },
      {
        aplus_id: 23,
        points: 180,
        exercise: 1,
      },
      {
        aplus_id: 24,
        points: 190,
        exercise: 1,
      },
      {
        aplus_id: 25,
        points: 210,
        exercise: 1,
      },
      {
        aplus_id: 26,
        points: 220,
        exercise: 1,
      },
      {
        aplus_id: 27,
        points: 230,
        exercise: 1,
      },
      {
        aplus_id: 28,
        points: 240,
        exercise: 1,
      },
    ],
    your_submission: {
      aplus_id: 1,
      points: 50,
      exercise: 1,
    },
  };
}

(window as any).GLOBAL_DATA = (window as any).GLOBAL_DATA || {};

function App() {
  const { calculateYourRangeDetails, setDataFromLti } = useStore(
    (state) => state
  );
  const { setAllSubmissions, setExercise, setYourBestSubmission, setRanges } =
    useStore((state) => state);
  const [globalData, setGlobalData] = useState(window.GLOBAL_DATA);

  useEffect(() => {
    const handleGlobalDataChange = () => {
      setGlobalData(window.GLOBAL_DATA);
    };

    window.addEventListener('GLOBAL_DATA_change', handleGlobalDataChange);

    return () => {
      window.removeEventListener('GLOBAL_DATA_change', handleGlobalDataChange);
    };
  }, []);

  useEffect(() => {
    console.log('REACT GLOBAL_DATA', GLOBAL_DATA);
    if (!GLOBAL_DATA.exercise_id) return;

    if (GLOBAL_DATA.exercise) {
      setExercise(GLOBAL_DATA.exercise);
    }
    if (GLOBAL_DATA.ranges) {
      setRanges(GLOBAL_DATA.ranges);
    }
    if (GLOBAL_DATA.submissions) {
      // GLOBAL_DATA.instructor && getSubmissions(GLOBAL_DATA.exercise_id);
      setAllSubmissions(GLOBAL_DATA.submissions);
    }
    if (GLOBAL_DATA.your_submission) {
      setYourBestSubmission(GLOBAL_DATA.your_submission);
      calculateYourRangeDetails();
    }

    setDataFromLti(GLOBAL_DATA as any);
  }, [globalData]);

  return (
    <div className='container'>
      {/* <Notification /> */}
      {GLOBAL_DATA.instructor ? <ViewSwitch /> : null}

      <View for='teacher'>
        <h1>State manager</h1>
        <div className='row'>
          <StateEditor />
          <StateDisplayer />
        </div>
      </View>
      <View for='student'>
        <StudentBoard />
      </View>
    </div>
  );
}

export default App;
