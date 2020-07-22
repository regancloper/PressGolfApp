import React, { useState } from 'react';
import { Modal, View, StyleSheet, Picker, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { GolfCourse } from '../utils/types';

interface CoursePickerProps {
	visible: boolean;
	courses: GolfCourse[];
	onClose: () => void;
	onSelect: (course: GolfCourse) => void;
	value: GolfCourse;
}

export const CoursePicker: React.FC<CoursePickerProps> = ({
	visible,
	courses,
	onClose,
	onSelect,
	value,
}) => {
	const [pickerValue, setPickerValue] = useState<GolfCourse>(value);
	const [priorValue, setPriorValue] = useState<GolfCourse>(value);

	const handleCourseSelect = (course: string) => {
		if (course !== 'Select Your Course') {
			let courseObject: GolfCourse = JSON.parse(course);
			setPickerValue(courseObject);
		} else {
			setPickerValue({
				id: 0,
				clubname: 'Select Your Course',
				city: '',
				state: '',
				tees: [],
			});
		}
	};

	return (
		<Modal animated transparent visible={visible} animationType="fade">
			<View style={styles.container}>
				<View style={styles.pickerContainer}>
					<View style={styles.header}>
						<AntDesign
							name="close"
							size={24}
							color="indianred"
							onPress={() => {
								onClose();
								if (pickerValue !== priorValue) setPickerValue(priorValue);
							}}
						/>
						<Text style={{ fontSize: 18 }}>Select Your Course</Text>
						<AntDesign
							name="check"
							size={24}
							color="#28a745"
							onPress={() => {
								onSelect(pickerValue);
								setPriorValue(pickerValue);
								onClose();
							}}
						/>
					</View>
					<Picker
						style={styles.picker}
						selectedValue={JSON.stringify(pickerValue)}
						onValueChange={course => handleCourseSelect(course)}
					>
						<Picker.Item label="--Select Course--" value="Select Your Course" />
						{courses.map(course => (
							<Picker.Item
								key={course.id}
								value={JSON.stringify(course)}
								label={course.clubname}
							/>
						))}
					</Picker>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	pickerContainer: {
		height: 250,
		width: '100%',
		backgroundColor: 'white',
	},
	header: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#eee',
		padding: 10,
	},
	picker: {
		// paddingTop: -20,
	},
});
