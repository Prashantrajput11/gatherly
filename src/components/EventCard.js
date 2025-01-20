import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import Icon from "react-native-vector-icons/FontAwesome";

const EventCard = () => {
	// Mock data for attendees - replace with actual data
	const attendees = [
		{ id: 1, image: "https://i.pravatar.cc/100?img=1" },
		{ id: 2, image: "https://i.pravatar.cc/100?img=2" },
		{ id: 3, image: "https://i.pravatar.cc/100?img=3" },
	];

	return (
		<View style={tw`bg-white rounded-2xl w-72 shadow-lg m-2`}>
			{/* Event Image */}
			<Image
				source={{
					uri: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				}}
				style={tw`w-full h-44 rounded-t-2xl`}
			/>

			{/* Content Container */}
			<View style={tw`p-4`}>
				{/* Event Details */}
				<View style={tw`flex-row justify-between items-start`}>
					<View style={tw`flex-1`}>
						<Text style={tw`font-bold text-lg text-gray-800`}>
							Tech Conference 2025
						</Text>
						<Text style={tw`text-sm text-gray-500 mt-1`}>
							San Francisco, CA
						</Text>
					</View>
					<Text style={tw`text-blue-600 font-semibold`}>$99</Text>
				</View>

				{/* Date and Attendees Section */}
				<View style={tw`flex-row justify-between items-center mt-4`}>
					{/* Date */}
					<View style={tw`flex-row items-center gap-2`}>
						<Icon name="calendar" size={15} color="#ea580c" />
						<Text style={tw`text-gray-600 text-sm`}>13 Dec, 2025</Text>
					</View>

					{/* Attendees */}
					<View style={tw`flex-row items-center`}>
						{/* Profile pictures */}
						<View style={tw`flex-row -space-x-2`}>
							{attendees.map((attendee, index) => (
								<Image
									key={attendee.id}
									source={{ uri: attendee.image }}
									style={[
										tw`w-6 h-6 rounded-full border-2 border-white`,
										{ zIndex: attendees.length - index },
									]}
								/>
							))}
						</View>
						{/* Additional attendees count */}
						<View style={tw`bg-gray-100 rounded-full ml-1 px-2 py-1`}>
							<Text style={tw`text-xs text-gray-600`}>+42</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default EventCard;
