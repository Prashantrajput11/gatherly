import * as React from "react";
import { View, Text } from "react-native";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import Home from "./src/screens/Home";
import EventDetails from "./src/screens/EventDetails";

function HomeScreen() {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Home Screen</Text>
		</View>
	);
}

const RootStack = createNativeStackNavigator({
	screenOptions: {
		headerShown: false,
		// headerStyle: { backgroundColor: 'tomato' },
	},
	screens: {
		Home: Home,
		// Details: EventDetails,
	},
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
	return (
		<PaperProvider>
			<Navigation />
		</PaperProvider>
	);
}
