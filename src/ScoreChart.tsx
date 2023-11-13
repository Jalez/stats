import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import useStore, { StoreState } from './zustand/store';
import { ChartData, Chart as ChartJS, registerables } from 'chart.js';
import { Level } from './types';
import ShadowedContainer from './ShadowedContainer';

ChartJS.register(...registerables);

const ScoreChart: React.FC = () => {
  const { all_submissions, levels, ranges, lower_is_better } = useStore((state: StoreState) => state);
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });

  if(!all_submissions) return "No submissions found, please select an exercise that has submissions in the api to see student chart";

  useEffect(() => {
    const all_scores = all_submissions.map((submission) => submission.points);
    if(ranges)setChartData(processData(levels, all_scores, ranges, lower_is_better));
  }, [levels, all_submissions, ranges, lower_is_better]);

  if(!ranges) return "No ranges found, please select an exercise that has ranges in the api to see student chart";

  const sanitizeRangeLimit = (limit: number) => {
	// if limit is closer to infinity, simply return "infinity"
	if (limit == 9223372036854776000) {
	  return "infinity";
	}
	if (limit == -9223372036854776000) {
	  return "-infinity";
	}
	if (limit < 0) {
	  return "0";
	}
	return limit;
}


  function processData(
	levels: Record<number, Level>,
	all_scores: number[],
	ranges: any[], // You should define the proper type for 'ranges'
	lower_is_better: boolean
  ): ChartData<"bar"> {
	// Create a label for each range
	
	const labels = ranges.map(range => {
		if(range.id <= Object.keys(levels).length) {
			return `${range.id}: ${sanitizeRangeLimit(range.lower_limit)}-${sanitizeRangeLimit(range.upper_limit)}`
		}
	});
  
	// Initialize a dataset for each level with an array of zeros
	const datasets = Object.keys(levels).map(level=> {
	  return {
		label: `Level ${level}`,
		data: new Array(ranges.length).fill(0), // Initialize with zeros for each range
		backgroundColor: levels[Number(level)].colors[0],
	  };
	});
  
	// Populate the data for each dataset
	all_scores.forEach(score => {
	  ranges.forEach((range, index) => {
		const scoreIsInLevel = lower_is_better
		  ? score <= range.lower_limit && score >= range.upper_limit
		  : score >= range.lower_limit && score <= range.upper_limit;
  
		if (scoreIsInLevel) {
		  // Increment the count for the corresponding level and range
		//   check if range is in levels, if not, skip
		if(range.id <= Object.keys(levels).length) {
			datasets[range.id - 1].data[index]++;
		}

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
		  label: function(context: any) {
			let label = context.dataset.label || '';
			if (label) {
			  label += ': ';
			}
			if (context.parsed.y !== null) {
			  label += context.parsed.y + ' student' + (context.parsed.y !== 1 ? 's' : '');
			}
			return label;
		  }
		}
	  }
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
		  text: 'Number of Students'
		}
	  }
	},
	maintainAspectRatio: true
  };
  

  return (
    <ShadowedContainer

	>
      <h2>Levels & students</h2>
      <Bar
        data={chartData}
        options={options}
      />
    </ShadowedContainer>
  );
};

export default ScoreChart;
