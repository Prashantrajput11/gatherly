import * as React from "react";
import { View, Text } from "react-native";
import {
	createStaticNavigation,
	NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import Home from "./src/screens/Home";
import EventDetails from "./src/screens/EventDetails";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./src/screens/Profile";
import { BottomTab } from "./src/navigation/AppTabs.js";
import Navigation from "./src/navigation";

export default function App() {
	return (
		<PaperProvider>
			{/* 
			Wrap everything in NavigationContainer if your RootNavigator 
			doesn't already do it. For a typical setup, we do it here:
		*/}
			<NavigationContainer>
				<Navigation />
			</NavigationContainer>
		</PaperProvider>
	);
}
