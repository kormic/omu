import { registerRootComponent } from 'expo';
import { SafeAreaView, StyleSheet } from 'react-native';
import Login from './screens/Login/components/Login';

function App() {
	return (
		<SafeAreaView style={styles.container}>
			<Login />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1E1E1E',
	},
});

registerRootComponent(App);
