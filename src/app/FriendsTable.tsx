import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
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
				<View style={{ flex: 1, alignSelf: 'stretch' }}>
					<Text style={styles.bold}>Index</Text>
				</View>
			</View>
		);
	};

	const renderFriends = () => {
		return friends.map(friend => {
			return (
				<View
					key={friend.userid}
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
						<Text>
							{friend.firstname} {friend.lastname}
						</Text>
					</View>
					<View style={{ flex: 1, alignSelf: 'stretch' }}>
						<Text>{friend.index || 'NI'}</Text>
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
	},
});
