import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import OmuButton from '../../../components/OmuButton';
import { supabase } from '../../../../config/supabase';

export default function RegisterForm() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		fullName: '',
		email: '',
		password: '',
		address: '',
		city: '',
		postalCode: '',
		phone: '',
		companyName: '',
		vatNumber: '',
	});

	const handleChange = (field: string, value: string) => {
		setForm({ ...form, [field]: value });
	};

	async function handleRegister() {
		// TODO: Add more robust validation as needed
		if (!form.email || !form.password || !form.fullName) {
			Alert.alert('Missing Fields', 'Please fill in name, email, and password.');
			return;
		}

		try {
			setLoading(true);

			// Create user with Supabase Auth
			const { data, error } = await supabase.auth.signUp({
				email: form.email,
				password: form.password,
				options: {
					data: {
						full_name: form.fullName,
						address: form.address,
						city: form.city,
						postal_code: form.postalCode,
						phone: form.phone,
						company_name: form.companyName,
						vat_number: form.vatNumber,
					},
				},
			});

			if (error) throw error;

			// Insert additional user details into 'users' table
			if (data.user) {
				await supabase.from('users').insert({
					id: data.user.id, // matches auth user id
					name: form.fullName,
					email: form.email,
					role: 'taker', // or 'giver' — can be changed later
				});
			}

			Alert.alert('Registration successful!', 'Please check your email to confirm your account.', [
				{
					text: 'OK',
					onPress: () => router.dismissAll(),
				},
			]);
		} catch (err: any) {
			Alert.alert('Error', err.message || 'Something went wrong.');
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView behavior="padding">
					<ScrollView
						contentContainerStyle={styles.formContainer}
						showsVerticalScrollIndicator={false}
					>
						<View style={styles.header}>
							<Text style={[styles.text, styles.headerTitle]}>Let us know who you are</Text>
						</View>

						<TextInput
							placeholder="Full Name"
							placeholderTextColor="#969696"
							style={styles.input}
							value={form.fullName}
							onChangeText={(v) => handleChange('fullName', v)}
						/>

						<TextInput
							placeholder="Email"
							placeholderTextColor="#969696"
							style={styles.input}
							value={form.email}
							onChangeText={(v) => handleChange('email', v)}
							keyboardType="email-address"
						/>

						<TextInput
							placeholder="Password"
							placeholderTextColor="#969696"
							style={styles.input}
							value={form.password}
							onChangeText={(v) => handleChange('password', v)}
							secureTextEntry
						/>

						<TextInput
							placeholder="Address"
							placeholderTextColor="#969696"
							style={styles.input}
							value={form.address}
							onChangeText={(v) => handleChange('address', v)}
						/>

						<View style={styles.row}>
							<TextInput
								placeholder="City"
								placeholderTextColor="#969696"
								style={[styles.input, styles.halfInput]}
								value={form.city}
								onChangeText={(v) => handleChange('city', v)}
							/>
							<TextInput
								placeholder="Postal Code"
								placeholderTextColor="#969696"
								style={[styles.input, styles.halfInput]}
								value={form.postalCode}
								onChangeText={(v) => handleChange('postalCode', v)}
								keyboardType="numeric"
							/>
						</View>

						<TextInput
							placeholder="Phone Number"
							placeholderTextColor="#969696"
							style={styles.input}
							value={form.phone}
							onChangeText={(v) => handleChange('phone', v)}
							keyboardType="phone-pad"
						/>

						<TextInput
							placeholder="Company Name"
							placeholderTextColor="#969696"
							style={styles.input}
							value={form.companyName}
							onChangeText={(v) => handleChange('companyName', v)}
						/>

						<TextInput
							placeholder="VAT Number"
							placeholderTextColor="#969696"
							style={styles.input}
							value={form.vatNumber}
							onChangeText={(v) => handleChange('vatNumber', v)}
						/>

						<View style={styles.mainActionContainer}>
							<OmuButton
								text={loading ? 'Registering...' : 'Register'}
								onPressHandler={handleRegister}
							/>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1E1E1E',
		flex: 1,
		padding: 10,
	},
	formContainer: {
		paddingBottom: 20,
	},
	text: {
		color: '#FFF',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 20,
	},
	headerTitle: {
		fontSize: 16,
	},
	input: {
		height: 56,
		borderColor: '#FFF',
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		marginBottom: 12,
		color: '#FFF',
	},
	row: {
		flexDirection: 'row',
		gap: 10,
	},
	halfInput: {
		flex: 1,
	},
	mainActionContainer: {
		marginTop: 25,
		marginBottom: 20,
	},
});
