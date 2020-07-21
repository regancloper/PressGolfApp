import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';

type User = null | { userid: number; role: string };

export const AuthContext = React.createContext<{
	user: User;
	login: () => void;
	logout: () => void;
}>({
	user: null,
	login: () => {},
	logout: () => {},
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User>(null);
	return (
		<AuthContext.Provider
			value={{
				user,
				login: async () => {
					const fakeUser = { userid: 8, role: 'admin' };
					setUser(fakeUser);
					AsyncStorage.setItem('user', JSON.stringify(fakeUser));
				},
				logout: () => {
					setUser(null);
					AsyncStorage.removeItem('user');
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
