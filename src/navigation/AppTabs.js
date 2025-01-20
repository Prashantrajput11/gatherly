// src/navigation/AppTabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Profile from "../screens/Profile";

import BottomTab from "./BottomTab";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
	return (
		<Tab.Navigator
			screenOptions={{ headerShown: false }}
			tabBar={(props) => <BottomTab {...props} />}
		>
			<Tab.Screen name="Home" component={Home} options={{ title: "Home" }} />
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{ title: "Profile" }}
			/>
		</Tab.Navigator>
	);
}
