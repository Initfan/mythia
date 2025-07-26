import Navigation from "@/components/ui/navigation";

const layout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<section className="md:h-screen flex flex-col">
			<Navigation />
			{children}
		</section>
	);
};

export default layout;
