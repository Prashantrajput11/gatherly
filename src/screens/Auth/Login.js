// src/screens/Login.js
import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import tw from "twrnc";
import useAuthStore from "../../store/authStore";
// import useAuthStore from "../../store/authStore";

const Login = ({ navigation }) => {
	const { signIn, loading, error } = useAuthStore();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		const success = await signIn(email, password);
		if (success) {
			navigation.replace("Home");
		}
	};

	return (
		<View style={tw`flex-1 justify-center p-6 bg-white`}>
			<Text style={tw`text-2xl font-bold text-center mb-6`}>Login</Text>
			<TextInput
				label="Email"
				value={email}
				onChangeText={setEmail}
				mode="outlined"
				style={tw`mb-4`}
				autoCapitalize="none"
				keyboardType="email-address"
			/>
			<TextInput
				label="Password"
				value={password}
				onChangeText={setPassword}
				mode="outlined"
				style={tw`mb-6`}
				secureTextEntry
			/>
			<Button mode="contained" onPress={handleLogin} style={tw`mb-4`}>
				Login
			</Button>
			<TouchableOpacity onPress={() => navigation.navigate("Signup")}>
				<Text style={tw`text-center text-blue-500`}>
					Don't have an account? Sign Up
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Login;
