import Image from "next/image";
import React from "react";

interface props {
	src: string;
	alt: string;
}

const Cover = ({ src, alt }: props) => {
	return (
		<div className="h-[300px] w-[250px] relative">
			<Image
				alt={alt}
				src={src}
				className="rounded object-cover object-center"
				fill
			/>
		</div>
	);
};

export default Cover;
