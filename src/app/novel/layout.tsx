import Navigation from "@/components/ui/navigation";

const layout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<Navigation />
			<div className="w-[90vw] mx-auto">
				<main className="mx-auto w-3/4 space-y-6 pb-10">
					{children}
				</main>
			</div>
		</>
	);
};

export default layout;
