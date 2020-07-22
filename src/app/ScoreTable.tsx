import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../shared/Card';
import { apiService } from '../utils/api';
import { ScoreTableRow } from './ScoreTableRow';
import { LoadingCircle } from '../shared/LoadingCircle';
import { AuthContext } from '../auth/AuthProvider';

interface ScoreTableProps {
	userid: number;
}

export const ScoreTable: React.FC<ScoreTableProps> = ({ userid }) => {
	const { numPosts } = useContext(AuthContext);

	const [scores, setScores] = useState<TableScore[]>([]);
	const [loading, setLoading] = useState(true);

	const getScoreData = async () => {
		try {
			let scores = await apiService(
				`https://pressgolfapp.herokuapp.com/api/scores/${userid}`
			);
			setScores(scores);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getScoreData();
	}, [numPosts]);

	const renderHeader = () => {
		return (
			<View
				style={{
					flex: 1,
					alignSelf: 'stretch',
					flexDirection: 'row',
				}}
			>
				<View
					style={{
						flex: 3,
						alignSelf: 'stretch',
						marginRight: 10,
					}}
				>
					<Text style={styles.bold}>Course</Text>
				</View>
				<View style={{ flex: 1, alignSelf: 'stretch' }}>
					<Text style={styles.bold}>Score</Text>
				</View>
				<View
					style={{
						flex: 1,
						alignSelf: 'stretch',
					}}
				>
					<Text style={styles.bold}>Diff.</Text>
				</View>
				<View
					style={{
						flex: 1,
						alignSelf: 'stretch',
					}}
				>
					<Text style={styles.bold}>Date</Text>
				</View>
			</View>
		);
	};

	const renderScores = () => {
		return scores.map(score => {
			return (
				<ScoreTableRow
					key={score.id}
					course={score.clubname}
					score={score.score}
					differential={score.differential}
					date={score._created}
				/>
			);
		});
	};

	if (loading) {
		return (
			<Card>
				<LoadingCircle />
			</Card>
		);
	}

	return (
		<Card>
			{renderHeader()}
			{renderScores()}
		</Card>
	);
};

const styles = StyleSheet.create({
	bold: {
		fontWeight: 'bold',
	},
});

interface TableScore {
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
