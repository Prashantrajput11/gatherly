import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";

const HomeHeader = () => {
	return (
		<View>
			<Text>HomeHeader</Text>

			<Avatar.Image
				size={24}
				source={{
					uri: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				}}
			/>
		</View>
	);
};

export default HomeHeader;

const styles = StyleSheet.create({});
