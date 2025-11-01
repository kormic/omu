import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppNavigation from '../src/navigation';
import { AuthProvider } from '../src/features/auth/hooks/useAuth';

export default function RootLayout() {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="auto" />
			<AuthProvider>
				<AppNavigation />
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
