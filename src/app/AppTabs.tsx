import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppParamList } from '../types/AppParamList';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Post } from './Post';
import { Profile } from './Profile';
import { Play } from './Play';

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
	return (
		<Tabs.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					if (route.name === 'Profile') {
						return <Ionicons name="ios-home" size={size} color={color} />;
					} else if (route.name === 'Post') {
						return <Ionicons name="ios-create" size={size} color={color} />;
					} else {
						return <FontAwesome5 name="golf-ball" size={size} color={color} />;
					}
				},
			})}
			tabBarOptions={{
				activeTintColor: '#28a745',
				inactiveTintColor: 'gray',
			}}
		>
			<Tabs.Screen name="Profile" component={Profile} />
			<Tabs.Screen name="Post" component={Post} />
			<Tabs.Screen name="Play" component={Play} />
		</Tabs.Navigator>
	);
};
