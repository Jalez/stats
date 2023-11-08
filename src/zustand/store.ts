/** @format */

import { create } from 'zustand';
import { Level, range, submission, viewer_type } from '../types';
import level1Img from '../assets/level 1 - BS.png';
import level2Img from '../assets/level 2 - CM.png';
import level3Img from '../assets/level 3 - PB.png';
import level4Img from '../assets/level 4 - AA.png';
import level5Img from '../assets/level 5 - DSD.png';
import level6Img from '../assets/level 6 - DSS.png';


export type StoreState = {
	exercise: {
		id: number;
		exercise_id: number;
		deadline: string;
		course: number;
	};
	user_id: number;
	data_from_lti: Record<string, string>;
	ranges: range[];
	levels: Record<number, Level>;
	viewer_type: 'student' | 'teacher';
	your_best_submission: submission | undefined;
	your_all_submissions: submission[];
	your_range_details: range | undefined;
	all_submissions: submission[];
	lower_is_better: boolean;
	// changeLevelRange: (level: number, range: number[]) => void;
	setViewerType: (viewer_type: 'student' | 'teacher') => void;
	setYourBestSubmission: (your_best_submission: submission) => void;
	setAllSubmissions: (all_submissions: submission[]) => void;
	setLevels: (levels: Record<number, Level>) => void;
	addNewSubmission: (submission: submission) => void;
	updateLevels: (levels: Record<number, Level>) => void;
	calculateYourRangeDetails: () => void;
	setRanges: (ranges: range[]) => void;
	updateAllSubmissions: (submissions: submission[]) => void;
	changeUser: (user_id: number) => void;
	searchForYourBestSubmission: () => void;
	updateSubmission: (submission: submission) => void;
};

const returnIfLocalhost = (localhostValue: any, releaseValue: any) => {
	return window.location.hostname === 'localhost' && localhostValue || releaseValue;  
}

