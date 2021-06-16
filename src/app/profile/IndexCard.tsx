import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Center } from '../../shared/Center';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppParamList } from '../../types/AppParamList';

interface IndexCardProps {
	navigation: StackNavigationProp<AppParamList, 'Profile'>;
}

export const IndexCard: React.FC<IndexCardProps> = ({
	children,
	navigation,
}) => {
	return (
		<View style={styles.card}>
			<View style={styles.cardContent}>{children}</View>
			<View
				style={{
					flexDirection: 'row',
					height: 80,
					borderBottomLeftRadius: 24,
					borderBottomRightRadius: 24,
				}}
			>
				<View
					style={{
						width: '50%',
						backgroundColor: '#1e1835',
						borderBottomLeftRadius: 24,
					}}
				>
					<Center>
						<Button
							title="Play"
							onPress={() => navigation.navigate('Play')}
							color="#fff"
						/>
					</Center>
				</View>
				<View
					style={{
						width: '50%',
						backgroundColor: '#fff',
						borderBottomRightRadius: 24,
					}}
				>
					<Center>
						<Button
							title="Post Score"
							onPress={() => navigation.navigate('Post')}
							color="#1e1835"
						/>
					</Center>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#8ee3f8',
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
		paddingTop: 40,
		paddingBottom: 60,
	},
});
