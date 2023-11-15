/** @format */

import { create } from 'zustand';
import { Level, exercise, range, submission, viewer_type } from '../types';

import getApiData from '../utils/getApiData';

import level1bkrn from '../assets/level 1 - BKRND.png';
import level2bkrn from '../assets/level 2 - BKRND.png';
import level3bkrn from '../assets/level 3 - BKRND.png';
import level4bkrn from '../assets/level 4 - BKRND.png';
import level5bkrn from '../assets/level 5 - BKRND.png';
import level6bkrn from '../assets/level 6 - BKRND.png';

import beetle from '../assets/beetle.png';
import monkey from '../assets/monkey.png';
import bottle from '../assets/bottle.png';
import wizardHat1 from '../assets/wizardhat-1.png';
import wizardHat2 from '../assets/wizardhat-2.png';
import wizardHat3 from '../assets/wizardhat-3.png';



export type StoreState = {
	exercise: exercise | undefined;
	user_id: number | undefined;
	data_from_lti: Record<string, string>;
	ranges: range[] | undefined;
	levels: Level[];
	viewer_type: 'student' | 'teacher';
	your_best_submission: submission | undefined;
	your_all_submissions: submission[] | undefined;
	your_range_details: range | undefined;
	your_level_details: Level | undefined;
	all_submissions: submission[] | undefined;
	lower_is_better: boolean;
	isLoadingExercise: boolean;
	isLoadingSubmissions: boolean;
	isLoadingRanges: boolean;
	// changeLevelRange: (level: number, range: number[]) => void;
	setViewerType: (viewer_type: 'student' | 'teacher') => void;
	setYourBestSubmission: (your_best_submission: submission) => void;
	setAllSubmissions: (all_submissions: submission[]) => void;
	setLevels: (levels: Level[]) => void;
	addNewSubmission: (submission: submission) => void;
	updateLevels: (levels: Record<number, Level>) => void;
	calculateYourRangeDetails: () => void;
	setRanges: (ranges: range[]) => void;
	updateAllSubmissions: (submissions: submission[]) => void;
	changeUser: (user_id: number) => void;
	searchForYourBestSubmission: () => void;
	updateSubmission: (submission: submission) => void;
	setExercise: (exercise: exercise) => void;
	setDataFromLti : (data_from_lti: Record<string, string>) => void;
	updateYourLevelDetails: (range: range) => void;
	setLoadingExercise: (isLoadingExercise: boolean) => void;
	setLoadingSubmissions: (isLoadingSubmissions: boolean) => void;
	setLoadingRanges: (isLoadingRanges: boolean) => void;
	getRanges: (exercise_id: number) => void;
	getExercise: (exercise_id: number) => void;
	getSubmissions: (exercise_id: number) => void;
};

// const returnIfLocalhost = (localhostValue: any, releaseValue: any) => {
// 	return window.location.hostname === 'localhost' && localhostValue || releaseValue;  
// }

