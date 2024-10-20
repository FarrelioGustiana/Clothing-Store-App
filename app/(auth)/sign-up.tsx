import { signUp } from "@/lib/firebaseFunc";
import AuthInput from "@components/authInput";
import ButtonTemplate from "@components/ButtonTemplate";
import { Href, router } from "expo-router";
import { useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SignUp = () => {
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSignUp = async () => {
		setIsLoading(true);
		try {
			await signUp(username, email, password);
			router.push("/home" as Href);
			setEmail("");
			setUsername("");
			setPassword("");
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<View style={styles.container}>
			<View style={styles.secondContainer}>
				<Text style={styles.title}>Create Account</Text>
				<Text style={{ color: "#797979", width: "100%" }}>
					Fill All The Input to Create Your Account
				</Text>
			</View>
			<View style={styles.formContainer}>
				<AuthInput
					value={username}
					placeholder="Username"
					type="text"
					editable={!isLoading}
					handleChange={(e: string) => setUsername(e)}
				/>
				<AuthInput
					value={email}
					placeholder="Email"
					type="text"
					editable={!isLoading}
					handleChange={(e: string) => setEmail(e)}
				/>
				<AuthInput
					value={password}
					placeholder="Password"
					type="password"
					editable={!isLoading}
					handleChange={(e: string) => setPassword(e)}
				/>
				<ButtonTemplate
					text="Sign Up"
					handlePress={handleSignUp}
					buttonStyles={{
						width: "100%",
						marginTop: 20,
					}}
					disabled={isLoading}
				/>
			</View>

			<View
				style={{ paddingHorizontal: 15, marginTop: "15%", rowGap: 15 }}
			>
				<Text>Already Have an Account?</Text>
				<ButtonTemplate
					text="Go to Login Page"
					handlePress={() => router.push("/sign-in" as Href)}
					buttonStyles={{
						backgroundColor: "transparent",
						borderWidth: 1,
						borderColor: "black",
						paddingVertical: 10,
					}}
					textStyles={{
						color: "black",
						fontWeight: "normal",
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		backgroundColor: "white",
	},
	secondContainer: {
		marginTop: "35%",
		maxWidth: "75%",
		justifyContent: "center",
		alignItems: "flex-start",
		rowGap: 15,
		width: "100%",
		paddingHorizontal: 25,
	},
	title: {
		fontWeight: "500",
		fontSize: 30,
		color: "black",
		width: "100%",
	},
	formContainer: {
		marginTop: "10%",
		width: "100%",
		rowGap: 20,
		paddingHorizontal: 15,
	},
});

export default SignUp;
