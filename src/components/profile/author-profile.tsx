import { author } from "@/generated";
import Image from "next/image";

const AuthorProfile = ({ author }: { author: author }) => {
	return (
		<div className="flex space-x-4">
			<div className="h-[250px] w-[200px] relative">
				<Image
					src={author.image ?? "/user-no-profile.jpg"}
					alt={author.pen_name}
					className="object-cover rounded"
					fill
				/>
			</div>
			<h1 className="text-xl">{author.pen_name}</h1>
		</div>
	);
};

export default AuthorProfile;
