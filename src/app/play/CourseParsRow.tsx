import React from 'react';
import { View, Text } from 'react-native';

interface CourseParsRowProps {
	holes: number[];
	frontNinePar: number;
	backNinePar: number;
}

export const CourseParsRow: React.FC<CourseParsRowProps> = ({
	holes,
	frontNinePar,
	backNinePar,
}) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				backgroundColor: 'midnightblue',
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
				<Text style={{ fontSize: 18, color: '#fff' }}>Par</Text>
			</View>
			{holes.slice(0, 9).map((hole, index) => (
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
				<Text style={{ fontSize: 18, color: '#fff' }}>{frontNinePar}</Text>
			</View>
			{holes.slice(9).map((hole, index) => (
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
				<Text style={{ fontSize: 18, color: '#fff' }}>{backNinePar}</Text>
			</View>
			<View
				style={{
					width: 60,
					height: 60,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text style={{ fontSize: 18, color: '#fff' }}>
					{frontNinePar + backNinePar}
				</Text>
			</View>
		</View>
	);
};
