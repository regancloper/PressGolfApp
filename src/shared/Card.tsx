import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CardProps {}

export const Card: React.FC<CardProps> = ({ children }) => {
	return (
		<View style={styles.card}>
			<View style={styles.cardContent}>{children}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		borderRadius: 24,
		elevation: 3,
		shadowOffset: {
			width: 1,
			height: 1,
		},
		shadowColor: '#333',
		shadowOpacity: 0.3,
		shadowRadius: 4,
		marginHorizontal: 24,
		marginVertical: 6,
	},
	cardContent: {
		margin: 20,
	},
});
