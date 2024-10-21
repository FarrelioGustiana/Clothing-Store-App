import useUserStore from "@/lib/useUserStore";
import Header from "@components/Header";
import { Href, router } from "expo-router";
import { View, Text, SafeAreaView } from "react-native";
const Home = () => {
	const { currentUser } = useUserStore();

	if (!currentUser) return router.replace("/sign-up" as Href);

	return (
		<SafeAreaView>
			<Header />
		</SafeAreaView>
	);
};
export default Home;
