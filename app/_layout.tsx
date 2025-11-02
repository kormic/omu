import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from '../src/features/auth/hooks/useAuth';
import { Stack } from 'expo-router';

export default function RootLayout() {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="auto" />
			<AuthProvider>
				<Stack
					screenOptions={{
						headerShown: false,
						contentStyle: {
							flex: 1,
							backgroundColor: '#1E1E1E',
						},
					}}
				>
					{/* Home (default) */}
					<Stack.Screen name="index" />

					<Stack.Screen name="(auth)/login" />

					<Stack.Screen
						name="(auth)/register"
						options={{
							presentation: 'modal',
							animation: 'slide_from_bottom',
							gestureEnabled: true,
						}}
					/>
				</Stack>
			</AuthProvider>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1E1E1E',
	},
});