const useStore = create<StoreState>((set) => ({
	exercise: undefined,
	user_id: undefined,
	data_from_lti: {},
	ranges: undefined,
	levels: [
		{
			level: 1,
			name: 'Bug squasher',
			colors: ['#318874', '#fef2ca'],
			badge: {
				foreground: beetle,
				background: level1bkrn,
			},
			percentage: 0,
		},
		{
			level: 2,
			name: 'Code monkey',
			colors: ['#415b5e', '#fde5b4'],
			badge: {
				foreground: monkey,
				background: level2bkrn,
			},
			percentage: 20,
		},
		{
			level: 3,
			name: 'Performance brewer',
			colors: ['#fe6a77', '#a38271'],
			badge: {
				foreground: bottle,
				background: level3bkrn,
			},
			percentage: 40,
		},
		{
			level: 4,
			name: 'Algorithmic alchemist',
			colors: ['#8f476a', '#b28869'],
			badge: {
				foreground: wizardHat1,
				background: level4bkrn,
			},
			percentage: 60,
		},
		{
			level: 5,
			name: 'Data Structure druid',
			colors: ['#5f877d', '#5f877d'],
			badge: {
				foreground: wizardHat2,
				background: level5bkrn,
			
			},
			percentage: 80,
		},
		{
			level: 6,
			name: 'Binary sorcerer supreme',
			colors: ['#ffe6ab', '#2a293c'],
			badge: {
				foreground: wizardHat3,
				background: level6bkrn,
			},
			percentage: 100,
		},
	],
	all_submissions: undefined,
	lower_is_better: true,
	selected_student: undefined, //The students id
	viewer_type: 'student',
	your_best_submission: undefined,
	your_range_details: undefined,
	your_level_details: undefined,
	your_all_submissions: undefined,
	isLoadingExercise: true,
	isLoadingSubmissions: true,
	isLoadingRanges: true,
	setLoadingExercise: (isLoadingExercise: boolean) => {
		set({ isLoadingExercise });
	},
	setLoadingSubmissions: (isLoadingSubmissions: boolean) => {
		set({ isLoadingSubmissions });
	},
	setLoadingRanges: (isLoadingRanges: boolean) => {
		set({ isLoadingRanges });
	},
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
			all_submissions: state.all_submissions ? state.all_submissions.map((sub) => {
				if (sub.aplus_id === submission.aplus_id) {
					return submission;
				} else {
					return sub;
				}
			}) : undefined,
			
		}));
	},
	// Create a function that sets me search and set the best submission
	searchForYourBestSubmission: () => {
		set((state) => ({
			your_best_submission: state.all_submissions ? state.all_submissions.find((submission) => {
				return submission.aplus_id === state.user_id;
			}) : undefined,
		}));
	},
	setAllSubmissions: (all_submissions: submission[]) => {
		console.log("setting all submissions, ", all_submissions)
		set({ all_submissions });
	},
	setLevels: (levels: Level[]) => {
		set({ levels });
	},
	addNewSubmission: (submission: submission) => {
		set((state) => ({
			all_submissions: state.all_submissions ?  [...state.all_submissions, submission] : [submission],
		}));
	},
	updateAllSubmissions: (submissions: submission[]) => {
		console.log("updating all submissions, ", submissions)
		set((state) => ({
			all_submissions: state.all_submissions ?  [...state.all_submissions, ...submissions] : submissions,
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
			all_submissions: state.all_submissions ? state.all_submissions.sort((a, b) => {
				if (state.lower_is_better) {
					return a.points - b.points;
				} else {
					return b.points - a.points;
				}
			}) : undefined,
		}));
	},
	calculateYourRangeDetails: () => {
		// look for the range that your best submission is in. Take lower_is_better into account
		set((state) => ({
			your_range_details: state?.ranges ? state?.ranges.find((range) => {
				if(!state.your_best_submission) return false;

				if(range.upper_limit >= state.your_best_submission.points) {
					if(range.lower_limit <= state.your_best_submission.points) {
						// call state.updateYourLevelDetails(range);
						state.updateYourLevelDetails(range);
						return true;
					}
				}
				return false;
			}) : undefined,

		}));


	},
	updateYourLevelDetails: ( range: range) => {
		// look for the level that shares the ranges percentage
		set((state) => ({
			your_level_details: state.levels.find((level) => {
				return level.percentage === range.percentage;
			}),
		}));
	},
	setRanges: (ranges: range[]) => {
		console.log("setting ranges, ", ranges)
		set({ ranges });
	},
	changeUser: (user_id: number) => {		
		set({ user_id });
	},
	setExercise: (exercise: exercise) => {
		set({ exercise });
	},
	setDataFromLti : (data_from_lti: Record<string, string>) => {
		set({ data_from_lti });
	},

	getRanges: async (exercise_id: number) => {
		// Give it a time out of 5 seconds before it gives up
		console.log("getting ranges")
		set({ isLoadingRanges: true });
		const route = '/api/ranges/?exercise=' + exercise_id;
		const data = await getApiData(route);
		if (data) {
			const results = data.results;
			// get the first 6 ranges
			const firstSixRanges = results.slice(0, 6);
			set({ ranges: firstSixRanges });
			set({ isLoadingRanges: false });
		}
	},
	getSubmissions: async (exercise_id: number) => {
		console.log("getting submissions")
		// Give it a time out of 5 seconds before it gives up
		set({ isLoadingSubmissions: true });
		const route = '/api/submissions/?exercise=' + exercise_id;
		let data = await getApiData(route);
		if (data) {
			const submissions = data.results;
			while (data.next) {
				//Add s after "http" in the next url, but only if we are not running on localhost
				if (window.location.href.indexOf("localhost") === -1) data.next = data.next.replace("http", "https");
				data = await getApiData(data.next);
				submissions.push(...data.results);
			}
			set({ all_submissions: submissions });
			set({ isLoadingSubmissions: false });
		}
	},

	getExercise: async (exercise_id: number) => {
		console.log("getting exercise")
		// Give it a time out of 5 seconds before it gives up
		set({ isLoadingExercise: true });
		const route = '/api/exercises/?exercise_id=' + exercise_id;
		const data = await getApiData(route);
		if (data?.results) {
			const exerciseData = data.results[0];
			set({ exercise: exerciseData });
			set({ isLoadingExercise: false });

		}
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
