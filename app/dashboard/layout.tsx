import DashboardNavigation from "@/components/dashboard/navigation";

const layout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<main className="w-[60vw] mx-auto flex-1 overflow-hidden">
				<DashboardNavigation />
				{children}
			</main>
		</>
	);
};

export default layout;
