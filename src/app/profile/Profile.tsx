import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { IndexCard } from './IndexCard';
import { FriendsCard } from './FriendsCard';
import { ScoreTable } from './ScoreTable';
import { AuthContext } from '../../auth/AuthProvider';
import { PlayerProfile } from '../../utils/types';
import { apiService } from '../../utils/api';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppParamList } from '../../types/AppParamList';

interface ProfileProps {
	navigation: StackNavigationProp<AppParamList, 'Profile'>;
}

export const Profile: React.FC<ProfileProps> = ({ navigation }) => {
	const { user, numPosts } = useContext(AuthContext);

	const [player, setPlayer] = useState<PlayerProfile>({
		firstname: '',
		lastname: '',
		index: 0,
	});

	const getData = async () => {
		// make api request to server to get user and scores for said user
		try {
			let player = await apiService<PlayerProfile>(
				`https://pressgolfapp.herokuapp.com/api/users/${user.userid}`
			);
			if (player) setPlayer(player);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, [numPosts]);

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
				<FriendsCard userid={user.userid} />
				<ScoreTable userid={user.userid} />
			</ScrollView>
		</View>
	);
};
