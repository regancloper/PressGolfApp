import React, { useState, useEffect, useContext } from 'react';
import { Friend, Player } from '../../utils/types';
import { apiService } from '../../utils/api';
import { TouchableOpacity, Text, View, Picker } from 'react-native';
import { AuthContext } from '../../auth/AuthProvider';

interface AddFriendProps {
	userid: number;
	friends: Friend[];
	switchTabs: () => void;
}

const AddFriend: React.FC<AddFriendProps> = ({
	userid,
	friends,
	switchTabs,
}) => {
	const { postNewData } = useContext(AuthContext);

	const [allUsers, setAllUsers] = useState<Player[]>([]);
	const [selectedFriend, setSelectedFriend] = useState<Friend>({
		id: 0,
		firstname: '',
		lastname: '',
		index: 0,
	});

	const getAllUsers = async () => {
		try {
			let allUsers = await apiService<Player[]>(
				`https://pressgolfapp.herokuapp.com/api/addfriend/${userid}`
			);
			if (allUsers) setAllUsers(allUsers);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	const handleFriendSelect = (friend: string) => {
		let friendObject: Friend = JSON.parse(friend);
		if (friendObject.id === 0) {
			setSelectedFriend({
				id: 0,
				firstname: '',
				lastname: '',
				index: 0,
			});
		}
		setSelectedFriend(friendObject);
	};

	// on form submit, add the userid and friendid to the friends db table
	const handleSubmit = async () => {
		let user1 = userid;
		let user2 = selectedFriend.id;
		if (userid > selectedFriend.id) {
			user1 = selectedFriend.id;
			user2 = userid;
		}
		// post both friend ids to the friends table
		await apiService('https://pressgolfapp.herokuapp.com/api/friends', 'POST', {
			user1,
			user2,
		});
		postNewData();
		setSelectedFriend({
			id: 0,
			firstname: '',
			lastname: '',
			index: 0,
		});
		switchTabs();
	};

	return (
		<View>
			<TouchableOpacity
				onPress={handleSubmit}
				style={{ backgroundColor: 'lightblue', padding: 10 }}
			>
				<Text>Add Friend</Text>
			</TouchableOpacity>

			<Picker
				selectedValue={JSON.stringify(selectedFriend)}
				style={{ height: 50, width: 350 }}
				onValueChange={itemValue => handleFriendSelect(itemValue)}
			>
				<Picker.Item label="--Select One--" value="0" />
				{allUsers.map(user => {
					return (
						<Picker.Item
							key={user.id}
							label={`${user.firstname} ${user.lastname}`}
							value={JSON.stringify(user)}
						/>
					);
				})}
			</Picker>
		</View>
	);
};

export default AddFriend;
