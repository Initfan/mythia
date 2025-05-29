import Navigation from "@/components/ui/navigation";
import React from "react";

const layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<Navigation />
			<main className="pt-30 pb-6 w-[90vw] mx-auto">{children}</main>
		</>
	);
};

export default layout;
