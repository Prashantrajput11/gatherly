// src/navigation/BottomTab.js
import React from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import tw from "twrnc";
import { useTheme } from "@react-navigation/native";

export default function BottomTab({ state, descriptors, navigation }) {
	const { colors } = useTheme();

	const getTabIcon = (routeName) => {
		switch (routeName) {
			case "Home":
				return "home";
			case "Profile":
				return "user";
			default:
				return "circle";
		}
	};

	return (
		<SafeAreaView style={tw`bg-white`} edges={["left", "right", "top"]}>
			<View style={tw`flex-row border-t border-gray-200 pt-2 h-16`}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];
					const label =
						options.tabBarLabel !== undefined
							? options.tabBarLabel
							: options.title !== undefined
							? options.title
							: route.name;

					const isFocused = state.index === index;

					const onPress = () => {
						const event = navigation.emit({
							type: "tabPress",
							target: route.key,
							canPreventDefault: true,
						});

						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name, route.params);
						}
					};

					const onLongPress = () => {
						navigation.emit({
							type: "tabLongPress",
							target: route.key,
						});
					};

					return (
						<TouchableOpacity
							key={route.key}
							accessibilityState={isFocused ? { selected: true } : {}}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							testID={options.tabBarButtonTestID}
							onPress={onPress}
							onLongPress={onLongPress}
							style={tw`flex-1 items-center justify-center`}
						>
							<Feather
								name={getTabIcon(route.name)}
								size={24}
								color={isFocused ? colors.primary : "gray"}
							/>
							<Text
								style={[
									tw`text-xs mt-1`,
									{ color: isFocused ? colors.primary : "gray" },
								]}
							>
								{label}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</SafeAreaView>
	);
}
