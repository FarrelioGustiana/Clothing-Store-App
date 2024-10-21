import { Stack } from "expo-router";
const AdminLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="addCategory" options={{ headerShown: false }} />
			<Stack.Screen name="addProduct" options={{ headerShown: false }} />
		</Stack>
	);
};
export default AdminLayout;