const useStore = create<StoreState>((set) => ({
	exercise: {
		"id": 1,
		"exercise_id": 42,
		"deadline": "2023-11-02T12:29:16.914169+02:00",
		"course": 1
	},
	user_id: 99,
	data_from_lti: {},
	ranges: [
        {
            "id": 1,
            "upper_limit": 104106,
            "lower_limit": 9223372036854775807,
            "updated": "2023-11-01T12:29:17.167697+02:00",
            "percentage": 0,
            "exercise": 1
        },
        {
            "id": 2,
            "upper_limit": 84908,
            "lower_limit": 104105,
            "updated": "2023-11-01T12:29:17.167697+02:00",
            "percentage": 20,
            "exercise": 1
        },
        {
            "id": 3,
            "upper_limit": 27716,
            "lower_limit": 84907,
            "updated": "2023-11-01T12:29:17.167697+02:00",
            "percentage": 40,
            "exercise": 1
        },
        {
            "id": 4,
            "upper_limit": 5562,
            "lower_limit": 27715,
            "updated": "2023-11-01T12:29:17.167697+02:00",
            "percentage": 60,
            "exercise": 1
        },
        {
            "id": 5,
            "upper_limit": 3005,
            "lower_limit": 5561,
            "updated": "2023-11-01T12:29:17.167697+02:00",
            "percentage": 80,
            "exercise": 1
        },
        {
            "id": 6,
            "upper_limit": -1,
            "lower_limit": 3004,
            "updated": "2023-11-01T12:29:17.167697+02:00",
            "percentage": 100,
            "exercise": 1
        }
    ],
	levels: {
		1: {
			name: 'Bug squasher',
			colors: ['#fef2ca', '#318874'],
			badge: level1Img,
		},
		2: {
			name: 'Code monkey',
			colors: ['#415b5e', '#fde5b4'],
			badge: level2Img,
		},
		3: {
			name: 'Performance brewer',
			colors: ['#fe6a77', '#a38271'],
			badge: level3Img,
		},
		4: {
			name: 'Algorithmic alchemist',
			colors: ['#8f476a', '#b28869'],
			badge: level4Img,
		},
		5: {
			name: 'Data Structure druid',
			colors: ['#5f877d', '#5f877d'],
			badge: level5Img,
		},
		6: {
			name: 'Binary sorcerer supreme',
			colors: ['#ffe6ab', '#2a293c'],
			badge: level6Img,
		},
	},
	all_submissions: [{
		"aplus_id": 1,
		"points": 210207,
		"_order": 0,
		"exercise": 1
	},
	{
		"aplus_id": 2,
		"points": 297014,
		"_order": 0,
		"exercise": 1
	},
	{
		"aplus_id": 4,
		"points": 328732,
		"_order": 0,
		"exercise": 1
	},
	{
		"aplus_id": 5,
		"points": 410608,
		"_order": 0,
		"exercise": 1
	},
	{
		"aplus_id": 6,
		"points": 254661,
		"_order": 0,
		"exercise": 1
	},
	{
		"aplus_id": 7,
		"points": 150429,
		"_order": 0,
		"exercise": 1
	},
	{
		"aplus_id": 9,
		"points": 1861412,
		"_order": 0,
		"exercise": 1
	},
	{
		"aplus_id": 10,
		"points": 301254,
		"_order": 0,
		"exercise": 1
	},
	{
		"aplus_id": 11,
		"points": 313719,
		"_order": 0,
		"exercise": 1
	},
	{
		"aplus_id": 12,
		"points": 43833,
		"_order": 0,
		"exercise": 1
	}],
	lower_is_better: true,
	selected_student: 0, //The students id
	viewer_type: returnIfLocalhost("teacher", "student") as 'student' | 'teacher',
	your_best_submission: undefined,
	your_range_details: undefined,
	your_all_submissions: [        {
		"aplus_id": 12,
		"points": 43833,
		"_order": 0,
		"exercise": 1
	}],
	updateRanges: (ranges: {
		id: number;
		upper_limit: number;
		lower_limit: number;
		updated: string;
		percentage: number;
		exercise: number;
	}[]) => {
		// update the ranges in the backend
		set({ ranges });
	}
	,
	setViewerType: (viewer_type: viewer_type) => {
		set({ viewer_type });
	},
	setYourBestSubmission: (your_best_submission: submission) => {
		set({ your_best_submission });
	},
	updateSubmission: (submission: submission) => {
		// update the submission in the backend
		set((state) => ({
			all_submissions: state.all_submissions.map((sub) => {
				if (sub.aplus_id === submission.aplus_id) {
					return submission;
				} else {
					return sub;
				}
			}),
		}));
	},
	// Create a function that sets me search and set the best submission
	searchForYourBestSubmission: () => {
		set((state) => ({
			your_best_submission: state.all_submissions.find((submission) => {
				return submission.aplus_id === state.user_id;
			}),
		}));
	},
	setAllSubmissions: (all_submissions: submission[]) => {
		console.log("setting all submissions, ", all_submissions)
		set({ all_submissions });
	},
	setLevels: (levels: Record<number, Level>) => {
		set({ levels });
	},
	addNewSubmission: (submission: submission) => {
		set((state) => ({
			all_submissions: [...state.all_submissions, submission],
		}));
	},
	updateAllSubmissions: (submissions: submission[]) => {
		console.log("updating all submissions, ", submissions)
		set((state) => ({
			all_submissions: [...state.all_submissions, ...submissions],
		}));
	},
	updateLevels: (levels: Record<number, Level>) => {
		set((state) => ({
			levels: {
				...state.levels,
				...levels,
			},
		}));
	},
	sortSubmissions: () => {
		set((state) => ({
			all_submissions: state.all_submissions.sort((a, b) => {
				if (state.lower_is_better) {
					return a.points - b.points;
				} else {
					return b.points - a.points;
				}
			}),
		}));
	},
	calculateYourRangeDetails: () => {
		// look for the range that your best submission is in. Take lower_is_better into account
		set((state) => ({
			your_range_details: state.ranges[state.ranges.findIndex((range) => {
				if(!state.your_best_submission) return false;
				if (state.lower_is_better) {
					if(range.upper_limit === -1) return true;
					return state.your_best_submission.points > range.lower_limit;
				} else {
					return state.your_best_submission.points < range.upper_limit;
				}
			})-1]
		}));
	}
	// checkLowerIsBetter: () => {
	// 	set((state) => ({
	// 		lower_is_better: state.levels[1].range[0] < state.levels[1].range[1],
	// 	}));
	// 	// call sortSubmissions to sort the submissions
	// 	set((state) => ({
	// 		all_submissions: state.all_submissions.sort((a, b) => {
	// 			if (state.lower_is_better) {
	// 				return a.points - b.points;
	// 			} else {
	// 				return b.points - a.points;
	// 			}
	// 		}),
	// 	}));

	// },
	,
	setRanges: (ranges: range[]) => {
		console.log("setting ranges, ", ranges)
		set({ ranges });
	},
	changeUser: (user_id: number) => {
		// set the user_id and then call searchForYourBestSubmission to find the best submission
		
		set({ user_id });
	}


}));

type NotificationStoreState = {
	notification: string | null;
	notificationType: string | null;
	setNotificationType: (notificationType: string) => void;
	setNotification: (notification: string) => void;
};

export const useNotificationStore = create<NotificationStoreState>((set) => ({
	notification: null,
	notificationType: null as 'success' | 'error' | 'info' | 'warning' | null,
	setNotificationType: (notificationType: string) => {
		set({ notificationType });
	},
	setNotification: (notification: string) => {
		set({ notification });
	},
}));

export default useStore;
