import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Friend } from '../utils/types';
import { Center } from '../shared/Center';

interface FriendsTableProps {
	friends: Friend[];
}

export const FriendsTable: React.FC<FriendsTableProps> = ({ friends }) => {
	const renderHeader = () => {
		return (
			<View
				style={{
					flex: 1,
					alignSelf: 'stretch',
					flexDirection: 'row',
					marginLeft: 12,
				}}
			>
				<View
					style={{
						flex: 1,
						alignSelf: 'stretch',
					}}
				>
					<Text style={styles.bold}>Golfer</Text>
				</View>
				<View style={{ flex: 1, alignSelf: 'stretch', marginLeft: 32 }}>
					<Text style={styles.bold}>Index</Text>
				</View>
			</View>
		);
	};

	const renderFriends = () => {
		return friends.map(friend => {
			return (
				<View
					key={`${friend.lastname}-${friend.id}`}
					style={{
						flex: 1,
						alignSelf: 'stretch',
						flexDirection: 'row',
						marginLeft: 12,
					}}
				>
					<View
						style={{
							flex: 1,
							alignSelf: 'stretch',
						}}
					>
						<Text style={{ fontSize: 20 }}>
							{friend.firstname} {friend.lastname}
						</Text>
					</View>
					<View style={{ flex: 1, alignSelf: 'stretch', marginLeft: 32 }}>
						<Text style={{ fontSize: 20 }}>{friend.index || 'NI'}</Text>
					</View>
				</View>
			);
		});
	};

	return (
		<Center>
			{renderHeader()}
			{renderFriends()}
		</Center>
	);
};
const styles = StyleSheet.create({
	bold: {
		fontWeight: 'bold',
		fontSize: 24,
	},
});
