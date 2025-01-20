import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Feather } from "@expo/vector-icons";
import tw from "twrnc";
import { supabase } from "../utils/supabase";
import {
	createStaticNavigation,
	useNavigation,
} from "@react-navigation/native";

export default function EventListItem({ eventData }) {
	const navigaton = useNavigation();
	useNavigation();
	const [peopleCount, setPeopleCount] = useState(0);
	const { title, location, datetime, image, id, dist_meters } = eventData;

	useEffect(() => {
		fetchPeople();
	}, [id]);

	const fetchPeople = async () => {
		const { count, error } = await supabase
			.from("attendance")
			.select("*", { count: "exact", head: true })
			.eq("event_id", id);

		setPeopleCount(count);
		console.log("count", count);
	};

	return (
		<Pressable
			style={tw`bg-white rounded-2xl mx-4 my-2 shadow-lg`}
			onPress={() => navigaton.navigate("Details", { eventData })}
		>
			{/* Image Section */}
			<Image source={{ uri: image }} style={tw`w-full h-48 rounded-t-2xl`} />

			{/* Content Section */}
			<View style={tw`p-4`}>
				<Text style={tw`text-sm font-semibold uppercase text-amber-600`}>
					{dayjs(datetime).format("ddd, MMM D,  h:mm A")}
				</Text>

				<Text style={tw`text-xl font-bold mt-2`} numberOfLines={2}>
					{title}
				</Text>

				<View style={tw`flex-row items-center mt-2`}>
					<Feather name="map-pin" size={16} color="gray" />
					<Text style={tw`text-gray-500 ml-2`}>{location}</Text>
				</View>

				<View style={tw`flex-row items-center mt-1`}>
					<Feather name="navigation" size={16} color="gray" />
					<Text style={tw`text-gray-400 ml-2`}>
						{Math.floor(dist_meters / 1000)} kms away
					</Text>
				</View>

				{/* Footer Section */}
				<View
					style={tw`flex-row items-center justify-between mt-4 pt-4 border-t border-gray-100`}
				>
					<View style={tw`flex-row items-center`}>
						<Feather name="users" size={16} color="gray" />
						<Text style={tw`text-gray-600 ml-2 font-medium`}>
							{peopleCount} attending
						</Text>
					</View>

					<View style={tw`flex-row gap-4`}>
						<Feather name="share" size={20} color="gray" />
						<Feather name="bookmark" size={20} color="gray" />
					</View>
				</View>
			</View>
		</Pressable>
	);
}
