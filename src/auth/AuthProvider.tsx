import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';

type User = { userid: number; role: string };

export const AuthContext = React.createContext<{
	user: User;
	login: () => void;
	logout: () => void;
	numPosts: number;
	postNewData: () => void;
}>({
	user: { userid: 0, role: 'guest' },
	login: () => {},
	logout: () => {},
	numPosts: 0,
	postNewData: () => {},
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User>({ userid: 0, role: 'guest' });
	const [numPosts, setNumPosts] = useState(0);

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
					setUser({ userid: 0, role: 'guest' });
					AsyncStorage.removeItem('user');
				},
				numPosts,
				postNewData: () => setNumPosts(numPosts + 1),
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
