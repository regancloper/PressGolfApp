import React from 'react';
import { View, Text } from 'react-native';

interface MatchPlayRowProps {
	matchArray: number;
}

export const MatchPlayRow: React.FC<MatchPlayRowProps> = ({ matchArray }) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				backgroundColor: 'cadetblue',
			}}
		>
			<View
				style={{
					width: 75,
					height: 60,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text style={{ fontSize: 18, color: '#fff' }}>Results</Text>
			</View>
			{matchArray.slice(0, 9).map((hole, index) => (
				<View
					key={`front-${index}`}
					style={{
						width: 60,
						height: 60,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={{ fontSize: 18, color: '#fff' }}>{hole}</Text>
				</View>
			))}
			<View
				style={{
					width: 60,
					height: 60,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text style={{ fontSize: 18, color: '#fff' }}>Out</Text>
			</View>
			{matchArray.slice(9).map((hole, index) => (
				<View
					key={`front-${index}`}
					style={{
						width: 60,
						height: 60,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={{ fontSize: 18, color: '#fff' }}>{hole}</Text>
				</View>
			))}
			<View
				style={{
					width: 60,
					height: 60,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text style={{ fontSize: 18, color: '#fff' }}>In</Text>
			</View>
			<View
				style={{
					width: 60,
					height: 60,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text style={{ fontSize: 18, color: '#fff' }}>Done</Text>
			</View>
		</View>
	);
};
