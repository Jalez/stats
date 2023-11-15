/** @format */

export type Level = {
	level: number;
	name: string;
	colors: string[];
	badge: string;
	percentage: number;
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

export type exercise = {
	id: number;
	exercise_id: number;
	deadline: string;
	number_of_ranges: number;
	lower_is_better: boolean;
	course: number;
};

export type viewer_type = 'student' | 'teacher';
