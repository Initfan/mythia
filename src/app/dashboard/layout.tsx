import React from "react";
import Navigation from "@/components/ui/navigation";

const layout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
	breadcrumb: React.ReactNode;
}>) => {
	return (
		<>
			<Navigation />
			{children}
		</>
	);
};

export default layout;
