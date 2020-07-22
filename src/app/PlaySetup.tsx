import React, { useState, useEffect, useContext } from 'react';
import {
	View,
	Picker,
	Text,
	StyleSheet,
	ActivityIndicator,
	Button,
} from 'react-native';
import { apiService } from '../utils/api';
import { Center } from '../shared/Center';
import { findWithId } from '../utils/calculations';
import { Friend } from '../utils/types';
import { PlayParamList } from '../types/PlayParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthContext } from '../auth/AuthProvider';

interface PlaySetupProps {
	navigation: StackNavigationProp<PlayParamList, 'PlaySetup'>;
}

export const PlaySetup: React.FC<PlaySetupProps> = ({ navigation }) => {
	const { user } = useContext(AuthContext);

	const [courses, setCourses] = useState<GolfCourse[]>([]);
	const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
	const [teeBoxOptions, setTeeBoxOptions] = useState<TeeBox[]>([]);
	const [selectedTee, setSelectedTee] = useState<TeeBox | null>(null);
	const [loading, setLoading] = useState(true);
	const [friends, setFriends] = useState<Friend[]>([]);
	const [playingPartner, setPlayingPartner] = useState<Friend | null>(null);

	const getData = async () => {
		let courses: GolfCourse[] = [];
		try {
			let allcourses: any = await apiService(
				'https://pressgolfapp.herokuapp.com/api/courses'
			);
			if (allcourses) {
				allcourses.map((course: any) => {
					let courseTees = [];
					for (let i = 1; i <= 15; i++) {
						let key = 'teeName' + i;
						if (!course[key]) break;
						else {
							courseTees.push({
								name: course[key],
								gender: course['teeGender' + i],
								par: course['teePar' + i],
								courseRating: course['courseRating' + i],
								bogeyRating: course['bogeyRating' + i],
								slopeRating: course['slopeRating' + i],
							});
						}
					}
					let courseObj = {
						id: course.id,
						clubname: course.clubname,
						city: course.city,
						state: course.state,
						tees: courseTees,
					};
					courses.push(courseObj);
				});
				setCourses(courses);
				let friends = await apiService<Friend[]>(
					`https://pressgolfapp.herokuapp.com/api/friends/${user.userid}`
				);
				if (friends) setFriends(friends);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const handleCourseSelect = (course: any) => {
		setLoading(true);
		setSelectedCourse(course);
		if (course === '0') {
			setTeeBoxOptions([]);
		} else {
			let index = findWithId(courses, Number(course));
			setTeeBoxOptions(courses[index].tees);
		}
		setLoading(false);
	};

	const handleTeeSelect = (teeBox: string) => {
		if (teeBox !== '0') {
			let teeObject: TeeBox = JSON.parse(teeBox);
			setSelectedTee(teeObject);
		} else {
			setSelectedTee(null);
		}
	};

	const handleFriendSelect = (friend: string) => {
		let friendObject: Friend = JSON.parse(friend);
		setPlayingPartner(friendObject);
	};

	if (loading) {
		return (
			<Center>
				<ActivityIndicator size="large" />
			</Center>
		);
	}

	return (
		<>
			<View style={styles.container}>
				<Text>Course Select</Text>
				<Picker
					selectedValue={selectedCourse}
					style={{ height: 50, width: 350 }}
					onValueChange={itemValue => handleCourseSelect(itemValue)}
				>
					<Picker.Item label="--Select One--" value="0" />
					{courses.map(course => {
						return (
							<Picker.Item
								key={course.id}
								label={course.clubname}
								value={course.id}
							/>
						);
					})}
				</Picker>
			</View>
			<View style={styles.container}>
				<Text>Tee Select</Text>
				<Picker
					selectedValue={JSON.stringify(selectedTee)}
					style={{ height: 50, width: 350 }}
					onValueChange={itemValue => handleTeeSelect(itemValue)}
				>
					<Picker.Item label="--Select One--" value="0" />
					{teeBoxOptions.map(teeBox => {
						return (
							<Picker.Item
								key={`${teeBox.name}-${teeBox.gender}`}
								label={`${teeBox.name} - (${teeBox.courseRating} / ${teeBox.slopeRating}) (${teeBox.gender})`}
								value={JSON.stringify(teeBox)}
							/>
						);
					})}
				</Picker>
			</View>
			<View style={styles.container}>
				<Text>Playing With:</Text>
				<Picker
					selectedValue={JSON.stringify(playingPartner)}
					style={{ height: 50, width: 350 }}
					onValueChange={itemValue => handleFriendSelect(itemValue)}
				>
					<Picker.Item label="--Playing Solo--" value="0" />
					{friends.map(friend => {
						return (
							<Picker.Item
								key={`friend-${user.userid}-${friend.id}`}
								label={`${friend.firstname} ${friend.lastname}`}
								value={JSON.stringify(friend)}
							/>
						);
					})}
				</Picker>
			</View>
			<View>
				<Button
					title="Start Playing"
					onPress={() => navigation.navigate('Scorecard')}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		alignItems: 'center',
	},
});

interface GolfCourse {
	id: number;
	clubname: string;
	city: string;
	state: string;
	tees: TeeBox[];
}

interface TeeBox {
	name: string;
	gender: string;
	par: number;
	courseRating: number;
	bogeyRating: number;
	slopeRating: number;
}
