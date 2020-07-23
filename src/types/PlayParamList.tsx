import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { TeeBox, Friend } from '../utils/types';

export type PlayParamList = {
	PlaySetup: undefined;
	Scorecard: {
		selectedCourseId: number;
		selectedCourseName: string;
		selectedTee: TeeBox;
		playingPartner: Friend;
	};
};
