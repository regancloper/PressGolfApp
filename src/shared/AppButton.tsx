import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AppButtonProps {
	onPress: () => void;
	title: string;
}

export const AppButton: React.FC<AppButtonProps> = ({ onPress, title }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
			<Text style={styles.appButtonText}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	appButtonContainer: {
		elevation: 8,
		backgroundColor: 'seagreen',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12,
	},
	appButtonText: {
		fontSize: 18,
		color: '#fff',
		fontWeight: 'bold',
		alignSelf: 'center',
	},
});
