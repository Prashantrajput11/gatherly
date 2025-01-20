import * as React from "react";
import { View, Text } from "react-native";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import Home from "./src/screens/Home";
import EventDetails from "./src/screens/EventDetails";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./src/screens/Profile";
import { BottomTab } from "./src/navigation/BottomTab";

const MyTabs = createBottomTabNavigator({
	tabBar: (props) => <BottomTab {...props} />,
	screens: {
		Home: {
			screen: Home,
			options: {
				headerShown: false,
				title: "Overview",
			},
		},
		Profile: Profile,
	},
});

const RootStack = createNativeStackNavigator({
	screens: {
		Home: {
			screen: MyTabs,
			options: {
				headerShown: false,
				title: "Overview",
			},
		},
		Details: EventDetails,
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
