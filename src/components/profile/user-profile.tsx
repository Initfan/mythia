import { user } from "@/generated";
import Image from "next/image";

const UserProfile = ({ user }: { user: user }) => {
	return (
		<div className="flex space-x-4">
			<div className="h-[250px] w-[200px] relative">
				<Image
					src={"/user-no-profile.jpg"}
					alt={user.username}
					className="object-cover rounded"
					fill
				/>
			</div>
			<div className="flex-1 space-y-3">
				<h1 className="text-2xl font-semibold">{user.username}</h1>
				<p className="text-muted-foreground">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Provident autem inventore voluptas quibusdam, fugiat error?
				</p>
			</div>
		</div>
	);
};

export default UserProfile;
