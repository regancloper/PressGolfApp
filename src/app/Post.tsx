import React, { useState, useEffect, useContext } from 'react';
import { View, Picker, Text, StyleSheet, TextInput } from 'react-native';
import { apiService } from '../utils/api';
import {
	findWithId,
	calculateDiff,
	calculateIndex,
} from '../utils/calculations';
import { AppButton } from '../shared/AppButton';
import { TableScore } from '../utils/types';
import { LoadingCircle } from '../shared/LoadingCircle';
import { AuthContext } from '../auth/AuthProvider';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppParamList } from '../types/AppParamList';

interface PostProps {
	navigation: StackNavigationProp<AppParamList, 'Post'>;
}

export const Post: React.FC<PostProps> = ({ navigation }) => {
	const { postNewData } = useContext(AuthContext);

	const [courses, setCourses] = useState<GolfCourse[]>([]);
	const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
	const [teeBoxOptions, setTeeBoxOptions] = useState<TeeBox[]>([]);
	const [selectedTee, setSelectedTee] = useState<TeeBox | null>(null);
	const [score, setScore] = useState<string>('');
	const [loading, setLoading] = useState(true);

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

	const handlePostedScore = async () => {
		// calculate differential and post new score to scores DB
		if (selectedTee) {
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
					courseid: Number(selectedCourse),
					score: Number(score),
					differential,
					teeName: selectedTee.name,
					teeGender: selectedTee.gender,
				}
			);
			// console.log(differential);
		}

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
		setSelectedCourse(null);
		handleCourseSelect('0');
		setScore('');

		navigation.navigate('Profile');
	};

	if (loading) {
		return <LoadingCircle />;
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
				<Text>Score</Text>
				<TextInput
					style={{
						height: 40,
						width: 80,
						borderColor: 'gray',
						borderWidth: 1,
					}}
					onChangeText={score => setScore(score)}
					value={score}
					// keyboardType="number-pad"
				/>
				{selectedTee && score !== '' && (
					<View style={{ marginTop: 40 }}>
						<AppButton onPress={handlePostedScore} title="Post Score" />
					</View>
				)}
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
