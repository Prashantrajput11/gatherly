// src/screens/Signup.js
import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, TextInput, Button, HelperText } from "react-native-paper";
import tw from "twrnc";
import useAuthStore from "../../store/authStore";

const Signup = ({ navigation }) => {
	const { signUp, loading, error, clearError } = useAuthStore();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [validationError, setValidationError] = useState("");

	const validateInputs = () => {
		if (!name.trim()) {
			setValidationError("Name is required");
			return false;
		}
		if (!email.trim() || !email.includes("@")) {
			setValidationError("Please enter a valid email");
			return false;
		}
		if (password.length < 6) {
			setValidationError("Password must be at least 6 characters");
			return false;
		}
		setValidationError("");
		return true;
	};

	const handleSignup = async () => {
		clearError();
		if (!validateInputs()) return;

		const success = await signUp(email, password, {
			data: {
				full_name: name,
			},
		});

		if (success) {
			// Todo: Show success message before navigation
			navigation.replace("Home");
		}
	};

	return (
		<View style={tw`flex-1 justify-center p-6 bg-white`}>
			<Text style={tw`text-2xl font-bold text-center mb-6`}>
				Create Account
			</Text>

			<TextInput
				label="Full Name"
				value={name}
				onChangeText={(text) => {
					setName(text);
					setValidationError("");
				}}
				mode="outlined"
				style={tw`mb-4`}
				autoComplete="name"
				autoCapitalize="words"
				error={validationError.includes("Name")}
			/>

			<TextInput
				label="Email"
				value={email}
				onChangeText={(text) => {
					setEmail(text);
					setValidationError("");
				}}
				mode="outlined"
				style={tw`mb-4`}
				autoCapitalize="none"
				autoComplete="email"
				keyboardType="email-address"
				error={validationError.includes("email")}
			/>

			<TextInput
				label="Password"
				value={password}
				onChangeText={(text) => {
					setPassword(text);
					setValidationError("");
				}}
				mode="outlined"
				style={tw`mb-2`}
				secureTextEntry
				autoComplete="password"
				error={validationError.includes("Password")}
			/>

			<HelperText type="info" style={tw`mb-4`}>
				Password must be at least 6 characters
			</HelperText>

			{(validationError || error) && (
				<HelperText type="error" visible={true} style={tw`mb-2`}>
					{validationError || error}
				</HelperText>
			)}

			<Button
				mode="contained"
				onPress={handleSignup}
				style={tw`mb-4 py-1`}
				loading={loading}
				disabled={loading}
			>
				{loading ? "Creating Account..." : "Sign Up"}
			</Button>

			<TouchableOpacity
				onPress={() => navigation.navigate("Login")}
				style={tw`flex-row justify-center`}
			>
				<Text style={tw`text-gray-600`}>Already have an account? </Text>
				<Text style={tw`text-blue-500 font-medium`}>Sign In</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Signup;
