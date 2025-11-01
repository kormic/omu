import React from 'react';
import { View, Text } from 'react-native';
import OmuButton from '../../../components/OmuButton';

const HomeScreen: React.FC<{ handlePress: () => Promise<void> }> = (props) => {
	return (
		<View>
			<Text>Home</Text>
			<OmuButton text="Sign out" onPressHandler={props.handlePress}></OmuButton>
		</View>
	);
};

export default HomeScreen;
