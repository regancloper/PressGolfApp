import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

interface PlayerScoreRowProps {
	playerName: string;
	scorecard: number[];
}

export const PlayerScoreRow: React.FC<PlayerScoreRowProps> = ({
	playerName,
	scorecard,
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
				onChangeText={score => updateScorecard(score, i)}
			/>
		);
	}

	const updateScorecard = (score: string, index: number) => {
		scorecard[index] = Number(score);
		if (index < 9) {
			let newNineTotal = scorecard.slice(0, 9).reduce((acc, cur) => acc + cur);
			setFrontNineTotal(newNineTotal);
			setScore(backNineTotal + newNineTotal);
		} else {
			let newNineTotal = scorecard.slice(9).reduce((acc, cur) => acc + cur);
			setBackNineTotal(newNineTotal);
			setScore(frontNineTotal + newNineTotal);
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
