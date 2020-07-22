import React, { useState } from 'react';
import { Modal, View, StyleSheet, Picker, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface PickerModalProps {
	visible: boolean;
	items: string[];
	title: string;
	onClose: () => void;
	onSelect: (value: string) => void;
	value: string;
}

export const PickerModal: React.FC<PickerModalProps> = ({
	visible,
	items,
	title,
	onClose,
	onSelect,
	value,
}) => {
	const [pickerValue, setPickerValue] = useState<string>(value);
	const [priorValue, setPriorValue] = useState<string>(value);

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
						<Text style={{ fontSize: 18 }}>{title || 'Placeholder'}</Text>
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
						selectedValue={pickerValue}
						onValueChange={item => setPickerValue(item)}
					>
						<Picker.Item value="Select Fruit" label="Select Fruit" />
						{items.map((item, index) => (
							<Picker.Item key={index} value={item} label={item} />
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
		height: 200,
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
