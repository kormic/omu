import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../features/auth/hooks/useAuth';
import Login from '../features/auth/screens/login';
import Register from '../features/auth/screens/register';
import HomeScreen from '../features/home/screens/home';

export type RootStackParamList = {
	Login: undefined;
	Register: undefined;
	Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation: React.FC = () => {
	const { user, loading, signOut } = useAuth();

	// While loading initial auth state, render nothing / splash
	if (loading) return null;

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				contentStyle: {
					flex: 1,
					backgroundColor: '#1E1E1E',
				},
			}}
		>
			{user ? (
				<Stack.Screen name="Home" options={{ title: 'Home' }}>
					{(props) => <HomeScreen {...props} handlePress={() => signOut()} />}
				</Stack.Screen>
			) : (
				<>
					<Stack.Screen name="Login" component={Login} options={{ title: 'Sign in' }} />
					<Stack.Screen
						name="Register"
						component={Register}
						options={{ title: 'Create account' }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
};

export default AppNavigation;
