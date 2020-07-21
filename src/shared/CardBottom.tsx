import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CardBottomProps {}

export const CardBottom: React.FC<CardBottomProps> = ({ children }) => {
	return (
		<View style={styles.bottom}>
			<View style={styles.cardContent}>{children}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	bottom: {
		backgroundColor: '#1e1835',
		height: 60,
		width: 350,
		borderBottomRightRadius: 24,
		borderBottomLeftRadius: 24,
	},
	cardContent: {
		paddingHorizontal: 18,
		paddingVertical: 20,
	},
});
