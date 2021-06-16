import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

interface MultiplayerScoreRowProps {
	playerName: string;
	playerScorecard: number[];
	opponentScorecard: number[];
	matchScore: number;
	setMatchScore: React.Dispatch<React.SetStateAction<number>>;
}

export const MultiplayerScoreRow: React.FC<MultiplayerScoreRowProps> = ({
	playerName,
	playerScorecard,
	opponentScorecard,
	matchScore,
	setMatchScore,
}) => {
	const [frontNineTotal, setFrontNineTotal] = useState<number>(0);
	const [backNineTotal, setBackNineTotal] = useState<number>(0);
	const [score, setScore] = useState<number>(0);

	const scoreInputs = [];

	// initialize an array of TextInputs
	for (let i = 0; i < 18; i++) {
		scoreInputs.push(
			<TextInput
				style={{
					height: '100%',
					width: '100%',
					textAlign: 'center',
					fontSize: 18,
				}}
				onChangeText={score => {
					updateScorecard(score, i);
					// updateMatchScore(score, i);
				}}
			/>
		);
	}

	const updateScorecard = (score: string, index: number) => {
		playerScorecard[index] = Number(score);
		console.log(`${playerName}'s scores are: ` + playerScorecard);
		if (index < 9) {
			let newNineTotal = playerScorecard
				.slice(0, 9)
				.reduce((acc, cur) => acc + cur);
			setFrontNineTotal(newNineTotal);
			setScore(backNineTotal + newNineTotal);
		} else {
			let newNineTotal = playerScorecard
				.slice(9)
				.reduce((acc, cur) => acc + cur);
			setBackNineTotal(newNineTotal);
			setScore(frontNineTotal + newNineTotal);
		}
		updateMatchScore(score, index);
	};

	const updateMatchScore = (score: string, index: number) => {
		// compare player's score to opponent's score and adjust matchScore array
		if (opponentScorecard[index] !== 0) {
			if (Number(score) > opponentScorecard[index]) {
				setMatchScore(matchScore--);
			} else if (Number(score) < opponentScorecard[index]) {
				setMatchScore(matchScore++);
			}
			console.log('match score: ' + matchScore);
			// else {
			// 	index === 0
			// 		? (matchArray[index] = 0)
			// 		: (matchArray[index] = matchArray[index - 1]);
			// }
		}
	};

	return (
		<View
			style={{
				flexDirection: 'row',
				backgroundColor: '#fff',
			}}
		>
			<View
				style={{
					width: 75,
					height: 60,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text style={{ fontSize: 18 }}>{playerName}</Text>
			</View>
			{scoreInputs.slice(0, 9).map((value, index) => {
				return (
					<View
						key={`front-${index}`}
						style={{
							width: 60,
							height: 60,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{value}
					</View>
				);
			})}
			<View
				style={{
					width: 60,
					height: 60,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text style={{ fontSize: 18 }}>{frontNineTotal}</Text>
			</View>
			{scoreInputs.slice(9).map((value, index) => {
				return (
					<View
						key={`front-${index}`}
						style={{
							width: 60,
							height: 60,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{value}
					</View>
				);
			})}
			<View
				style={{
					width: 60,
					height: 60,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text style={{ fontSize: 18 }}>{backNineTotal}</Text>
			</View>
			<View
				style={{
					width: 60,
					height: 60,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text style={{ fontSize: 18 }}>{score}</Text>
			</View>
		</View>
	);
};
