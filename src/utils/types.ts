export interface Score {
	id: number;
	score: number;
	differential: number;
}

export interface Player {
	id: number;
	firstname: string;
	lastname: string;
}

export interface PlayerProfile {
	userid?: number;
	firstname: string;
	lastname: string;
	index: number;
}

export interface TableScore {
	id: number;
	userid: number;
	courseid: number;
	teeName: string;
	teeGender: string;
	score: number;
	differential: number;
	_created: string;
	clubname: string;
}

export interface Friend {
	id: number;
	firstname: string;
	lastname: string;
	index: number;
}

export type RoundData = {
	selectedCourseId: number;
	selectedCourseName: string;
	slope: number;
	courseRating: number;
	teeGender: string;
	selectedTee: string;
	playingPartner: Friend | null;
};

export interface GolfCourse {
	id: number;
	clubname: string;
	city: string;
	state: string;
	tees: TeeBox[];
}

export interface TeeBox {
	name: string;
	gender: string;
	par: number;
	courseRating: number;
	bogeyRating: number;
	slopeRating: number;
}
