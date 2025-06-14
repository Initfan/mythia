import Navigation from "@/components/ui/navigation";

const layout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className="h-screen flex flex-col">
			<Navigation />
			<main className="lg:w-[50vw] w-full mx-auto flex-1">
				{children}
			</main>
		</div>
	);
};

export default layout;
