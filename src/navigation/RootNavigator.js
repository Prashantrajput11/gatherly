// src/navigation/RootNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppTabs from "./AppTabs";
import EventDetails from "../screens/EventDetails";
import AuthStack from "./AuthStack";
import useAuthStore from "../store/authStore";
// import useAuthStore from "../store/authStore";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

	return (
		<Stack.Navigator>
			{isAuthenticated ? (
				<>
					{/* Main App Tabs */}
					<Stack.Screen
						name="AppTabs"
						component={AppTabs}
						options={{ headerShown: false }}
					/>

					{/* Additional Screens */}
					<Stack.Screen
						name="EventDetails"
						component={EventDetails}
						options={{ title: "Event Details" }}
					/>
				</>
			) : (
				/* Authentication Stack */
				<Stack.Screen
					name="AuthStack"
					component={AuthStack}
					options={{ headerShown: false }}
				/>
			)}
		</Stack.Navigator>
	);
};

export default RootNavigator;
