import {
	StyleSheet,
	Text,
	View,
	Image,
	ActivityIndicator,
	Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import dayjs from "dayjs";
import tw from "twrnc";

// import { useAuth } from "~/contexts/AuthProvider";
import { supabase } from "../utils/supabase";

const EventDetails = ({ route }) => {
	const { eventData } = route.params;
	const [event, setEvent] = useState([]);
	const [loading, setLoading] = useState(false);
	const [attendance, setAttendance] = useState(null);

	const fetchEventById = async () => {
		setLoading(true);
		const { data, error } = await supabase
			.from("events")
			.select("*")
			.eq("id", id)
			.single();
		const { data: attendanceData, error: attErr } = await supabase
			.from("attendance")
			.select("*")
			.eq("user_id", user.id)
			.eq("event_id", id)
			.single();

		console.log("ad", attendanceData);
		console.log("ad-error", attErr);

		setEvent(data);
		setAttendance(attendanceData);
		setLoading(false);
	};

	const showJoinAlert = () => {
		Alert.alert("congratulations  🎉", "You are going to this event", [
			{ text: "OK", onPress: () => console.log("OK Pressed") },
		]);
	};

	const joinEvent = async () => {
		console.log("ehhll");

		const { data, error } = await supabase
			.from("attendance")
			.insert({ event_id: event.id, user_id: user.id })
			.select();

		if (data) {
			showJoinAlert();
		}

		setAttendance(data);
	};

	if (loading) {
		return (
			<View style={tw`flex-1 justify-center items-center`}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (!event) return null;

	return (
		<View style={tw`flex-1 bg-white p-4`}>
			<Image
				source={{ uri: eventData.image }}
				style={tw`w-full aspect-video rounded-xl`}
			/>

			<View style={tw`mt-4`}>
				<Text style={tw`text-lg font-semibold text-amber-600 uppercase`}>
					{dayjs(eventData.datetime).format("ddd, MMM D,  h:mm A")}
				</Text>

				<Text style={tw`text-3xl font-bold mt-2`} numberOfLines={3}>
					{eventData.title}
				</Text>

				<Text style={tw`text-lg mt-2 text-gray-700`} numberOfLines={3}>
					{eventData.description}
				</Text>

				<Text
					style={tw`text-lg text-blue-500 mt-4`}
					onPress={() => navigation.navigate(`/event/${event.id}/attendance`)}
				>
					View Attendance
				</Text>
			</View>

			<View
				style={tw`absolute bottom-0 left-0 right-0 flex-row items-center justify-between border-t border-gray-200 bg-white p-6`}
			>
				<Text style={tw`text-xl font-medium`}>Free</Text>

				{attendance ? (
					<Text style={tw`font-bold text-green-600`}>Already Registered</Text>
				) : (
					<Button
						mode="contained"
						onPress={joinEvent}
						style={tw`bg-rose-400 rounded-lg`}
						labelStyle={tw`text-lg font-bold px-4 py-1`}
					>
						Join and RSVP
					</Button>
				)}
			</View>
		</View>
	);
};

export default EventDetails;
