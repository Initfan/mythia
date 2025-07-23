import Navigation from "@/components/ui/navigation";

const layout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<Navigation mobileHidden />
			<div className="w-[90vw] mx-auto">
				<main className="mx-auto md:w-3/4 space-y-6">{children}</main>
			</div>
		</>
	);
};

export default layout;
