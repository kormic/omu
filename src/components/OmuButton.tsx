import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

type Props = {
	text: string;
	onPressHandler: (event: GestureResponderEvent) => void;
};

export default function OmuButton({ text, onPressHandler }: Props) {
	return (
		<TouchableOpacity style={styles.loginButton} onPress={onPressHandler}>
			<Text style={[styles.text, styles.loginText]}>{text}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	text: {
		color: '#FFF',
	},
	loginButton: {
		// paddingTop: 35,
		height: 59,
		borderRadius: 15,
		backgroundColor: '#FAA61A',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginText: {
		fontSize: 17,
		fontWeight: '700',
	},
});
