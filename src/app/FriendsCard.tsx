import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Center } from '../shared/Center';

interface FriendsCardProps {}

export const FriendsCard: React.FC<FriendsCardProps> = ({ children }) => {
	return (
		<View style={styles.card}>
			<View
				style={{
					flexDirection: 'row',
					height: 80,
					borderTopLeftRadius: 24,
					borderTopRightRadius: 24,
				}}
			>
				<View
					style={{
						width: '50%',
						backgroundColor: '#fff',
						borderTopLeftRadius: 24,
					}}
				>
					<Center>
						<Text style={{ color: '#28a745' }}>Friends</Text>
					</Center>
				</View>
				<View
					style={{
						width: '50%',
						backgroundColor: '#28a745',
						borderTopRightRadius: 24,
					}}
				>
					<Center>
						<Text style={{ color: '#fff' }}>Add Friend</Text>
					</Center>
				</View>
			</View>
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
		paddingHorizontal: 18,
		paddingTop: 20,
		marginBottom: 60,
	},
});
