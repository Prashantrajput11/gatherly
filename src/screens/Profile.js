import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text, Surface } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import tw from "twrnc";
import useAuthStore from "../store/authStore";

const ProfileAction = ({ icon, label, color = "#4B5563", onPress }) => (
	<TouchableOpacity onPress={onPress} style={tw`items-center px-6 py-4`}>
		<Feather name={icon} size={22} color={color} />
		<Text style={tw`mt-2 text-sm text-gray-600`}>{label}</Text>
	</TouchableOpacity>
);

const Profile = () => {
	const { user, signOut, loading } = useAuthStore();

	const handleLogout = async () => {
		const success = await signOut();
		if (success) {
			// todo : for future
			// Since  using AuthNavigator, it will automatically redirect to Login
			// But if you we to be explicit, we can use
			navigation.reset({
				index: 0,
				routes: [{ name: "Login" }],
			});
		}
	};
	return (
		<View style={tw`flex-1 bg-gray-50`}>
			{/* Header Background */}
			<View style={tw`h-40 bg-orange-600`} />

			{/* Profile Card */}
			<Surface style={tw`mx-4 -mt-20 rounded-xl bg-white shadow-lg`}>
				<View style={tw`items-center p-6`}>
					<Image
						source={{
							uri: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
						}}
						style={tw`w-24 h-24 rounded-full border-4 border-white shadow-sm`}
					/>
					<Text style={tw`mt-4 text-xl font-semibold text-gray-800`}>
						John Doe
					</Text>
					<Text style={tw`mt-1 text-gray-500`}>johndoe@example.com</Text>

					{/* Status Badge */}
					<View style={tw`mt-4 px-4 py-1 bg-green-100 rounded-full`}>
						<Text style={tw`text-sm text-green-600`}>Active Account</Text>
					</View>
				</View>

				{/* Action Buttons */}
				<View style={tw`flex-row justify-around border-t border-gray-100 mt-2`}>
					<ProfileAction
						icon="edit-2"
						label="Edit"
						onPress={() => console.log("Edit Profile")}
					/>
					<ProfileAction
						icon="settings"
						label="Settings"
						onPress={() => console.log("Settings")}
					/>
					<ProfileAction
						icon="log-out"
						label="Logout"
						color="#EF4444"
						onPress={() => handleLogout()}
					/>
				</View>
			</Surface>
		</View>
	);
};

export default Profile;
