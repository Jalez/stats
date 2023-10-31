/** @format */

import { create } from 'zustand';
import { Level, viewer_type } from '../types';
import level1Img from '../assets/level 1 - BS.png';
import level2Img from '../assets/level 2 - CM.png';
import level3Img from '../assets/level 3 - PB.png';
import level4Img from '../assets/level 4 - AA.png';
import level5Img from '../assets/level 5 - DSD.png';
import level6Img from '../assets/level 6 - DSS.png';

import points from '../assets/points.png';

export type StoreState = {
	assignment_name: string;
	levels: Record<number, Level>;
	viewer_type: 'student' | 'teacher';
	your_best_score: number;
	your_all_scores: number[];
	all_scores: number[];
	lower_is_better: boolean;
	exercise_deadline: Date;
	changeLevelRange: (level: number, range: number[]) => void;
	setViewerType: (viewer_type: 'student' | 'teacher') => void;
	setYourBestScore: (your_best_score: number) => void;
	setAllScores: (all_scores: number[]) => void;
	setLevels: (levels: Record<number, Level>) => void;
};

const useStore = create<StoreState>((set) => ({
	assignment_name: 'Project 1',
	levels: {
		1: {
			range: [0, 1],
			name: 'Bug squasher',
			reward: {
				points: 50,
				amount: 0,
				img: points,
			},
			colors: ['#fef2ca', '#318874'],
			img: level1Img,
		},
		2: {
			range: [2, 3],
			name: 'Code monkey',
			reward: {
				points: 50,
				amount: 1,
				img: points,
			},
			colors: ['#415b5e', '#fde5b4'],
			img: level2Img,
		},
		3: {
			range: [4, 5],
			name: 'Performance brewer',
			reward: {
				points: 50,
				amount: 2,
				img: points,
			},
			colors: ['#fe6a77', '#a38271'],
			img: level3Img,
		},
		4: {
			range: [6, 7],
			name: 'Algorithmic alchemist',
			reward: {
				points: 50,
				amount: 3,
				img: points,
			},
			colors: ['#8f476a', '#b28869'],
			img: level4Img,
		},
		5: {
			range: [8, 9],
			name: 'Data Structure druid',
			reward: {
				points: 50,
				amount: 4,
				img: points,
			},
			colors: ['#5f877d', '#5f877d'],
			img: level5Img,
		},
		6: {
			range: [10, 11],
			name: 'Binary sorcerer supreme',
			reward: {
				points: 50,
				amount: 5,
				img: points,
			},
			colors: ['#ffe6ab', '#2a293c'],
			img: level6Img,
		},
	},
	all_scores: [1, 1, 2, 2, 2, 3, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 11, 11],
	lower_is_better: true,
	exercise_deadline: new Date('2023-11-01T00:00:00'),
	selected_student: 0, //The students id
	viewer_type: 'student' as 'student' | 'teacher',
	your_best_score: 3,
	your_all_scores: [1, 2, 3],
	changeLevelRange: (level: number, range: number[]) => {
		set((state) => ({
			levels: {
				...state.levels,
				[level]: {
					...state.levels[level],
					range,
				},
			},
		}));
	},
	setViewerType: (viewer_type: viewer_type) => {
		set({ viewer_type });
	},
	setYourBestScore: (your_best_score: number) => {
		set({ your_best_score });
	},
	setAllScores: (all_scores: number[]) => {
		set({ all_scores });
	},
	setLevels: (levels: Record<number, Level>) => {
		set({ levels });
	},
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
