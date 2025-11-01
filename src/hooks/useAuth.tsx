import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../config/supabase';
import { AuthUser } from '@supabase/supabase-js';

type AuthContextType = {
	user: AuthUser | null;
	loading: boolean;
	signUp: (email: string, password: string) => Promise<{ error?: any }>;
	signIn: (email: string, password: string) => Promise<{ error?: any }>;
	signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const getSession = async () => {
			try {
				const { data } = await supabase.auth.getSession();
				if (data.session?.user) {
					const u = data.session.user;
					setUser({
						id: u.id,
						email: u.email,
						aud: u.aud,
						app_metadata: u.app_metadata,
						user_metadata: u.user_metadata,
						created_at: u.created_at,
						updated_at: u.updated_at,
					});
				}
			} finally {
				setLoading(false);
			}
		};

		getSession();

		// Subscribe to auth changes
		const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
			if (session?.user) {
				setUser({
					id: session.user.id,
					email: session.user.email,
					aud: session.user.aud,
					app_metadata: session.user.app_metadata,
					user_metadata: session.user.user_metadata,
					created_at: session.user.created_at,
					updated_at: session.user.updated_at,
				});
			} else {
				setUser(null);
			}
		});

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);

	const signUp = async (email: string, password: string) => {
		setLoading(true);
		const { error } = await supabase.auth.signUp({ email, password });
		setLoading(false);
		return { error };
	};

	const signIn = async (email: string, password: string) => {
		setLoading(true);
		console.log(email);
		console.log(password);
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		setLoading(false);
		return { error };
	};

	const signOut = async () => {
		setLoading(true);
		await supabase.auth.signOut();
		setLoading(false);
	};

	return (
		<AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
};
