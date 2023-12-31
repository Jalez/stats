/** @format */

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import useStore, { StoreState } from '../zustand/store';
import { ChartData, Chart as ChartJS, registerables } from 'chart.js';
import { Level, range } from '../types';
import ShadowedContainer from '../StyledComponents/ShadowedContainer';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

ChartJS.register(...registerables);

const ScoreChart: React.FC = () => {
  const {
    all_submissions,
    levels,
    ranges,
    isLoadingRanges,
    isLoadingSubmissions,
  } = useStore((state: StoreState) => state);
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: [],
  });
  const [isWideScreen, setIsWideScreen] = useState<boolean>(false);

  useEffect(() => {
    if (!all_submissions || !ranges) return;
    const all_scores = all_submissions.map((submission) => submission.points);
    if (ranges) setChartData(processData(levels, all_scores, ranges));
  }, [levels, all_submissions, ranges]);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 480); // Adjust the width threshold as needed
    };

    handleResize(); // Check initial screen width
    window.addEventListener('resize', handleResize); // Listen for screen width changes

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up the event listener
    };
  }, []);

  const sanitizeRangeLimit = (limit: number) => {
    // if limit is closer to infinity, simply return "infinity"
    if (limit > 9223372036854776000) {
      return 'infinity';
    }
    if (limit < -9223372036854776000) {
      return '-infinity';
    }
    if (limit < 0) {
      return '0';
    }
    return limit;
  };

  function processData(
    levels: Level[],
    all_scores: number[],
    ranges: any[] // You should define the proper type for 'ranges'
  ): ChartData<'bar'> {
    // Create a label for each range
    const labels = ranges.map((range, index) => {
      // if(range.id <= Object.keys(levels).length) {
      return `${index + 1}: ${sanitizeRangeLimit(
        range.lower_limit
      )}-${sanitizeRangeLimit(range.upper_limit)}`;
      // }
    });

    // Initialize a dataset for each level with an array of zeros
    const datasets = levels.map((level) => {
      return {
        label: `lvl ${level.level}\n(${(level.percentage / 100) * 250} p)`,
        data: new Array(ranges.length).fill(0), // Initialize with zeros for each range
        backgroundColor: level.colors[0],
      };
    });

    // Populate the data for each dataset
    all_scores.forEach((score) => {
      ranges.forEach((range: range) => {
        const scoreIsInLevel =
          score >= range.lower_limit && score <= range.upper_limit;
        if (scoreIsInLevel) {
          // find the level that shares it's percentage
          const level = levels.find(
            (level) => level.percentage === range.percentage
          );
          const index = level?.level ? level.level - 1 : 0;
          // Increment the count for the corresponding level and range
          //   check if range is in levels, if not, skip
          // if(range.id <= levels.length) {
          datasets[index].data[index]++;
          // }
        }
      });
    });

    return {
      labels,
      datasets,
    };
  }

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Number of students in each level',
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label +=
                context.parsed.y +
                ' student' +
                (context.parsed.y !== 1 ? 's' : '');
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Students',
        },
      },
    },
    maintainAspectRatio: true,
  };

  return (
    <ShadowedContainer flex={3}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: 'fit-content',
          textAlign: 'center',
          padding: '1rem',
        }}>
        <h2>Levels & students</h2>
        {(!isWideScreen && (
          <p>
            Rotate your device or make your screen bigger to see the level chart
          </p>
        )) || (
          <p>
            Each bar represents a level. The number of students in each level is
            shown by hovering the mouse over the bar. The higher your level is,
            the bigger the reward you get.
          </p>
        )}
      </div>
      {((isLoadingSubmissions || isLoadingRanges) && (
        <Skeleton
          height={250}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        />
      )) ||
        (isWideScreen && (
          <Bar
            data={chartData}
            options={options}
            // make sure it's always big enough to show the chart
          />
        ))}
    </ShadowedContainer>
  );
};

export default ScoreChart;
