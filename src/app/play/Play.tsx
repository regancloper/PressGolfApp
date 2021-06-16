import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PlayParamList } from '../../types/PlayParamList';
import { PlaySetup } from './PlaySetup';
import { Scorecard } from './Scorecard';

interface PlayProps {}

const Stack = createStackNavigator<PlayParamList>();

export const Play: React.FC<PlayProps> = ({}) => {
	return (
		<Stack.Navigator initialRouteName="PlaySetup">
			<Stack.Screen name="PlaySetup" component={PlaySetup} />
			<Stack.Screen name="Scorecard" component={Scorecard} />
		</Stack.Navigator>
	);
};
