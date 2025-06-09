import DashboardNavigation from "@/components/dashboard/navigation";
import React from "react";

const layout = async ({
	children,
	breadcrumb,
}: Readonly<{
	children: React.ReactNode;
	breadcrumb: React.ReactNode;
}>) => {
	return (
		<>
			<main className="w-[60vw] mx-auto flex-1 overflow-hidden">
				<DashboardNavigation />
				<div className="pb-3">{breadcrumb}</div>
				{children}
			</main>
		</>
	);
};

export default layout;
