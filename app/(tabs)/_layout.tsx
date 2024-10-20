import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import TabBarIcon from "@components/TabBarIcon";

const TabLayout = () => {
	return (
		<Tabs
			screenOptions={({ route }) => ({
				tabBarShowLabel: false,
				tabBarStyle: styles.tabBar,
				tabBarActiveTintColor: "#000",
				tabBarIcon: ({ color, size, focused }) => {
					let iconName: keyof typeof Ionicons.glyphMap;

					if (route.name === "home") {
						iconName = "home-outline";
					} else if (route.name === "search") {
						iconName = "search-outline";
					} else if (route.name === "cart") {
						iconName = "cart-outline";
					} else {
						iconName = "person-outline";
					}
					return (
						<TabBarIcon
							color={color}
							size={size}
							name={iconName}
							backgroundActive={focused ? "#fff" : "transparent"}
						/>
					);
				},
			})}
		>
			<Tabs.Screen name="home" options={{ headerShown: false }} />
			<Tabs.Screen name="search" options={{ headerShown: false }} />
			<Tabs.Screen name="cart" options={{ headerShown: false }} />
			<Tabs.Screen name="profile" options={{ headerShown: false }} />
		</Tabs>
	);
};

const styles = StyleSheet.create({
	tabBar: {
		backgroundColor: "#000",
		height: 60,
		paddingTop: 10,
		paddingBottom: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 5,
		position: "absolute",
		bottom: 30,
		display: "flex",
		borderRadius: 100,
		marginHorizontal: 20,
	},
});

export default TabLayout;
