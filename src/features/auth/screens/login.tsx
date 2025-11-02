import { supabase } from '../../../../config/supabase';
import { useRef, useState } from 'react';
import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	AppState,
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../components/Header';
import OmuButton from '../../../components/OmuButton';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
	if (state === 'active') {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const passwordInputRef = useRef<TextInput>(null);
	const router = useRouter();

	async function signInWithEmail() {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
		if (error) Alert.alert(error.message);
		if (data.user) {
			Alert.alert('Welcome', data.user.email ?? 'User', [
				{
					text: 'OK',
					onPress: () => router.replace('(app)/home'),
					style: 'default',
				},
			]);
		}
	}

	const handleRegister = () => {
		router.push('/register');
	};

	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
			>
				<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={20}>
					<Header title="Login" iconName="login" />
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
					<View style={styles.mainActionContainer}>
						<OmuButton text="Login" onPressHandler={() => signInWithEmail()} />
					</View>
					<View style={styles.secondaryActionContainer}>
						<Text style={styles.text}>Don't have an account yet?</Text>
						<TouchableOpacity style={styles.secondaryAction} onPress={handleRegister}>
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
	text: {
		color: '#FFF',
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
	loginForm: {
		gap: 12,
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
});
