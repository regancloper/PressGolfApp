import React, { useState, useEffect, useContext } from 'react';
import {
	View,
	Picker,
	Text,
	StyleSheet,
	Button,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import { apiService } from '../utils/api';
import { findWithId } from '../utils/calculations';
import { Friend, GolfCourse, TeeBox } from '../utils/types';
import { PlayParamList } from '../types/PlayParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthContext } from '../auth/AuthProvider';
import { LoadingCircle } from '../shared/LoadingCircle';
import { CoursePicker } from '../pickers/CoursePicker';
import { TeePicker } from '../pickers/TeePicker';
import { FriendPicker } from '../pickers/FriendPicker';

interface PlaySetupProps {
	navigation: StackNavigationProp<PlayParamList, 'PlaySetup'>;
}

export const PlaySetup: React.FC<PlaySetupProps> = ({ navigation }) => {
	const { user } = useContext(AuthContext);

	const [courses, setCourses] = useState<GolfCourse[]>([]);
	const [selectedCourse, setSelectedCourse] = useState<GolfCourse>({
		id: 0,
		clubname: 'Select Your Course',
		city: '',
		state: '',
		tees: [],
	});
	const [teeBoxOptions, setTeeBoxOptions] = useState<TeeBox[]>([]);
	const [selectedTee, setSelectedTee] = useState<TeeBox>({
		name: '',
		gender: '',
		par: 0,
		courseRating: 0,
		bogeyRating: 0,
		slopeRating: 0,
	});
	const [loading, setLoading] = useState(true);
	const [friends, setFriends] = useState<Friend[]>([]);
	const [playingPartner, setPlayingPartner] = useState<Friend>({
		id: 0,
		firstname: '',
		lastname: '',
		index: 0,
	});
	const [showCoursePicker, setShowCoursePicker] = useState(false);
	const [showTeePicker, setShowTeePicker] = useState(false);
	const [showFriendPicker, setShowFriendPicker] = useState(false);

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

	const handleCourseSelect = (course: GolfCourse) => {
		setLoading(true);
		setSelectedCourse(course);
		if (course.clubname === 'Select Your Course') {
			setTeeBoxOptions([]);
			setSelectedTee({
				name: '',
				gender: '',
				par: 0,
				courseRating: 0,
				bogeyRating: 0,
				slopeRating: 0,
			});
		} else {
			let index = findWithId(courses, course.id);
			setTeeBoxOptions(courses[index].tees);
		}
		setLoading(false);
	};

	const handleTeeSelect = (teeBox: TeeBox) => {
		if (teeBox.name !== 'Select Your Tees') {
			setSelectedTee(teeBox);
		} else {
			setSelectedTee({
				name: '',
				gender: '',
				par: 0,
				courseRating: 0,
				bogeyRating: 0,
				slopeRating: 0,
			});
		}
	};

	const handleFriendSelect = (friend: Friend) => {
		if (friend.firstname !== '') {
			setPlayingPartner(friend);
		} else {
			setPlayingPartner({
				id: 0,
				firstname: '',
				lastname: '',
				index: 0,
			});
		}
	};

	if (loading) {
		return <LoadingCircle />;
	}

	return (
		<View style={styles.container}>
			<View style={styles.subContainer}>
				<TouchableOpacity
					style={styles.courseButton}
					onPress={() => setShowCoursePicker(true)}
				>
					<Text style={{ fontSize: 32, color: '#fff', textAlign: 'center' }}>
						{selectedCourse.clubname}
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.subContainer}>
				<TouchableOpacity
					style={styles.teeButton}
					onPress={() => {
						if (selectedCourse.id === 0) alert('Pick a course!');
						else setShowTeePicker(true);
					}}
				>
					<Text style={{ fontSize: 32, color: '#fff', textAlign: 'center' }}>
						{selectedTee.name
							? `${selectedTee.name} - (${selectedTee.courseRating} / ${selectedTee.slopeRating}) (${selectedTee.gender})`
							: 'Select Your Tee'}
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.subContainer}>
				<TouchableOpacity
					style={styles.friendButton}
					onPress={() => setShowFriendPicker(true)}
				>
					<Text style={{ fontSize: 32, color: '#fff', textAlign: 'center' }}>
						{playingPartner.firstname
							? `${playingPartner.firstname} ${playingPartner.lastname}`
							: 'Pick A Friend'}
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.subContainer}>
				<TouchableOpacity style={styles.playButton}>
					<Text style={{ fontSize: 32, color: '#fff' }}>Play Golf</Text>
				</TouchableOpacity>
			</View>

			<CoursePicker
				visible={showCoursePicker}
				courses={courses}
				onClose={() => setShowCoursePicker(false)}
				onSelect={course => handleCourseSelect(course)}
				value={selectedCourse}
			/>
			<TeePicker
				visible={showTeePicker}
				tees={teeBoxOptions}
				onClose={() => setShowTeePicker(false)}
				onSelect={teeBox => handleTeeSelect(teeBox)}
				value={selectedTee}
			/>
			<FriendPicker
				visible={showFriendPicker}
				friends={friends}
				onClose={() => setShowFriendPicker(false)}
				onSelect={friend => handleFriendSelect(friend)}
				value={playingPartner}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	subContainer: {
		flex: 1,
	},
	courseButton: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		backgroundColor: 'seagreen',
	},
	teeButton: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		backgroundColor: 'steelblue',
	},
	friendButton: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		backgroundColor: 'salmon',
	},
	playButton: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		backgroundColor: 'indianred',
		padding: 30,
	},
});
