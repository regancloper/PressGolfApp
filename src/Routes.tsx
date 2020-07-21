import React, { useState, useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, AsyncStorage, Button } from 'react-native';
import { Center } from './shared/Center';
import { AuthContext } from './auth/AuthProvider';
import { AppTabs } from './app/AppTabs';
import { AuthStack } from './auth/AuthStack';
import { RoutesParamList } from './types/RoutesParamList';

interface RoutesProps {}

const Stack = createStackNavigator<RoutesParamList>();

export const Routes: React.FC<RoutesProps> = ({}) => {
	const { user, login, logout } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// check if the user is logged in or not
		AsyncStorage.getItem('user')
			.then((userString) => {
				if (userString) {
					// decode it
					login();
				}
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	if (loading) {
		return (
			<Center>
				<ActivityIndicator size="large" />
			</Center>
		);
	}

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{user ? (
					<Stack.Screen
						name="AppTabs"
						component={AppTabs}
						options={{
							headerTitle: 'Press',
							headerStyle: {
								backgroundColor: '#fff',
							},
							// headerTintColor: '#fff',
							headerRight: () => (
								<Button onPress={() => logout()} title="Sign Out" />
							),
						}}
					/>
				) : (
					<Stack.Screen
						name="AuthStack"
						component={AuthStack}
						options={{ header: () => null }}
					/>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};
