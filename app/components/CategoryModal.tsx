import { Category } from "@/(admin)/addCategory";
import { updateCategory } from "@/lib/firebaseFunc";
import { CheckIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

type CategoryModalProps = {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	selectedCategory: Category | null;
};

const CategoryModal: React.FC<CategoryModalProps> = ({
	modalVisible,
	setModalVisible,
	selectedCategory,
}) => {
	const [value, setValue] = useState<string>("");

	const handleUpdate = async () => {
		try {
			await updateCategory(
				(selectedCategory as Category)?.id as string,
				value
			);
		} catch (error: Error | unknown) {
			Alert.alert("Something's Wrong!", (error as Error)?.message);
		} finally {
			setModalVisible(false);
		}
	};

	useEffect(() => {
		setValue(selectedCategory?.categoryName as string);
	}, [modalVisible]);

	return (
		<Modal visible={modalVisible} animationType="slide" transparent>
			<View style={styles.container}>
				<View style={styles.modalCard}>
					<View style={styles.textInputContainer}>
						<TextInput
							placeholder="Add new category name"
							placeholderTextColor={"#797979"}
							value={value}
							style={{ flex: 1 }}
							onChangeText={(e) => setValue(e)}
						/>
						<TouchableOpacity
							style={styles.updateButton}
							onPress={handleUpdate}
						>
							<CheckIcon color="#fff" size={17} />
						</TouchableOpacity>
					</View>

					<View style={styles.buttons}>
						<TouchableOpacity
							style={styles.closeButton}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<Text style={{ color: "white", fontWeight: "500" }}>
								Close
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0000009a",
	},

	modalCard: {
		width: "100%",
		maxWidth: 300,
		backgroundColor: "#ffffff",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#797979",
		padding: 10,
	},

	textInputContainer: {
		borderWidth: 1,
		borderColor: "#797979",
		padding: 10,
		borderRadius: 10,
		flexDirection: "row",
	},

	updateButton: {
		backgroundColor: "#000",
		padding: 4,
		borderRadius: 10,
	},

	buttons: {
		width: "100%",
		marginTop: "5%",
		rowGap: 10,
	},

	closeButton: {
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		borderRadius: 3,
		backgroundColor: "black",
	},
});
export default CategoryModal;
