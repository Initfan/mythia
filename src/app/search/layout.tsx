import Navigation from "@/components/ui/navigation";

const layout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className="md:h-screen flex flex-col pb-12">
			<Navigation />
			<main className="w-[90vw] mx-auto flex-1 overflow-hidden">
				{children}
			</main>
		</div>
	);
};

export default layout;
