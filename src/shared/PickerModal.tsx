import React, { useState } from 'react';
import { Modal, View, StyleSheet, Picker, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface PickerModalProps {
	visible: boolean;
	items: string[];
	title: string;
	// onClose: () => void;
	// onSelect: () => void;
	// value?: string;
}

export const PickerModal: React.FC<PickerModalProps> = ({
	visible,
	items,
	title,
	// onClose,
	// onSelect,
}) => {
	const [value, setValue] = useState<string>('Apple');

	return (
		<Modal animated transparent visible={visible} animationType="fade">
			<View style={styles.container}>
				<View style={styles.pickerContainer}>
					<View style={styles.header}>
						<AntDesign
							name="check"
							size={24}
							color="#28a745"
							onPress={() => console.log('')}
						/>
						<Text style={{ fontSize: 18 }}>{title || 'Placeholder'}</Text>
						<AntDesign name="close" size={24} color="indianred" />
					</View>
					<Picker
						style={styles.picker}
						selectedValue={value}
						onValueChange={item => setValue(item)}
					>
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
