import React, { useState } from 'react';
import { PickerModal } from '../pickers/PickerModal';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

interface ScorecardProps {}

export const Scorecard: React.FC<ScorecardProps> = ({}) => {
	const [showPicker, setShowPicker] = useState<string>('');
	const [selectedFruit, setSelectedFruit] = useState('Select Fruit');

	return (
		<View>
			<TouchableOpacity
				style={styles.button}
				onPress={() => setShowPicker('Fruit')}
			>
				<Text style={{ fontSize: 24, color: '#fff' }}>{selectedFruit}</Text>
			</TouchableOpacity>
			<PickerModal
				visible={Boolean(showPicker)}
				items={['Apple', 'Orange', 'Banana', 'Blueberries']}
				title="Fruits"
				onClose={() => setShowPicker('')}
				onSelect={value => setSelectedFruit(value)}
				value={selectedFruit}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		backgroundColor: 'seagreen',
		padding: 30,
	},
});
