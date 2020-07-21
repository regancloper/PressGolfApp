import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

interface ScoreTableRowProps {
	course: string;
	score: number;
	differential: number;
	date: string;
}

export const ScoreTableRow: React.FC<ScoreTableRowProps> = props => {
	const { course, score, differential, date } = props;
	return (
		<View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
			<View
				style={{
					flex: 3,
					alignSelf: 'stretch',
					height: 40,
					marginRight: 10,
				}}
			>
				<Text>{course}</Text>
			</View>
			<View style={{ flex: 1, alignSelf: 'stretch' }}>
				<Text>{score}</Text>
			</View>
			<View
				style={{
					flex: 1,
					alignSelf: 'stretch',
				}}
			>
				<Text>{differential}</Text>
			</View>
			<View
				style={{
					flex: 1,
					alignSelf: 'stretch',
				}}
			>
				<Text>{moment(date).utc().format('MMM. D, YYYY')}</Text>
			</View>
		</View>
	);
};
