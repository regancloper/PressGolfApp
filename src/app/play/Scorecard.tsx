import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PlayParamList } from '../../types/PlayParamList';
import { RouteProp } from '@react-navigation/native';
import { Center } from '../../shared/Center';
import { apiService } from '../../utils/api';
import { PlayerScoreRow } from './PlayerScoreRow';
import { CourseHolesRow } from './CourseHolesRow';
import { CourseParsRow } from './CourseParsRow';
import { MatchPlayRow } from './MatchPlayRow';
import { MultiplayerScoreRow } from './MultiplayerScoreRow';

interface ScorecardProps {
	navigation: StackNavigationProp<PlayParamList, 'Scorecard'>;
	route: RouteProp<PlayParamList, 'Scorecard'>;
}

export const Scorecard: React.FC<ScorecardProps> = ({ route }) => {
	const { playingPartner } = route.params;
	const { selectedCourseId } = route.params;
	const { selectedCourseName } = route.params;
	const { selectedTee } = route.params;

	const [holes, setHoles] = useState<number[]>([]);
	const [frontNinePar, setFrontNinePar] = useState(0);
	const [backNinePar, setBackNinePar] = useState(0);
	// const [matchScore, setMatchScore] = useState<number[]>(new Array(18).fill(0));
	const [matchScore, setMatchScore] = useState(0);

	// initialize scores arrays for players (and sets p2 scorecard to null if there is no p2)
	const p1Scorecard = new Array(18).fill(0);
	const p2Scorecard = new Array(18).fill(0);

	// const addScoreP1 = (score: number, index: number) => {
	// 	p1Scorecard[index] = score;
	// };

	// get info about each hole's par score
	const getCourseData = async () => {
		try {
			let data: false | { holes: string } = await apiService(
				`https://pressgolfapp.herokuapp.com/api/holes/${selectedCourseId}`
			);
			if (data) {
				const holesArray = data.holes.split('').map(num => Number(num));
				setHoles(holesArray);
				setFrontNinePar(holesArray.slice(0, 9).reduce((acc, cur) => acc + cur));
				setBackNinePar(holesArray.slice(9).reduce((acc, cur) => acc + cur));
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCourseData();
	}, []);

	return (
		<Center>
			<Text>Scorecard</Text>
			<Text>{playingPartner.firstname || 'Playing Solo'}</Text>
			<Text>{selectedCourseId}</Text>
			<Text>{selectedCourseName}</Text>
			<Text>{selectedTee.name}</Text>
			<ScrollView horizontal>
				<View style={{ flex: 1 }}>
					{/* Row for holes 1-18 of the course */}
					<CourseHolesRow />
					{/* Row for par of each hole */}
					<CourseParsRow
						holes={holes}
						frontNinePar={frontNinePar}
						backNinePar={backNinePar}
					/>
					{/* Row for Player 1 */}
					{p2Scorecard ? (
						<MultiplayerScoreRow
							playerName="Regan"
							playerScorecard={p1Scorecard}
							opponentScorecard={p2Scorecard}
							matchScore={matchScore}
							setMatchScore={setMatchScore}
						/>
					) : (
						<PlayerScoreRow playerName="Regan" scorecard={p1Scorecard} />
					)}
					{/* Optional Row for Player 2 */}
					{p2Scorecard && (
						<MultiplayerScoreRow
							playerName={playingPartner.firstname}
							playerScorecard={p2Scorecard}
							opponentScorecard={p1Scorecard}
							matchScore={matchScore}
							setMatchScore={setMatchScore}
						/>
					)}
					<View
						style={{
							flexDirection: 'row',
							backgroundColor: 'lightgrey',
							height: 60,
							alignItems: 'center',
						}}
					></View>
					{/* Row for Match Play results */}
					{/* {playingPartner.firstname !== '' && (
						<MatchPlayRow matchScore={matchScore} />
					)} */}
				</View>
			</ScrollView>
		</Center>
	);
};
