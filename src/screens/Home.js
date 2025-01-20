import {
	FlatList,
	ScrollView,
	StatusBar,
	Text,
	TextInput,
	View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-paper";
import tw from "twrnc";
import EventCard from "../components/EventCard";
import { dummyEvents } from "../constant";
import EventListItem from "../components/EventListItem";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
	return (
		<SafeAreaView>
			<StatusBar style="light" />

			<ScrollView>
				<LinearGradient
					colors={["#1a1a1a", "#2a2a2a"]}
					style={tw`flex-1/2 p-6`} // Full-screen gradient with padding
				>
					<View style={tw`mb-6 flex-row justify-between`}>
						<Text style={tw`text-white text-3xl font-bold`}>Meetups</Text>
					</View>

					<Text style={tw`text-lg text-white mb-1`}>{`Hello username`}</Text>
					<Text style={tw`text-xl text-gray-300 mb-6`}>
						Discover Amazing Events
					</Text>

					<View style={tw`bg-gray-800 rounded-lg mb-6`}>
						<TextInput
							style={tw`text-white px-4 py-3`}
							placeholder="Find amazing events"
							placeholderTextColor="#999"
						/>
					</View>

					<View style={tw`flex-row justify-between items-center mb-4`}>
						<Text style={tw`text-white text-lg font-semibold`}>
							Popular Events 🔥
						</Text>
						<Text style={tw`text-blue-400 text-sm`}>View All</Text>
					</View>
				</LinearGradient>

				<View>
					<FlatList
						data={[1, 2, 3]}
						renderItem={({ item }) => (
							<View style={tw`mx-2 `}>
								<EventCard eventData={item} />
							</View>
						)}
						showsHorizontalScrollIndicator={false}
						style={tw`px-6  mt-10 `}
						horizontal
					/>
				</View>

				<View style={tw`flex-1`}>
					<FlatList
						data={dummyEvents}
						renderItem={({ item }) => <EventListItem eventData={item} />}
						showsHorizontalScrollIndicator={false}
						ListHeaderComponent={
							<Text style={tw`text-2xl text-center my-4`}>All Events</Text>
						}
						// style={tw`px-6  mt-10 `}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Home;
