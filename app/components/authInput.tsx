import { Eye, EyeClosed } from "lucide-react-native";
import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";

type AuthInputProps = {
	placeholder: string;
	type: string;
	value: string;
	handleChange: (e: string) => void;
	editable?: boolean;
};

const AuthInput: React.FC<AuthInputProps> = ({
	placeholder,
	type,
	editable = true,
	value,
	handleChange,
}) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	return (
		<View style={{ rowGap: 10 }}>
			<View style={styles.container}>
				<TextInput
					placeholder={placeholder}
					placeholderTextColor="#797979"
					style={{ flex: 1 }}
					secureTextEntry={type === "password" && !showPassword}
					editable={editable}
					value={value as string}
					onChangeText={handleChange}
				/>

				{type === "password" && (
					<TouchableOpacity
						onPress={() => setShowPassword(!showPassword)}
					>
						{showPassword ? (
							<Eye size={20} color={"#000"} />
						) : (
							<EyeClosed size={20} color={"#000"} />
						)}
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingVertical: 12,
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderColor: "black",
	},
});

export default AuthInput;
