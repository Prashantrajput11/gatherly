// src/navigation/AuthStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";

// Import authentication screens

const Stack = createNativeStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator initialRouteName="Login">
			<Stack.Screen
				name="Login"
				component={Login}
				options={{ headerShown: false }} // Hide header for auth screens
			/>
			<Stack.Screen
				name="Signup"
				component={Signup}
				options={{ headerShown: false }} // Hide header for auth screens
			/>
		</Stack.Navigator>
	);
};

export default AuthStack;
