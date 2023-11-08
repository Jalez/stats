/** @format */

export type Level = {
	name: string;
	// reward should be object with amount key, points key and img key
	colors: string[];
	badge: string;
};

export type reward = {
	amount: number;
	points: number;
	img?: string;
};

export type range = {
	id: number;
	upper_limit: number;
	lower_limit: number;
	updated: string;
	percentage: number;
	exercise: number;
};

export type submission = {
	aplus_id: number
	points: number,
	_order: number,
	exercise: number
}

export type viewer_type = 'student' | 'teacher';
