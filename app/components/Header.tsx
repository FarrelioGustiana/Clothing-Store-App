import { Href, router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
const Header = () => {
	return (
		<View>
			<TouchableOpacity
				onPress={() => router.push("addCategory" as Href)}
			>
				<Text>Add Category Page</Text>
			</TouchableOpacity>
		</View>
	);
};
export default Header;
