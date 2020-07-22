import React from 'react';
import { PickerModal } from '../shared/PickerModal';

interface ScorecardProps {}

export const Scorecard: React.FC<ScorecardProps> = ({}) => {
	return (
		<PickerModal
			visible={true}
			items={['Apple', 'Orange', 'Banana', 'Blueberries']}
			title="Fruits"
		/>
	);
};
