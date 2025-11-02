import React from 'react';
import Home from '../../src/features/home/screens/home';
import { useAuth } from '../../src/features/auth/hooks/useAuth';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
	const { signOut } = useAuth();
	const router = useRouter();

	const handleSignOut = async () => {
		await signOut();

		router.replace('/login');
	};

	return <Home handlePress={handleSignOut} />;
}
