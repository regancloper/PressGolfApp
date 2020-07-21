import React from 'react';
import { Center } from './Center';
import { ActivityIndicator } from 'react-native';

interface LoadingCircleProps {}

export const LoadingCircle: React.FC<LoadingCircleProps> = ({}) => {
	return (
		<Center>
			<ActivityIndicator />
		</Center>
	);
};
