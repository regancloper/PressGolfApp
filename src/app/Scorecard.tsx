import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PlayParamList } from '../types/PlayParamList';
import { RouteProp } from '@react-navigation/native';
import { Center } from '../shared/Center';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { apiService } from '../utils/api';

interface ScorecardProps {
	navigation: StackNavigationProp<PlayParamList, 'Scorecard'>;
	route: RouteProp<PlayParamList, 'Scorecard'>;
}

export const Scorecard: React.FC<ScorecardProps> = ({ navigation, route }) => {
	const { playingPartner } = route.params;
	const { selectedCourseId } = route.params;
	const { selectedCourseName } = route.params;
	const { selectedTee } = route.params;

	const [value, onChangeText] = useState('');

	const [holes, setHoles] = useState<number[]>([]);
	const [frontNinePar, setFrontNinePar] = useState(0);
	const [backNinePar, setBackNinePar] = useState(0);
	const [p1Scorecard, setP1Scorecard] = useState<Array<number | null>>([
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
	]);
	const [p1FrontNineTotal, setP1FrontNineTotal] = useState<number>(0);
	const [p1BackNineTotal, setP1BackNineTotal] = useState<number>(0);

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
			<Text>{playingPartner.firstname}</Text>
			<Text>{selectedCourseId}</Text>
			<Text>{selectedCourseName}</Text>
			<Text>{selectedTee.name}</Text>
			<ScrollView horizontal>
				<View style={{ flex: 1 }}>
					{/* ROW FOR EACH HOLE OF COURSE */}
					<View
						style={{
							flexDirection: 'row',
							backgroundColor: 'pink',
							borderTopLeftRadius: 25,
							borderTopRightRadius: 25,
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
							<Text style={{ fontSize: 18 }}>Hole</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>1</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>2</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>3</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>4</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>5</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>6</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>7</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>8</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>9</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>Out</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>10</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>11</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>12</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>13</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>14</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>15</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>16</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>17</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>18 </Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>In </Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>Total </Text>
						</View>
					</View>
					{/* ROW FOR PAR OF COURSE */}
					<View
						style={{
							flexDirection: 'row',
							backgroundColor: 'coral',
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
							<Text style={{ fontSize: 18 }}>Par</Text>
						</View>
						{holes.slice(0, 9).map((hole, index) => (
							<View
								key={`front-${index}`}
								style={{
									width: 60,
									height: 60,
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Text style={{ fontSize: 18 }}>{hole}</Text>
							</View>
						))}
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>{frontNinePar}</Text>
						</View>
						{holes.slice(9).map((hole, index) => (
							<View
								key={`front-${index}`}
								style={{
									width: 60,
									height: 60,
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Text style={{ fontSize: 18 }}>{hole}</Text>
							</View>
						))}
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>{backNinePar}</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 18 }}>{frontNinePar + backNinePar}</Text>
						</View>
					</View>
					{/* ROW FOR PLAYER ONE */}
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
							<Text style={{ fontSize: 18 }}>Regan</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<TextInput
								style={{
									height: '100%',
									width: '100%',
									textAlign: 'center',
									fontSize: 18,
								}}
								onChangeText={text => onChangeText(text)}
								value={value}
							/>
						</View>
					</View>
				</View>
			</ScrollView>
		</Center>
	);
};
