import Image from "next/image";
import React, { MouseEventHandler } from "react";

interface props {
	src: string;
	alt: string;
	className?: string;
	children?: React.ReactNode;
	onClick?: MouseEventHandler<HTMLDivElement>;
}

const Cover = ({ src, alt, className, children, onClick }: props) => {
	return (
		<div
			className={`h-[230px] w-[150px] relative ${className}`}
			onClick={onClick}
		>
			<Image
				alt={alt}
				src={src}
				className="rounded object-cover object-center"
				fill
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			/>
			{children}
		</div>
	);
};

export default Cover;
