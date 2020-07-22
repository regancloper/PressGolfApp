import React, { useState } from 'react';
import { Modal, View, StyleSheet, Picker, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Friend } from '../utils/types';

interface FriendPickerProps {
	visible: boolean;
	friends: Friend[];
	onClose: () => void;
	onSelect: (course: Friend) => void;
	value: Friend;
}

export const FriendPicker: React.FC<FriendPickerProps> = ({
	visible,
	friends,
	onClose,
	onSelect,
	value,
}) => {
	const [pickerValue, setPickerValue] = useState<Friend>(value);
	const [priorValue, setPriorValue] = useState<Friend>(value);

	const handleFriendSelect = (friend: string) => {
		if (friend !== 'Playing Solo') {
			let friendObject: Friend = JSON.parse(friend);
			setPickerValue(friendObject);
		} else {
			setPickerValue({
				id: 0,
				firstname: '',
				lastname: '',
				index: 0,
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
						<Text style={{ fontSize: 18 }}>Playing With:</Text>
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
						onValueChange={course => handleFriendSelect(course)}
					>
						<Picker.Item label="Playing Solo" value="Playing Solo" />
						{friends.map(friend => (
							<Picker.Item
								key={`${friend.firstname}-${friend.id}`}
								value={JSON.stringify(friend)}
								label={`${friend.firstname} ${friend.lastname}`}
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
