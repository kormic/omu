import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import { useRouter } from 'expo-router';
import OmuButton from '../../../components/OmuButton';

export default function Register() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<Header title="Register" iconName="register" />
			<View style={styles.textContainer}>
				<Text style={styles.text}>
					Ready to make a difference? Register now to join our community of generous donors and
					start changing lives today 🙏
				</Text>
				<Text style={styles.text}>#JivAShit</Text>
			</View>
			<View style={styles.mainActionContainer}>
				<OmuButton text="Continue" onPressHandler={() => {}} />
			</View>
			<View style={styles.secondaryActionContainer}>
				<Text style={styles.text}>Already have an account yet?</Text>
				<TouchableOpacity
					style={styles.secondaryAction}
					onPress={() => router.replace('/auth/login')}
				>
					<Text style={styles.text}>Login here!</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1E1E1E',
		padding: 10,
	},
	textContainer: {
		alignItems: 'center',
		gap: 35,
	},
	text: {
		color: '#FFF',
		textAlign: 'center',
	},
	mainActionContainer: {
		marginTop: 25,
	},
	secondaryActionContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 35,
	},
	secondaryAction: {
		paddingLeft: 5,
	},
});
