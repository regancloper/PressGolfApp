import React, { useState } from 'react';
import { Modal, View, StyleSheet, Picker, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { GolfCourse, TeeBox } from '../utils/types';

interface TeePickerProps {
	visible: boolean;
	tees: TeeBox[];
	onClose: () => void;
	onSelect: (course: TeeBox) => void;
	value: TeeBox;
}

export const TeePicker: React.FC<TeePickerProps> = ({
	visible,
	tees,
	onClose,
	onSelect,
	value,
}) => {
	const [pickerValue, setPickerValue] = useState<TeeBox>(value);
	const [priorValue, setPriorValue] = useState<TeeBox>(value);

	const handleTeeSelect = (teeBox: string) => {
		if (teeBox !== 'Select Your Tees') {
			let teeBoxObject: TeeBox = JSON.parse(teeBox);
			setPickerValue(teeBoxObject);
		} else {
			setPickerValue({
				name: '',
				gender: '',
				par: 0,
				courseRating: 0,
				bogeyRating: 0,
				slopeRating: 0,
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
						<Text style={{ fontSize: 18 }}>Select Your Teebox</Text>
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
						selectedValue={JSON.stringify(pickerValue)}
						onValueChange={teeBox => handleTeeSelect(teeBox)}
					>
						<Picker.Item label="--Select Tees--" value="Select Your Tees" />
						{tees.map(teeBox => (
							<Picker.Item
								key={`${teeBox.name}-${teeBox.gender}`}
								label={`${teeBox.name} - (${teeBox.courseRating} / ${teeBox.slopeRating}) (${teeBox.gender})`}
								value={JSON.stringify(teeBox)}
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
});
