import Navigation from "@/components/ui/navigation";

const layout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<Navigation />
			<main className="w-[90vw] mx-auto flex-1 overflow-hidden pb-20">
				{children}
			</main>
		</>
	);
};

export default layout;
