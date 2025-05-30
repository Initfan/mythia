import Image from "next/image";
import React from "react";

interface props {
	src: string;
	alt: string;
}

const Cover = ({ src, alt }: props) => {
	return (
		<div className="h-[230px] w-[150px] relative">
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
