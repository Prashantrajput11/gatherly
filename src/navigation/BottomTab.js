import { View, Platform, SafeAreaView } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";

export function BottomTab({ state, descriptors, navigation }) {
	const { colors } = useTheme();
	const { buildHref } = useLinkBuilder();

	// Icon mapping for tab items
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
		<SafeAreaView style={tw`bg-white`}>
			<View style={tw`flex-row bg-white border-t border-gray-200  pt-2`}>
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
						<PlatformPressable
							key={route.key}
							href={buildHref(route.name, route.params)}
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
						</PlatformPressable>
					);
				})}
			</View>
		</SafeAreaView>
	);
}
