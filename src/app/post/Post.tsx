import React, { useState, useEffect, useContext } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { apiService } from '../../utils/api';
import {
	findWithId,
	calculateDiff,
	calculateIndex,
} from '../../utils/calculations';
import { TableScore, GolfCourse, TeeBox } from '../../utils/types';
import { LoadingCircle } from '../../shared/LoadingCircle';
import { AuthContext } from '../../auth/AuthProvider';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppParamList } from '../../types/AppParamList';
import { CoursePicker } from '../../pickers/CoursePicker';
import { TeePicker } from '../../pickers/TeePicker';

interface PostProps {
	navigation: StackNavigationProp<AppParamList, 'Post'>;
}

export const Post: React.FC<PostProps> = ({ navigation }) => {
	const { postNewData } = useContext(AuthContext);

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
	const [score, setScore] = useState<string>('');
	const [loading, setLoading] = useState(true);
	const [showCoursePicker, setShowCoursePicker] = useState(false);
	const [showTeePicker, setShowTeePicker] = useState(false);

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

	const handlePostedScore = async () => {
		// calculate differential and post new score to scores DB

		let differential = calculateDiff(
			Number(score),
			selectedTee.courseRating,
			selectedTee.slopeRating
		);
		let result = await apiService(
			'https://pressgolfapp.herokuapp.com/api/scores',
			'POST',
			{
				userid: 8,
				courseid: selectedCourse.id,
				score: Number(score),
				differential,
				teeName: selectedTee.name,
				teeGender: selectedTee.gender,
			}
		);

		// get all scores (including new) and make a post request to user DB with new score and update index
		let scores = await apiService(
			`https://pressgolfapp.herokuapp.com/api/scores/8`
		);
		const diffArray: number[] = [];
		scores.forEach((score: TableScore) => {
			diffArray.push(score.differential);
		});
		let index = calculateIndex(diffArray);
		if (typeof index === 'number') {
			index = Math.round(index * 10) / 10;
			await apiService(
				`https://pressgolfapp.herokuapp.com/api/users/8`,
				'POST',
				{ index }
			);
			console.log('finished posting!!');
		}
		postNewData();
		handleCourseSelect({
			id: 0,
			clubname: 'Select Your Course',
			city: '',
			state: '',
			tees: [],
		});
		setScore('');

		navigation.navigate('Profile');
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
				<TextInput
					style={{
						height: '100%',
						fontSize: 32,
						textAlign: 'center',
						backgroundColor: '#fff',
					}}
					placeholder="Enter Score"
					onChangeText={(score) => setScore(score)}
					value={score}
					// keyboardType="number-pad"
				/>
			</View>
			<View style={styles.subContainer}>
				<TouchableOpacity
					disabled={
						selectedCourse.id === 0 || selectedTee.name === '' || !score
					}
					onPress={handlePostedScore}
					style={styles.postButton}
				>
					<Text style={{ fontSize: 32, color: '#fff' }}>Post Score</Text>
				</TouchableOpacity>
			</View>
			<CoursePicker
				visible={showCoursePicker}
				courses={courses}
				onClose={() => setShowCoursePicker(false)}
				onSelect={(course) => handleCourseSelect(course)}
				value={selectedCourse}
			/>
			<TeePicker
				visible={showTeePicker}
				tees={teeBoxOptions}
				onClose={() => setShowTeePicker(false)}
				onSelect={(teeBox) => handleTeeSelect(teeBox)}
				value={selectedTee}
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
		padding: 30,
	},
	teeButton: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		backgroundColor: 'steelblue',
		padding: 30,
	},
	postButton: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		backgroundColor: 'indianred',
		padding: 30,
	},
});
