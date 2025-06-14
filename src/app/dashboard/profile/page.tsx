import AuthorProfile from "@/components/profile/author-profile";
import UserProfile from "@/components/profile/user-profile";
import { verifySession } from "@/lib/dal";

const page = async () => {
	const { user } = await verifySession();

	if (!user) return;

	return user.role == "author" ? (
		<AuthorProfile author={user.author!} />
	) : (
		<UserProfile user={user!} />
	);
};

export default page;
