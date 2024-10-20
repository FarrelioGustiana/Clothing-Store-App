import { signIn } from "@/lib/firebaseFunc";
import AuthInput from "@components/authInput";
import ButtonTemplate from "@components/ButtonTemplate";
import { Href, router } from "expo-router";
import { useState } from "react";

import { View, Text, StyleSheet } from "react-native";

const SignIn = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSignIn = async () => {
		setIsLoading(true);
		try {
			await signIn(email, password);
			router.push("/home" as Href);
			setEmail("");
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
				<Text style={styles.title}>Login to Your Account</Text>
				<Text style={{ textAlign: "center", color: "#797979" }}>
					Fill All The Input Correctly!
				</Text>
			</View>
			<View style={styles.formContainer}>
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
					text="Sign In"
					handlePress={handleSignIn}
					buttonStyles={{ width: "100%", marginTop: 20 }}
					disabled={isLoading}
				/>
			</View>

			<View
				style={{ paddingHorizontal: 15, marginTop: "15%", rowGap: 15 }}
			>
				<Text>Need an Account?</Text>
				<ButtonTemplate
					text="Go to Register Page"
					handlePress={() => router.push("/sign-up" as Href)}
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
		maxWidth: "100%",
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

export default SignIn;
