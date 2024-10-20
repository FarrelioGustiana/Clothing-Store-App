import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ViewStyle,
	StyleProp,
	TextStyle,
} from "react-native";

type ButtonTemplateProps = {
	handlePress: () => void;
	text: string;
	buttonStyles?: StyleProp<ViewStyle>;
	textStyles?: StyleProp<TextStyle>;
	disabled?: boolean;
};

const ButtonTemplate: React.FC<ButtonTemplateProps> = ({
	handlePress,
	text,
	buttonStyles,
	textStyles,
	disabled = false,
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			style={[
				styles.button,
				buttonStyles,
				disabled && {
					opacity: 0.7,
				},
			]}
			disabled={disabled}
		>
			<Text style={[styles.text, textStyles]}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#000",
		padding: 15,
		alignItems: "center",
		borderRadius: 5,
	},
	text: {
		color: "white",
		fontWeight: "700",
	},
});

export default ButtonTemplate;
