import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Center } from '../shared/Center';
import { LoadingCircle } from '../shared/LoadingCircle';
import { FriendsTable } from './FriendsTable';
import { apiService } from '../utils/api';
import { Friend } from '../utils/types';
import AddFriend from './AddFriend';
import { AuthContext } from '../auth/AuthProvider';

interface FriendsCardProps {
	userid: number;
}

export const FriendsCard: React.FC<FriendsCardProps> = ({ userid }) => {
	const { numPosts } = useContext(AuthContext);

	const [friends, setFriends] = useState<Friend[]>([]);
	const [showFriends, setShowFriends] = useState(true);
	const [loading, setLoading] = useState(true);

	const getData = async () => {
		// make api request to server to get friends for said user
		setLoading(true);
		try {
			let friends = await apiService<Friend[]>(
				`https://pressgolfapp.herokuapp.com/api/friends/${userid}`
			);
			if (friends) setFriends(friends);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, [numPosts]);

	const switchTabs = () => {
		setShowFriends(true);
	};

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
				<TouchableOpacity
					style={styles.friendsButton}
					onPress={() => {
						if (!showFriends) setShowFriends(true);
					}}
				>
					<Center>
						<Text style={{ color: '#28a745', fontSize: 20 }}>Friends</Text>
					</Center>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.addFriendButton}
					onPress={() => {
						if (showFriends) setShowFriends(false);
					}}
				>
					<Center>
						<Text style={{ color: '#fff', fontSize: 20 }}>Add Friend</Text>
					</Center>
				</TouchableOpacity>
			</View>
			<View style={styles.cardContent}>
				{showFriends ? (
					loading ? (
						<LoadingCircle />
					) : (
						<FriendsTable friends={friends} />
					)
				) : (
					<AddFriend
						userid={userid}
						friends={friends}
						switchTabs={switchTabs}
					/>
				)}
			</View>
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
	friendsButton: {
		width: '50%',
		backgroundColor: '#fff',
		borderTopLeftRadius: 24,
		alignItems: 'center',
		padding: 20,
	},
	addFriendButton: {
		width: '50%',
		backgroundColor: '#28a745',
		borderTopRightRadius: 24,
		alignItems: 'center',
		padding: 20,
	},
});
