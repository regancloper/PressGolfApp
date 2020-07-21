import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthParamList, AuthNavProps } from '../types/AuthParamList';
import { AuthContext } from './AuthProvider';
import { Center } from '../shared/Center';
import { Text, Button, View, StyleSheet, ImageBackground } from 'react-native';

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

function LoginScreen({ navigation }: AuthNavProps<'Login'>) {
	const { login } = useContext(AuthContext);
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/home-course.jpg')}
				style={styles.image}
			>
				<Center>
					<Text>Login Screen</Text>
					<Button title="Login!" onPress={() => login()} />
					<Button
						title="Register!"
						onPress={() => navigation.navigate('Register')}
					/>
				</Center>
			</ImageBackground>
		</View>
	);
}

function RegisterScreen({ navigation, route }: AuthNavProps<'Register'>) {
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/register-course.jpg')}
				style={styles.image}
			>
				<Center>
					<Text>Route Name: {route.name}</Text>
					<Button
						title="Go to Login"
						onPress={() => navigation.navigate('Login')}
					/>
				</Center>
			</ImageBackground>
		</View>
	);
}

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
	return (
		<Stack.Navigator
			screenOptions={{ header: () => null }}
			initialRouteName="Login"
		>
			<Stack.Screen
				options={{ headerTitle: 'Sign In' }}
				name="Login"
				component={LoginScreen}
			/>
			<Stack.Screen
				options={{ headerTitle: 'Sign Up' }}
				name="Register"
				component={RegisterScreen}
			/>
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
});
