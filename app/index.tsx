import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ShirtIcon } from "lucide-react-native";
import { router } from "expo-router";

export default function Index() {
	return (
		<View style={styles.mainContainer}>
			<View style={styles.brandContainer}>
				<View style={styles.imgContainer}>
					<ShirtIcon color="#000000" size={"60%"} strokeWidth={2} />
				</View>
				<Text style={styles.title}>Lucien Veroux</Text>
				<Text style={{ textAlign: "center", maxWidth: "80%" }}>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Blanditiis quasi rerum.
				</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<TouchableOpacity
					onPress={() => router.push("/sign-up")}
					style={styles.button}
				>
					<Text style={{ color: "white", fontWeight: "700" }}>
						Let's Get Started
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "white",
	},
	brandContainer: {
		marginTop: "60%",
		display: "flex",
		alignItems: "center",
		padding: 40,
		gap: 20,
	},
	imgContainer: {
		height: 80,
		width: 80,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.55,
		shadowRadius: 3.84,
		elevation: 5,
		backgroundColor: "white",
	},
	title: {
		fontWeight: "bold",
		fontSize: 30,
	},
	buttonsContainer: {
		width: "100%",
		padding: 20,
		marginTop: "65%",
	},
	button: {
		backgroundColor: "#000",
		padding: 15,
		alignItems: "center",
		borderRadius: 20,
	},
});
