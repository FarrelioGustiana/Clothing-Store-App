import {
	addCategory,
	deleteCategory,
	getCategories,
	updateCategory,
} from "@/lib/firebaseFunc";
import CategoryModal from "@components/CategoryModal";
import { router } from "expo-router";
import { ArrowLeft, Edit, Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Alert,
	RefreshControl,
} from "react-native";

export type Category = {
	categoryName: string;
	id: string;
	products: [];
};

const AddCategory = () => {
	const [name, setName] = useState<string>("");
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null
	);

	const [refreshing, setRefreshing] = useState<boolean>(false);

	const onRefresh = async () => {
		setRefreshing(true);

		try {
			fetchAllCategories();
		} catch (error) {
			console.log(error);
		} finally {
			setRefreshing(false);
		}
	};

	const handleAdd = async () => {
		setIsLoading(true);
		try {
			await addCategory(name);
		} catch (error) {
			console.log(error);
		} finally {
			setName("");
			setIsLoading(false);
			fetchAllCategories();
		}
	};

	const fetchAllCategories = async () => {
		setIsLoading(true);

		try {
			const res = (await getCategories()) as Category[];
			setCategories(res);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		setIsLoading(true);
		try {
			await deleteCategory(id);
		} catch (error: Error | unknown) {
			Alert.alert("Something Wrong!", (error as Error)?.message);
		} finally {
			setIsLoading(false);
			fetchAllCategories();
		}
	};

	useEffect(() => {
		fetchAllCategories();
	}, [modalVisible]);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => router.back()}
				style={[styles.arrowButton, { opacity: isLoading ? 0.5 : 1 }]}
				disabled={isLoading}
			>
				<ArrowLeft color="#fff" size={20} />
			</TouchableOpacity>
			<View style={styles.secondContainer}>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder="Add category"
						placeholderTextColor="#797979"
						value={name}
						onChangeText={(e) => setName(e)}
					/>
				</View>
				<TouchableOpacity
					style={[styles.addButton, { opacity: isLoading ? 0.5 : 1 }]}
					disabled={isLoading}
					onPress={handleAdd}
				>
					<Text style={{ color: "#fff" }}>Add</Text>
				</TouchableOpacity>
			</View>
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor="#797979"
					/>
				}
				style={styles.categoryCardContainer}
			>
				{categories.map((category) => (
					<View key={category.id} style={styles.categoryCard}>
						<View style={{ flex: 1 }}>
							<Text style={{ color: "#fff", fontWeight: "500" }}>
								{category.categoryName}
							</Text>
						</View>
						<TouchableOpacity
							onPress={() => {
								setModalVisible(!modalVisible);
								setSelectedCategory(category);
							}}
							style={styles.actionButton}
						>
							<Edit color="white" size={16} />
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.actionButton}
							onPress={() => handleDelete(category.id)}
						>
							<Trash2 color="#fff" size={16} />
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>

			<CategoryModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				selectedCategory={selectedCategory}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
	},

	arrowButton: {
		marginTop: "13%",
		width: 34,
		height: 34,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 100,
		backgroundColor: "#000",
	},

	secondContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		marginTop: "5%",
	},

	inputContainer: {
		borderWidth: 1,
		borderColor: "rgba(0, 0, 0, 0.7)",
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		flex: 1,
	},

	addButton: {
		backgroundColor: "#000",
		padding: 10,
		borderRadius: 10,
	},

	categoryCardContainer: {
		marginTop: "5%",
		height: "100%",
		display: "flex",
	},

	categoryCard: {
		width: "100%",
		backgroundColor: "#000",
		marginTop: "2%",
		padding: 20,
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		columnGap: 8,
	},

	actionButton: {
		borderWidth: 1,
		borderColor: "#fff",
		height: 23,
		width: 23,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 2,
	},
});

export default AddCategory;
