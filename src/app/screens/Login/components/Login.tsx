import { AuthError } from 'firebase/auth/react-native';
import { useRef, useState } from 'react';
import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Image,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { initializeFirebase } from '../../../../../config/firebase';

const { signInWithEmailAndPassword, auth } = initializeFirebase();

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const passwordInputRef = useRef<TextInput>(null);

	const handleLogin = async () => {
		Keyboard.dismiss();
		try {
			const { user } = await signInWithEmailAndPassword(auth!, email, password);
			Alert.alert('Welcome', user.displayName ?? 'User', [
				{
					text: 'OK',
					onPress: () => console.log('Logged in'),
					style: 'default',
				},
			]);
		} catch (error) {
			const { name, message } = error as AuthError;
			Alert.alert(name, message ?? 'An error occured', [
				{
					text: 'Dismiss',
					onPress: () => console.log('Dismissed'),
					style: 'default',
				},
			]);
		}
	};

	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
			>
				<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={20}>
					<View style={styles.header}>
						<Image style={styles.logo} source={require('../../../../../assets/omu.png')}></Image>
						<Text style={[styles.text, styles.headerTitle]}>Login</Text>
						<View style={styles.logo}></View>
					</View>
					<View style={styles.welcomeContainer}>
						<View style={styles.welcomeTextContainer}>
							<Text style={[styles.text, styles.welcomeText]}>Welcome to JivApp</Text>
							<Text style={styles.text}>I want to be a Taker</Text>
							<Text style={styles.text}>I want to receive a Jiver</Text>
						</View>
						<Image
							style={styles.welcomeImage}
							source={require('../../../../../assets/jivers.png')}
						></Image>
					</View>
					<View style={styles.loginForm}>
						<TextInput
							placeholder="Email"
							style={[styles.text, styles.username]}
							placeholderTextColor={'#969696'}
							value={email}
							onChangeText={setEmail}
							keyboardType="email-address"
							onSubmitEditing={() => passwordInputRef.current?.focus()}
							returnKeyType="next"
							textContentType="emailAddress"
						/>
						<TextInput
							ref={passwordInputRef}
							style={[styles.text, styles.password]}
							placeholder="Password"
							placeholderTextColor={'#969696'}
							value={password}
							onChangeText={setPassword}
							secureTextEntry
							textContentType="oneTimeCode"
						/>
						<TouchableOpacity style={styles.forgotPassword}>
							<Text style={styles.text}>Forgot Password?</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.loginContainer}>
						<TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
							<Text style={[styles.text, styles.loginText]}>Login</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.registerContainer}>
						<Text style={styles.text}>Don't have an account yet?</Text>
						<TouchableOpacity style={styles.registerButton}>
							<Text style={styles.text}>Register here!</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1E1E1E',
		padding: 10,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	logo: {
		aspectRatio: 1,
		width: 40,
	},
	text: {
		color: '#FFF',
	},
	headerTitle: {
		fontSize: 16,
	},
	welcomeContainer: {
		padding: 35,
	},
	welcomeTextContainer: {
		paddingBottom: 35,
	},
	welcomeText: {
		paddingBottom: 12,
	},
	welcomeImage: {
		backgroundColor: 'white',
		alignSelf: 'center',
	},
	loginForm: {
		gap: 12,
	},
	loginContainer: {
		marginTop: 25,
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
	username: {
		height: 56,
		borderColor: '#FFF',
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		marginBottom: 10,
	},
	password: {
		height: 56,
		borderColor: '#FFF',
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		marginBottom: 10,
	},
	forgotPassword: {
		alignSelf: 'flex-end',
	},
	registerContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 35,
	},
	registerButton: {
		paddingLeft: 5,
	},
});
