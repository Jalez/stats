/** @format */

export type Level = {
	range: number[];
	name: string;
	// reward should be object with amount key, points key and img key
	reward: reward;
	colors: string[];
	img: string;
};

export type reward = {
	amount: number;
	points: number;
	img?: string;
};

export type viewer_type = 'student' | 'teacher';
