import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

type TabBarIconProps = {
	size: number;
	color: string;
	name: keyof typeof Ionicons.glyphMap;
	backgroundActive: string;
};

const TabBarIcon = ({
	size,
	color,
	name,
	backgroundActive,
}: TabBarIconProps) => {
	return (
		<View
			style={{
				width: 50,
				height: 50,
				backgroundColor: backgroundActive,
				justifyContent: "center",
				alignItems: "center",
				borderRadius: 100,
			}}
		>
			<Ionicons name={name} size={size} color={color} />
		</View>
	);
};
export default TabBarIcon;
