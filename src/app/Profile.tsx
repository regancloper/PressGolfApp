import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { IndexCard } from './IndexCard';
import { FriendsCard } from './FriendsCard';
import { ScoreTable } from './ScoreTable';
import { AuthContext } from '../auth/AuthProvider';
import { PlayerProfile, Friend } from '../utils/types';
import { apiService } from '../utils/api';
import { FriendsTable } from './FriendsTable';
import { LoadingCircle } from '../shared/LoadingCircle';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppParamList } from '../types/AppParamList';

interface ProfileProps {
	navigation: StackNavigationProp<AppParamList, 'Profile'>;
}

export const Profile: React.FC<ProfileProps> = ({ navigation }) => {
	const { user } = useContext(AuthContext);

	const [player, setPlayer] = useState<PlayerProfile>({
		firstname: '',
		lastname: '',
		index: 0,
	});
	const [friends, setFriends] = useState<Friend[]>([]);
	const [showFriends, setShowFriends] = useState(true);
	const [loading, setLoading] = useState(true);

	const getData = async () => {
		// make api request to server to get user and scores for said user
		if (user) {
			try {
				let player = await apiService<PlayerProfile>(
					`https://pressgolfapp.herokuapp.com/api/users/${user.userid}`
				);
				if (player) setPlayer(player);
				let friends = await apiService<Friend[]>(
					`https://pressgolfapp.herokuapp.com/api/friends/${user.userid}`
				);
				if (friends) setFriends(friends);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		getData();
	}, [showFriends]);

	return (
		<View>
			<ScrollView style={{ paddingTop: 12 }}>
				<IndexCard navigation={navigation}>
					<View>
						<Text style={{ fontSize: 32 }}>
							{player.firstname} {player.lastname}
						</Text>
						<Text style={{ marginTop: 12 }}>Index: {player.index || 'NI'}</Text>
					</View>
				</IndexCard>
				<FriendsCard>
					{loading ? <LoadingCircle /> : <FriendsTable friends={friends} />}
				</FriendsCard>
				<ScoreTable />
			</ScrollView>
		</View>
	);
};
